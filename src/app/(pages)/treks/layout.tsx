import type { Metadata } from 'next';

const title = 'Group Treks in India: Himalayan & Weekend Treks';
const description =
  'Browse fixed-departure group treks across the Himalayas and Western Ghats. Filter by state, month, difficulty and budget.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://wondrr.in/treks' },
  openGraph: {
    title,
    description,
    url: 'https://wondrr.in/treks',
    type: 'website',
    siteName: 'Wondrr',
    locale: 'en_IN',
    images: [{ url: 'https://wondrr.in/png/metadata.png', width: 3944, height: 1584, alt: 'Wondrr — group treks from India\'s top trek operators' }],
  },
  twitter: { card: 'summary_large_image', title, images: ['https://wondrr.in/png/metadata.png'] },
};

export { default } from '../trips/layout';
