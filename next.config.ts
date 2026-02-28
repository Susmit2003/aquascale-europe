// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.geoapify.com', // 🟢 Added Geoapify
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;