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
  alternateName: ['Wondrr.in', 'Wondrr Trips'],
  legalName: 'Madhurmani Networks (OPC) Pvt. Ltd.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    // Square (>=112px) as Google's logo guidelines require; metadata.png is a wide banner.
    url: `${SITE_URL}/png/favicon.png`,
    width: 513,
    height: 513,
  },
  image: `${SITE_URL}/png/metadata.png`,
  description:
    "Wondrr is a travel marketplace to discover and book fixed-departure group trips from India's top verified travel brands.",
  telephone: '+91-9667427187',
  email: 'support@wondrr.in',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9667427187',
    email: 'support@wondrr.in',
    contactType: 'customer support',
    areaServed: 'IN',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/wondrr.in',
    'https://www.linkedin.com/company/wondrr',
    'https://www.youtube.com/@wondrrtrips',
  ],
};

export const websiteSchema: JsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Wondrr',
  alternateName: ['Wondrr.in'],
  publisher: { '@id': `${SITE_URL}/#organization` },
};
