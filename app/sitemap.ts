


// app/sitemap.ts
import { MetadataRoute } from 'next';
import locationsComputed from '@/data/locations-computed.json';

const BASE_URL = 'https://waterhardnessscale.com';
const LANGUAGES = ['en', 'de', 'fr', 'es'];
const CHUNK_SIZE = 10000;

// Re-apply the Quality Threshold to know the exact count
const indexableLocations = (locationsComputed as any[]).filter(loc => {
  if (loc.population >= 5000) return true;
  if (loc.population < 5000 && loc.hardness_mg_l !== null && !loc.is_regional_average) return true;
  return false;
});

export default function sitemap(): MetadataRoute.Sitemap {
  // Total URLs = indexable cities × 4 languages
  const totalUrls = indexableLocations.length * LANGUAGES.length;
  const totalChunks = Math.ceil(totalUrls / CHUNK_SIZE);

  const sitemaps = [];

  // Important: include a chunk for static/taxonomy pages (chunk 0)
  sitemaps.push({
    url: `${BASE_URL}/sitemaps/static.xml`,
    lastModified: new Date(),
  });

  // Generate dynamic city chunks
  for (let i = 1; i <= totalChunks; i++) {
    sitemaps.push({
      url: `${BASE_URL}/sitemaps/cities-${i}.xml`,
      lastModified: new Date(),
    });
  }

  return sitemaps;
}