// app/sitemap.ts
import { MetadataRoute } from 'next';
import locationsComputed from '@/data/locations-computed.json';

const BASE_URL = 'https://waterhardnessscale.com';
const LANGUAGES = ['en', 'de', 'fr', 'es'];
const CHUNK_SIZE = 10000;

// Cleaned up quality threshold
const indexableLocations = (locationsComputed as any[]).filter(loc => {
  return loc.population >= 5000 || (loc.population < 5000 && loc.hardness_mg_l !== null);
});

export default function sitemap(): MetadataRoute.Sitemap {
  const totalUrls = indexableLocations.length * LANGUAGES.length;
  const totalChunks = Math.ceil(totalUrls / CHUNK_SIZE);

  const sitemaps = [];

  // Static / Core pages
  sitemaps.push({
    url: `${BASE_URL}/sitemaps/static.xml`,
    lastModified: new Date(),
  });

  // Dynamic City chunks
  for (let i = 1; i <= totalChunks; i++) {
    sitemaps.push({
      url: `${BASE_URL}/sitemaps/cities-${i}.xml`,
      lastModified: new Date(),
    });
  }

  // Recommendation: If you have Country/Region hub pages, 
  // you should add a chunk for them too!
  // sitemaps.push({
  //   url: `${BASE_URL}/sitemaps/taxonomy.xml`,
  //   lastModified: new Date(),
  // });

  return sitemaps;
}