// app/sitemaps/cities-[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import locationsComputed from '@/data/locations-computed.json';

const BASE_URL = 'https://waterhardnessscale.com';
const CHUNK_SIZE = 10000;
const LANGUAGES = ['en', 'de', 'fr', 'es'];

/**
 * Escapes special characters for XML compliance.
 */
function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

/**
 * Creates a URL-safe slug from a string.
 */
function createSafeSlug(name: string): string {
  return encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
}

/**
 * Next.js 15+ Route Handler for dynamic sitemap chunks.
 * Parameters in Next.js 15+ are received as a Promise.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Await params to comply with Next.js 15+ requirements
  const resolvedParams = await params;
  const chunkIndex = parseInt(resolvedParams.id) - 1;
  const start = chunkIndex * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;

  // 2. Filter locations based on quality/indexability thresholds
  const indexableLocations = (locationsComputed as any[]).filter(loc => {
    return loc.population >= 5000 || (loc.population < 5000 && loc.hardness_mg_l !== null);
  });

  const allUrls: string[] = [];
  
  // 3. Generate localized URLs for each indexable location
  indexableLocations.forEach((loc) => {
    LANGUAGES.forEach((lang) => {
      allUrls.push(
        `${BASE_URL}/${lang}/${loc.country_slug}/${loc.region_slug}/${createSafeSlug(loc.name)}`
      );
    });
  });

  // 4. Slice the specific chunk for this route
  const chunkUrls = allUrls.slice(start, end);

  // 5. Use the current date for <lastmod>
  const lastModDate = new Date().toISOString().split('T')[0];

  // 6. Build the XML entries
  const urlsXml = chunkUrls
    .map((url) => {
      return `
    <url>
      <loc>${escapeXml(url)}</loc>
      <lastmod>${lastModDate}</lastmod>
    </url>`;
    })
    .join('');

  // 7. Return the full sitemap XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlsXml}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate',
    },
  });
}