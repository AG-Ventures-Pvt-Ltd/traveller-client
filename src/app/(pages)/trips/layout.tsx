import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Trips in India: Treks, Road Trips & Weekend Getaways',
  description:
    'Browse fixed-departure group trips across India and abroad. Filter treks, road trips and weekend getaways by state, month and budget.',
  alternates: { canonical: 'https://wondrr.in/trips' },
  openGraph: {
    title: 'Group Trips in India: Treks, Road Trips & Weekend Getaways',
    description:
      'Browse fixed-departure group trips across India and abroad. Filter treks, road trips and weekend getaways by state, month and budget.',
    url: 'https://wondrr.in/trips',
    type: 'website',
    siteName: 'Wondrr',
    locale: 'en_IN',
    images: [{ url: 'https://wondrr.in/png/metadata.png', width: 3944, height: 1584, alt: 'Wondrr — group trips from India\'s top travel brands' }],
  },
  twitter: { card: 'summary_large_image', title: 'Group Trips in India: Treks, Road Trips & Weekend Getaways', images: ['https://wondrr.in/png/metadata.png'] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // flex-1 rather than min-h-screen: fills the space under the navbar instead of forcing a
  // full viewport on top of it, which made the page scroll even with three trips.
  return <div className="flex flex-1 flex-col bg-[#FFF9F4]">{children}</div>;
}