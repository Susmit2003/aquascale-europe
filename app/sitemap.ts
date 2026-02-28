// app/sitemap.ts
import { MetadataRoute } from 'next';
import locationsData from '@/data/locations.json';
import { Location } from '@/types';

const allLocations = locationsData as Location[];
const BASE_URL = 'https://aquascale-europe.com'; // Replace with your actual live domain
const LANGUAGES = ['en', 'de', 'fr', 'es'];

// 1. STRICT FILTERING: Only include cities we actually want Google to index.
// This prevents wasting crawl budget on tiny villages that have a 'noindex' tag.
const indexableLocations = allLocations.filter(loc => loc.population > 5000);

// SEO MATH: Max URLs per sitemap = 50,000. 
// We chunk at 2,500 locations per file.
const CHUNK_SIZE = 2500;

export async function generateSitemaps() {
  const totalSitemaps = Math.ceil(indexableLocations.length / CHUNK_SIZE);
  return Array.from({ length: totalSitemaps }).map((_, i) => ({ id: i }));
}

// Helper to safely encode slugs (spaces to hyphens, remove weird chars)
function createSafeSlug(name: string): string {
  return encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const start = id * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;
  const chunk = indexableLocations.slice(start, end);

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add the root homepage to the very first sitemap chunk
  if (id === 0) {
    sitemapEntries.push({
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, 
    });
  }

  // Iterate through the indexable chunk and build the URL matrix
  chunk.forEach((city) => {
    LANGUAGES.forEach((lang) => {
        // Construct the full URL path using safe slug encoding
        const safeCitySlug = createSafeSlug(city.name);
        const url = `${BASE_URL}/${lang}/${city.country_slug}/${city.region_slug}/${safeCitySlug}`;
        
        sitemapEntries.push({
          url,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8, // Core dataset pages get high priority
        });
    });
  });

  return sitemapEntries;
}