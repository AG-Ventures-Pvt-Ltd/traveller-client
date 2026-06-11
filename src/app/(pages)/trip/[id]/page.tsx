import TripPage from './components/TripPage'; // your existing component, renamed
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { getServerData } from '@/services/serverApi';
import { TripMetadata } from './types';
import { JsonLd, SITE_URL } from '@/common/seo/JsonLd';
import { notFound } from 'next/navigation';
import { cache } from 'react';

// cache() dedupes the fetch across generateMetadata + Page within one request.
const getTripMeta = cache(async (id: string): Promise<{ slug: string; trip: TripMetadata } | null> => {
  const slug = id.split('-').pop() || '';
  if (!slug) return null;
  try {
    const trip = await getServerData<TripMetadata>(API_ENDPOINTS.TRIPS.GET_METADATA(slug));
    return { slug, trip };
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const data = await getTripMeta(id);

  // 404 unknown trips here (in generateMetadata) so the status is set before the
  // response shell streams — calling notFound() during render leaves a soft 200.
  if (!data) {
    notFound();
  }

  const { slug, trip } = data;

  const title = `${trip.title} · ${trip.numberOfDays} Days in ${trip.location}`;
  const description = `${trip.hostName} on Wondrr is taking a group trip to ${trip.location} for ${trip.numberOfDays} days. Tap to see more details! 🌍`;
  const image = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${trip.image}`;
  const url = `${SITE_URL}/trip/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 600 }],
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getTripMeta(id);

  if (!data) {
    notFound();
  }

  const { slug, trip } = data;
  const url = `${SITE_URL}/trip/${slug}`;
  const image = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${trip.image}`;

  const touristTrip: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trip.title,
    description: `${trip.numberOfDays}-day group trip to ${trip.location} with ${trip.hostName} on Wondrr.`,
    url,
    image,
    touristType: 'Group travellers',
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: trip.numberOfDays,
    },
    provider: {
      '@type': 'TravelAgency',
      name: trip.hostName,
      ...(trip.hostUsername && { url: `${SITE_URL}/${trip.hostUsername}` }),
    },
  };

  if (typeof trip.priceFrom === 'number') {
    touristTrip.offers = {
      '@type': 'Offer',
      price: trip.priceFrom,
      priceCurrency: trip.priceCurrency || 'INR',
      availability: 'https://schema.org/InStock',
      url,
    };
  }

  if (typeof trip.rating === 'number' && typeof trip.reviewCount === 'number' && trip.reviewCount > 0) {
    touristTrip.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: trip.rating,
      reviewCount: trip.reviewCount,
    };
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Trips', item: `${SITE_URL}/trips` },
      { '@type': 'ListItem', position: 3, name: trip.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={[touristTrip, breadcrumb]} />
      <TripPage />
    </>
  );
}
