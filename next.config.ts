import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  // Disable strict mode to prevent double rendering in dev
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ['@mui/material', 'lucide-react', '@tanstack/react-query'],
  },
  // Sibling repos under the same parent dir make Turbopack probe that
  // parent as a candidate workspace root, breaking module resolution
  // (e.g. tailwindcss) and stalling compiles for ~90s. Pin the root.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'd1hjk5b7z017su.cloudfront.net' }
    ],
    qualities: [90, 100],
  },

  async redirects() {
    return [
      {
        source: '/girls-trips',
        destination: '/trips',
        permanent: true,
      },
      {
        source: '/trip',
        destination: '/trips',
        permanent: true,
      },
      {
        // Page removed — content merged into /about. 301 preserves SEO equity.
        source: '/how-we-work',
        destination: '/about',
        permanent: true,
      },
    ];
  },

  async headers() {
    // Next dev mode needs 'unsafe-eval' for HMR/react-refresh stack traces — prod stays strict.
    const isDev = process.env.NODE_ENV !== 'production';

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
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://checkout.razorpay.com https://cdn.razorpay.com https://sdk.cashfree.com https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://connect.facebook.net`,
              `script-src-elem 'self' 'unsafe-inline' https://checkout.razorpay.com https://cdn.razorpay.com https://sdk.cashfree.com https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://connect.facebook.net`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://d1hjk5b7z017su.cloudfront.net https://www.facebook.com https://lh3.googleusercontent.com https://images.unsplash.com",
              "media-src 'self' https://d1hjk5b7z017su.cloudfront.net",
              `connect-src 'self' https:${isDev ? ' http://localhost:*' : ''}`,
              "font-src 'self' data:",
              "frame-src https://checkout.razorpay.com https://sandbox.cashfree.com https://sdk.cashfree.com https://api.razorpay.com https://payments.cashfree.com https://payments-test.cashfree.com",
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
