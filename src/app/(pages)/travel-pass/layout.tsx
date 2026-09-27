import type { Metadata } from 'next';
import { JsonLd, SITE_URL } from '@/common/seo/JsonLd';
import { SIP_FAQS } from './constants';

export const metadata: Metadata = {
  title: 'Travel Pass — Auto-Save for Your Next Trip with a Bonus | Wondrr',
  description:
    'Set up a recurring auto-pay toward your next trip on Wondrr. Daily, weekly or monthly installments land in your Wondrr Cash wallet instantly, and hitting your target unlocks a bonus. Save solo or start a group with friends.',
  alternates: {
    canonical: `${SITE_URL}/travel-pass`,
  },
  openGraph: {
    title: 'Travel Pass — Auto-Save for Your Next Trip with a Bonus | Wondrr',
    description:
      'Recurring auto-pay toward your next trip. Installments land in your Wondrr Cash wallet instantly, with a bonus on completion.',
    url: `${SITE_URL}/travel-pass`,
    type: 'website',
    images: [{ url: `${SITE_URL}/png/metadata.png`, width: 3944, height: 1584, alt: 'Wondrr Travel Pass' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Pass — Auto-Save for Your Next Trip with a Bonus | Wondrr',
    description:
      'Recurring auto-pay toward your next trip. Installments land in your Wondrr Cash wallet instantly, with a bonus on completion.',
    images: [`${SITE_URL}/png/metadata.png`],
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/travel-pass#webpage`,
  url: `${SITE_URL}/travel-pass`,
  name: 'Travel Pass — Auto-Save for Your Next Trip with a Bonus',
  description:
    'Wondrr Travel Pass lets travelers auto-pay in daily, weekly or monthly installments toward a trip target, crediting a Wondrr Cash wallet with a bonus on completion.',
  inLanguage: 'en-IN',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Travel Pass', item: `${SITE_URL}/travel-pass` },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/travel-pass#faq`,
  mainEntity: SIP_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function TravelPassLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema, faqSchema]} />
      {children}
    </>
  );
}
