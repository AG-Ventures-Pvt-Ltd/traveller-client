import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  // Disable strict mode to prevent double rendering in dev
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ['@mui/material', 'lucide-react', '@tanstack/react-query'],
  },
  images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname : 'd1hjk5b7z017su.cloudfront.net'}
  ],
  qualities: [90,100],
},

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },

};

export default nextConfig;
