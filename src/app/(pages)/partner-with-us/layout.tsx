import type { Metadata } from 'next';
import { JsonLd, SITE_URL } from '@/common/seo/JsonLd';
import { FAQS, STEPS } from './constants';

export const metadata: Metadata = {
  title: 'List Your Group Trips on Wondrr | For Tour Operators',
  description:
    'Sell your treks and group tours to high-intent travellers. Brand-first listings, fair commissions, secure payouts and a batch dashboard. Join in 3 steps.',
  alternates: { canonical: 'https://wondrr.in/partner-with-us' },
  openGraph: {
    title: 'List Your Group Trips on Wondrr | For Tour Operators',
    description:
      'Sell your treks and group trips to high-intent travellers. Brand-first listings, fair commissions, secure payouts and clean dashboard for managing everything at one place. Join in 3 steps.',
    url: 'https://wondrr.in/partner-with-us',
    type: 'website',
    images: [{ url: 'https://wondrr.in/png/metadata.png', width: 3944, height: 1584, alt: 'Partner with Wondrr' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'List Your Group Trips on Wondrr | For Tour Operators',
    description:
      'Sell your treks and group tours to high-intent travellers. Brand-first listings, fair commissions, secure payouts and clean dashboard for managing everything at one place. Join in 3 steps.',
    images: ['https://wondrr.in/png/metadata.png'],
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${SITE_URL}/partner-with-us#howto`,
  name: 'How to become a Wondrr travel partner',
  description: 'Apply, set up your operator profile, and list your group trips on Wondrr.',
  inLanguage: 'en-IN',
  step: STEPS.items.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.text,
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Partner With Us', item: `${SITE_URL}/partner-with-us` },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/partner-with-us#faq`,
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[howToSchema, breadcrumbSchema, faqSchema]} />
      {children}
    </>
  );
}
