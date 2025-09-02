import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ['res.cloudinary.com','lh3.googleusercontent.com'],
  },
};

export default nextConfig;
