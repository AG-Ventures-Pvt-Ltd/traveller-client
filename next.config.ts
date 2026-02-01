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
    { protocol: 'https', hostname: 'placehold.co' },
    { protocol: 'https', hostname : 'd1hjk5b7z017su.cloudfront.net'}
  ],
  qualities: [90,100],
},

};

export default nextConfig;
