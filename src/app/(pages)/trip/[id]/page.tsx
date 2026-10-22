import TripPage from './components/TripPage';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { getServerData } from '@/services/serverApi';
import { TripMetadata, TripData } from './types';
import { JsonLd, SITE_URL } from '@/common/seo/JsonLd';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/services/getQueryClient';
import { getTripBasicDetails, getTripDetailedDetails } from './serverFetch';
import { generateSlug } from '../utils';
import { sortBatchesByDate } from './components/utils';

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
  const url = `${SITE_URL}/trip/${generateSlug(trip.title,slug)}`;

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
  const url = `${SITE_URL}/trip/${generateSlug(trip.title, slug)}`;
  const image = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${trip.image}`;

  // The trip-meta endpoint (`trip.priceFrom` etc.) rarely sends enrichment fields.
  // Derive the same data from BASIC_DETAILS/DETAILED_DETAILS instead — already
  // prefetched below, cache()-deduped, so this costs no extra request.
  const [basic, detailedForSchema] = await Promise.all([
    getTripBasicDetails(slug) as Promise<Partial<TripData> | null>,
    getTripDetailedDetails(slug) as Promise<Partial<TripData> | null>,
  ]);
  const merged: Partial<TripData> = { ...basic, ...detailedForSchema };

  const upcomingBatches = (merged.tripBatches || []).filter((b) => (b.seatsAvailable ?? 0) > 0);
  const sortedBatches = sortBatchesByDate(upcomingBatches.length ? upcomingBatches : merged.tripBatches || []);
  const nextBatch = sortedBatches[0];
  const lowestPrice = (merged.tripBatches || []).reduce<number | undefined>((min, b) => {
    return typeof b.price === 'number' && (min === undefined || b.price < min) ? b.price : min;
  }, undefined) ?? merged.pricing?.pricings?.[0]?.pricePerPerson;

  const touristTrip: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trip.title,
    description: merged.description || `${trip.numberOfDays}-day group trip to ${trip.location} with ${trip.hostName} on Wondrr.`,
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

  if (typeof lowestPrice === 'number') {
    touristTrip.offers = {
      '@type': 'Offer',
      price: lowestPrice,
      priceCurrency: trip.priceCurrency || 'INR',
      availability: upcomingBatches.length > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      ...(nextBatch?.startDate && { validFrom: new Date(nextBatch.startDate).toISOString() }),
      url,
    };
  }

  const startDate = nextBatch?.startDate ?? trip.startDate;
  const endDate = nextBatch?.endDate ?? trip.endDate;
  if (startDate) touristTrip.startDate = new Date(startDate).toISOString().slice(0, 10);
  if (endDate) touristTrip.endDate = new Date(endDate).toISOString().slice(0, 10);

  const rating = merged.rating ?? trip.rating;
  const reviewCount = merged.totalReviews ?? trip.reviewCount;
  if (typeof rating === 'number' && typeof reviewCount === 'number' && reviewCount > 0) {
    touristTrip.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount,
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

  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [API_ENDPOINTS.TRIPS.BASIC_DETAILS(slug)],
      queryFn: () => getTripBasicDetails(slug),
    }),
    queryClient.prefetchQuery({
      queryKey: [API_ENDPOINTS.TRIPS.DETAILED_DETAILS(slug)],
      queryFn: () => getTripDetailedDetails(slug),
    }),
  ]);

  const schemas: Record<string, unknown>[] = [touristTrip, breadcrumb];

  if (detailedForSchema?.faqs && detailedForSchema.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: detailedForSchema.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return (
    <>
      <JsonLd data={schemas} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TripPage />
      </HydrationBoundary>
    </>
  );
}
