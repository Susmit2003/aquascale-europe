// app/robots.ts
import { MetadataRoute } from 'next'

const baseUrl = 'https://waterhardnessscale.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/', // Explicitly allow CSS/JS for Googlebot rendering
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/admin-portal/',
          '/dashboard/',
          '/private/',
          '/data/',
          '/json/',
          '/*.json$',
          '/*?*', // Excellent: blocks parameter URLs to prevent crawl traps
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}