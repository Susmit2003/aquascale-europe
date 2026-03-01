// app/sitemaps/cities-[id]/route.ts
import { NextResponse } from 'next/server';
import locationsComputed from '@/data/locations-computed.json';

const BASE_URL = 'https://waterhardnessscale.com';
const CHUNK_SIZE = 10000;
const LANGUAGES = ['en', 'de', 'fr', 'es'];

// Helper to escape XML special characters to prevent sitemap breaking
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
  { params }: { params: { id: string } }
) {
  const chunkIndex = parseInt(params.id) - 1;
  const start = chunkIndex * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;

  // 1. Filter dataset using the Quality Threshold
  const indexableLocations = (locationsComputed as any[]).filter(loc => {
    if (loc.population >= 5000) return true;
    if (loc.population < 5000 && loc.hardness_mg_l !== null && !loc.is_regional_average) return true;
    return false;
  });

  // 2. Build the full URL Matrix (Cities × Languages)
  const allUrls: string[] = [];
  
  indexableLocations.forEach((loc) => {
    LANGUAGES.forEach((lang) => {
      allUrls.push(
        `${BASE_URL}/${lang}/${loc.country_slug}/${loc.region_slug}/${createSafeSlug(loc.name)}`
      );
    });
  });

  // 3. Slice exactly the chunk requested
  const chunkUrls = allUrls.slice(start, end);

  // 4. Generate XML string highly efficiently
  const urlsXml = chunkUrls
    .map((url) => {
      // Prioritize deeper URLs slightly lower
      return `
    <url>
      <loc>${escapeXml(url)}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
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
      // Cache the sitemap heavily to prevent DB/Memory load on repeated Googlebot requests
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate',
    },
  });
}