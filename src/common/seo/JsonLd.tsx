import React from 'react';

type JsonLdData = Record<string, unknown>;

/**
 * Emits valid JSON-LD as a real <script type="application/ld+json"> block.
 * Use this instead of the `other: { 'script:ld+json' }` metadata hack — Google
 * does not parse JSON-LD delivered via <meta>.
 */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  // Escape `<` so backend-sourced strings (host names, trip titles) cannot break
  // out of the <script> context with a literal "</script>" — prevents XSS.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export const SITE_URL = 'https://wondrr.in';

export const organizationSchema: JsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': `${SITE_URL}/#organization`,
  name: 'Wondrr',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/png/metadata.png`,
    width: 3944,
    height: 1584,
  },
  image: `${SITE_URL}/png/metadata.png`,
  description:
    "Wondrr is a travel marketplace to discover and book fixed-departure group trips from India's top verified travel brands.",
  areaServed: { '@type': 'Country', name: 'India' },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/wondrr.in',
    'https://www.linkedin.com/company/wondrr',
  ],
};

export const websiteSchema: JsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Wondrr',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};
