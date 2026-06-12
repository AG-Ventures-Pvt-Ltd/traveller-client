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
import Link from 'next/link';

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

  if (trip.startDate) touristTrip.startDate = trip.startDate;
  if (trip.endDate) touristTrip.endDate = trip.endDate;

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

  // cache() dedupes this call — no extra network request since prefetchQuery already fetched it.
  const detailed = await getTripDetailedDetails(slug) as Partial<TripData> | null;
  const schemas: Record<string, unknown>[] = [touristTrip, breadcrumb];

  if (detailed?.faqs && detailed.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: detailed.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return (
    <>
      <JsonLd data={schemas} />
      <nav aria-label="Breadcrumb" className="px-4 sm:px-9 py-2 text-sm text-neutral-500">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li><Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/trips" className="hover:text-neutral-900 transition-colors">Trips</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-900 font-medium truncate max-w-[220px] sm:max-w-none">{trip.title}</li>
        </ol>
      </nav>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TripPage />
      </HydrationBoundary>
    </>
  );
}
