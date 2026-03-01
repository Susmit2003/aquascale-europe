import { NextRequest, NextResponse } from 'next/server';
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

/**
 * Using 'any' for the context to bypass strict version-specific 
 * type constraints in Next.js 16.x build environments.
 */
export async function GET(
  request: NextRequest,
  context: any 
) {
  // Extract and await id regardless of whether it's a Promise or Object
  const params = await context.params;
  const id = params?.id;

  if (!id) {
    return new NextResponse('Missing ID', { status: 400 });
  }

  const chunkIndex = parseInt(id) - 1;
  const start = chunkIndex * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;

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
  const lastModDate = new Date().toISOString().split('T')[0];

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