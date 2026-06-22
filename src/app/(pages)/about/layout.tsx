import type { Metadata } from 'next';
import { JsonLd, SITE_URL } from '@/common/seo/JsonLd';
import { FAQS } from './constants';

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

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about#aboutpage`,
  url: `${SITE_URL}/about`,
  name: "About Wondrr — India's Verified Group Travel Marketplace",
  description:
    "Wondrr is a trust-first marketplace connecting travelers with verified Indian travel operators offering fixed-departure group trips.",
  inLanguage: 'en-IN',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  primaryImageOfPage: `${SITE_URL}/png/metadata.png`,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/about#faq`,
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[aboutPageSchema, breadcrumbSchema, faqSchema]} />
      {children}
    </>
  );
}
