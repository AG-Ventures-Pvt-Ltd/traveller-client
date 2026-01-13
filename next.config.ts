import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    { protocol: 'https', hostname: 'placehold.co' },
    { protocol: 'https', hostname: 'wondrrprod.s3.ap-south-1.amazonaws.com' },
    { protocol: 'https', hostname : 'd1hjk5b7z017su.cloudfront.net'}
  ],
  qualities: [90,100],
},

};

export default nextConfig;
