import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. Enforce strict URL consistency for SEO PageRank consolidation
  trailingSlash: false,
  
  // 2. Enterprise Security Headers
  async headers() {
    return [
      {
        // Apply these headers to all routes in the application
        source: '/(.*)',
        headers: [
          {
            // Protects against Clickjacking (ensures your ads aren't overlaid by malicious iframes)
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            // Forces browsers to respect the MIME type, preventing MIME sniffing attacks
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Controls how much referrer information is sent when navigating away
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Enforces HTTPS routing strictly for 2 years (Google heavily rewards this)
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // Prevents Cross-Site Scripting (XSS) while allowing Google AdSense scripts to execute
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://pagead2.googlesyndication.com",
          },
          {
            // Disables access to specific device features for privacy compliance (GDPR)
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          }
        ],
      },
    ];
  },
};

export default nextConfig;