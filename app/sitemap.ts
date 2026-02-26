import { MetadataRoute } from 'next';
import locationsData from '@/data/locations.json';
import { Location } from '@/types';

const allLocations = locationsData as Location[];
const BASE_URL = 'https://aquascale-europe.com'; // Replace with your actual live domain
const LANGUAGES = ['en', 'de', 'fr', 'es'];
const SUB_ROUTES = ['', '/appliances', '/skin-hair'];

// SEO MATH: 
// Max URLs per sitemap = 50,000. 
// 1 Location = 12 URLs (4 langs * 3 routes).
// To be extremely safe with file size limits, we chunk at 2,500 locations per file (~30,000 URLs).
const CHUNK_SIZE = 2500;

// 1. Tell Next.js how many sitemap files to generate
export async function generateSitemaps() {
  const totalSitemaps = Math.ceil(allLocations.length / CHUNK_SIZE);
  
  // Returns an array of objects like: [{ id: 0 }, { id: 1 }, { id: 2 }]
  return Array.from({ length: totalSitemaps }).map((_, i) => ({
    id: i,
  }));
}

// 2. Generate the exact XML content for each specific chunk
export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  // Determine which slice of the database this sitemap handles
  const start = id * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;
  const chunk = allLocations.slice(start, end);

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add the root homepage to the very first sitemap chunk
  if (id === 0) {
    sitemapEntries.push({
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, // Homepage gets maximum crawl priority
    });
  }

  // Iterate through the locations chunk and build the URL matrix
  chunk.forEach((city) => {
    LANGUAGES.forEach((lang) => {
      SUB_ROUTES.forEach((route) => {
        // Construct the full URL path
        const url = `${BASE_URL}/${lang}/${city.country_slug}/${city.region_slug}/${city.name.toLowerCase()}${route}`;
        
        // SEO Priority Logic: Base city page > Appliance/Skin pages
        const priority = route === '' ? 0.8 : 0.6;

        sitemapEntries.push({
          url,
          lastModified: new Date(),
          changeFrequency: 'monthly', // Static data doesn't change daily
          priority,
        });
      });
    });
  });

  return sitemapEntries;
}