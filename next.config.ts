import type { NextConfig } from 'next';
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  // Service worker only makes sense against a real deployed origin — skip it
  // in dev so it doesn't fight Turbopack's own HMR/caching.
  disable: process.env.NODE_ENV !== 'production',
  // next-pwa's auto-register only knows how to patch pages/_app.js — this is an
  // App Router project, so registration happens manually (see ServiceWorkerRegister).
  register: false,
  skipWaiting: true,
  // Precaching these build-internal manifests 404s, since they're dev/SSR-only
  // artifacts — same workaround every next-pwa + App Router setup needs.
  buildExcludes: [/middleware-manifest\.json$/, /app-build-manifest\.json$/, /_middleware\.js$/],
});

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
      {
        // Renamed Travel SIP -> Travel Pass. 301 preserves SEO equity and old links/redirects.
        source: '/travel-sip/:path*',
        destination: '/travel-pass/:path*',
        permanent: true,
      },
    ];
  },

  async headers() {
    // Next dev mode needs 'unsafe-eval' for HMR/react-refresh stack traces — prod stays strict.
    const isDev = process.env.NODE_ENV !== 'production';
    // Razorpay/Cashfree spread checkout across many subdomains — allow them wholesale.
    const PAY = 'https://*.razorpay.com https://razorpay.com https://*.cashfree.com https://cashfree.com';

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
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} ${PAY} https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://connect.facebook.net`,
              `script-src-elem 'self' 'unsafe-inline' ${PAY} https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://connect.facebook.net`,
              `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ${PAY}`,
              `img-src 'self' data: blob: https://d1hjk5b7z017su.cloudfront.net https://www.facebook.com https://lh3.googleusercontent.com https://images.unsplash.com ${PAY}`,
              "media-src 'self' https://d1hjk5b7z017su.cloudfront.net",
              `connect-src 'self' https:${isDev ? ' http://localhost:*' : ''}`,
              `font-src 'self' data: https://fonts.gstatic.com ${PAY}`,
              `frame-src ${PAY}`,
              "frame-ancestors 'self'",
            ].join('; '),
          },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },

};

export default withPWA(nextConfig);
