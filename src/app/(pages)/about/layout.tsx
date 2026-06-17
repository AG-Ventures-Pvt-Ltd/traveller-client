import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Wondrr — India's Verified Group Travel Marketplace",
  description:
    "Wondrr is a trust-first platform connecting travelers with verified Indian travel operators. Learn how we bring structure and transparency to group travel.",
  alternates: {
    canonical: 'https://wondrr.in/about',
  },
  openGraph: {
    title: "About Wondrr — India's Verified Group Travel Marketplace",
    description:
      "Wondrr is a trust-first platform connecting travelers with verified Indian travel operators. Learn how we bring structure and transparency to group travel.",
    url: 'https://wondrr.in/about',
    type: 'website',
    images: [{ url: 'https://wondrr.in/png/metadata.png', width: 3944, height: 1584, alt: "Wondrr — India's Verified Group Travel Marketplace" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About Wondrr — India's Verified Group Travel Marketplace",
    description: "Wondrr is a trust-first platform connecting travelers with verified Indian travel operators. Learn how we bring structure and transparency to group travel.",
    images: ['https://wondrr.in/png/metadata.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="px-4">
        {children}
        </div>;
}