import type { Metadata } from 'next';
import { JsonLd, SITE_URL } from '@/common/seo/JsonLd';
import { FAQS, STEPS } from './constants';

export const metadata: Metadata = {
  title: 'Partner With Us | List Your Trips on Wondrr',
  description:
    'Are you a travel operator? Partner with Wondrr to list your fixed-departure group trips and reach thousands of solo travelers actively looking to book.',
  alternates: { canonical: 'https://wondrr.in/partner-with-us' },
  openGraph: {
    title: 'Partner With Us | List Your Trips on Wondrr',
    description:
      'Partner with Wondrr to list your fixed-departure group trips and reach thousands of solo travelers actively looking to book.',
    url: 'https://wondrr.in/partner-with-us',
    type: 'website',
    images: [{ url: 'https://wondrr.in/png/metadata.png', width: 3944, height: 1584, alt: 'Partner with Wondrr' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner With Us | List Your Trips on Wondrr',
    description:
      'Partner with Wondrr to list your fixed-departure group trips and reach travelers across India.',
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
