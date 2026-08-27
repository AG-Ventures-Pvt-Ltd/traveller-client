import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Group Trips | Browse & Book Verified Adventures — Wondrr',
  description:
    'Explore curated group trips across India and abroad. Verified operators, groups capped at 15. Treks, road trips, weekend getaways and more. Book on Wondrr.',
  alternates: { canonical: 'https://wondrr.in/trips' },
  openGraph: {
    title: 'All Group Trips | Browse & Book Verified Adventures — Wondrr',
    description:
      'Explore curated group trips across India and abroad. Verified operators, groups capped at 15. Book on Wondrr.',
    url: 'https://wondrr.in/trips',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // flex-1 rather than min-h-screen: fills the space under the navbar instead of forcing a
  // full viewport on top of it, which made the page scroll even with three trips.
  return <div className="flex flex-1 flex-col bg-[#FFF9F4]">{children}</div>;
}