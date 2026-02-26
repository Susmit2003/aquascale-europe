import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://aquascale-europe.com'; // Replace with your production domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Prevent crawlers from wasting crawl budget on backend routes or dynamic search parameters
      disallow: ['/api/', '/_next/', '/*?*'], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}