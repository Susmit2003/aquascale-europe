// app/sitemaps/cities-[id]/route.ts
import { NextResponse } from 'next/server';
import locationsComputed from '@/data/locations-computed.json';

const BASE_URL = 'https://waterhardnessscale.com';
const CHUNK_SIZE = 10000;
const LANGUAGES = ['en', 'de', 'fr', 'es'];

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

function createSafeSlug(name: string): string {
  return encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // <-- FIXED TYPE
) {
  const resolvedParams = await params; // <-- AWAIT PARAMS
  const chunkIndex = parseInt(resolvedParams.id) - 1;
  const start = chunkIndex * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;

  // 1. Cleaned up filter
  const indexableLocations = (locationsComputed as any[]).filter(loc => {
    return loc.population >= 5000 || (loc.population < 5000 && loc.hardness_mg_l !== null);
  });

  const allUrls: string[] = [];
  
  indexableLocations.forEach((loc) => {
    LANGUAGES.forEach((lang) => {
      allUrls.push(
        `${BASE_URL}/${lang}/${loc.country_slug}/${loc.region_slug}/${createSafeSlug(loc.name)}`
      );
    });
  });

  const chunkUrls = allUrls.slice(start, end);

  // Use a static date for the build, or ideally the date you last updated locations.json
  const lastModDate = new Date().toISOString().split('T')[0];

  // 4. Added <lastmod> to the XML
  const urlsXml = chunkUrls
    .map((url) => {
      return `
    <url>
      <loc>${escapeXml(url)}</loc>
      <lastmod>${lastModDate}</lastmod>
    </url>`;
    })
    .join('');

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