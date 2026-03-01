// app/sitemaps/cities/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import locationsComputed from '@/data/locations-computed.json';

const BASE_URL = 'https://waterhardnessscale.com';
const CHUNK_SIZE = 10000;
const LANGUAGES = ['en', 'de', 'fr', 'es'];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Await params as required by Next.js 15/16
  const { id } = await context.params;

  if (!id) {
    return new NextResponse('Missing ID', { status: 400 });
  }

  const chunkIndex = parseInt(id) - 1;
  const start = chunkIndex * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;

  // Use your existing filtering logic
  const indexableLocations = (locationsComputed as any[]).filter(
    (loc) => loc.population >= 5000 || (loc.population < 5000 && loc.hardness_mg_l !== null)
  );

  let counter = 0;
  let urlsXml = '';
  const lastModDate = new Date().toISOString().split('T')[0];

  for (const loc of indexableLocations) {
    for (const lang of LANGUAGES) {
      if (counter >= start && counter < end) {
        const url = `${BASE_URL}/${lang}/${loc.country_slug}/${loc.region_slug}/${encodeURIComponent(
          loc.name.toLowerCase().replace(/\s+/g, '-')
        )}`;
        urlsXml += `<url><loc>${url}</loc><lastmod>${lastModDate}</lastmod></url>`;
      }
      counter++;
      if (counter >= end) break;
    }
    if (counter >= end) break;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsXml}</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}