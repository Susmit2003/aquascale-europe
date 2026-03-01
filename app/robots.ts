

// app/robots.ts;

import { MetadataRoute } from 'next'

const baseUrl = 'https://waterhardnessscale.com' ;// ← replace with your real domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/dashboard/',
          '/private/',
          '/data/',
          '/json/',
          '/*.json$',
          '/*?*',           // blocks parameter URLs (important for crawl control)
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}