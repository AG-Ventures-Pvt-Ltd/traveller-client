import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wondrr - Group Trips from India's Top Travel Brands",
    short_name: 'Wondrr',
    description:
      "Browse and book group trips from India's top verified travel brands — all on one platform.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF9F4',
    theme_color: '#171717',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
