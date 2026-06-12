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
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://checkout.razorpay.com https://www.googletagmanager.com https://www.clarity.ms https://connect.facebook.net",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://d1hjk5b7z017su.cloudfront.net https://www.facebook.com https://lh3.googleusercontent.com https://images.unsplash.com",
              "connect-src 'self' https:",
              "font-src 'self' data:",
              "frame-src https://checkout.razorpay.com",
              "frame-ancestors 'self'",
            ].join('; '),
          },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },

};

export default nextConfig;
