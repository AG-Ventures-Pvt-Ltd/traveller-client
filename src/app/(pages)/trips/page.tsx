import { headers } from 'next/headers';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerData } from '@/services/serverApi';
import TripsPageClient from './TripsPageClient';
import { buildTripsApiUrl, EMPTY_FILTERS } from './buildApiUrl';
import { TripsResponse } from './types';

export const dynamic = 'force-dynamic';

const MOBILE_UA = /Android.+Mobile|iPhone|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile|Mobile.+Firefox|Firefox.+Mobile/i;

interface TripsPageSearchParams {
  destination?: string;
  q?: string;
  host?: string;
  status?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<TripsPageSearchParams>;
}) {
  const sp = await searchParams;
  const destination = sp.destination || null;
  const qParam = sp.q || null;
  const hostParam = sp.host || null;
  const statusParam = sp.status || null;

  const ua = (await headers()).get('user-agent') || '';
  const initialIsMobile = MOBILE_UA.test(ua);

  const apiUrl = buildTripsApiUrl(EMPTY_FILTERS, { destination, qParam, hostParam, statusParam, page: 1 });

  const queryClient = new QueryClient();
  let initialData: TripsResponse | null = null;
  try {
    initialData = await queryClient.fetchQuery({
      queryKey: [apiUrl],
      queryFn: () => getServerData<TripsResponse>(apiUrl),
    });
  } catch {
    // single API hiccup shouldn't blank the page — the client will retry
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TripsPageClient
        initialTrips={initialData?.trips || []}
        initialPagination={initialData?.pagination || null}
        initialIsMobile={initialIsMobile}
        destination={destination}
        qParam={qParam}
        hostParam={hostParam}
        statusParam={statusParam}
      />
    </HydrationBoundary>
  );
}
