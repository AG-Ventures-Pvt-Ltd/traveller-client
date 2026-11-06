import { headers } from 'next/headers';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerData } from '@/services/serverApi';
import TripsPageClient from './TripsPageClient';
import { buildTripsApiUrl, parseFilters } from './buildApiUrl';
import { TripsResponse } from './types';
import { getServerLocation } from '@/common/utils/serverLocation';
import { ServerLocationProvider } from '@/common/hooks/useTripLocation';
import { withLocation } from '@/common/utils/locationQuery';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

export const dynamic = 'force-dynamic';

const MOBILE_UA = /Android.+Mobile|iPhone|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile|Mobile.+Firefox|Firefox.+Mobile/i;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const destination = sp.destination || null;
  const qParam = sp.q || null;
  const hostParam = sp.host || null;
  const statusParam = sp.status || null;

  const ua = (await headers()).get('user-agent') || '';
  const initialIsMobile = MOBILE_UA.test(ua);

  // Filters come from the same URL the client reads, so the server renders the filtered
  // list and the query key matches — otherwise the HydrationBoundary cache is bypassed
  // and the client immediately refetches what was just rendered.
  const filters = parseFilters(sp);
  // Visitor location from their own request (cookie → Vercel IP geo → Delhi);
  // the client builds the same URL from ServerLocationProvider, so the key matches.
  const loc = await getServerLocation();
  const apiUrl = buildTripsApiUrl(filters, { destination, qParam, hostParam, statusParam, page: 1, loc });

  const queryClient = new QueryClient();
  const CITIES = API_ENDPOINTS.LANDING_PAGE.CITIES;
  // allSettled: a single API hiccup shouldn't blank the page — the client will retry.
  const [tripsResult] = await Promise.allSettled([
    queryClient.fetchQuery({
      queryKey: [apiUrl],
      queryFn: () => getServerData<TripsResponse>(apiUrl),
    }),
    // Departure-city picker list (key matches its useGetData call).
    queryClient.prefetchQuery({ queryKey: [CITIES], queryFn: () => getServerData(withLocation(CITIES, loc)) }),
  ]);
  const initialData = tripsResult.status === 'fulfilled' ? tripsResult.value : null;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ServerLocationProvider value={loc}>
        <TripsPageClient
          initialTrips={initialData?.trips || []}
          initialPagination={initialData?.pagination || null}
          initialFilterMeta={initialData?.filterMeta || null}
          initialDepartureCity={initialData?.departureCity || null}
          initialIsMobile={initialIsMobile}
          destination={destination}
          qParam={qParam}
          hostParam={hostParam}
          statusParam={statusParam}
        />
      </ServerLocationProvider>
    </HydrationBoundary>
  );
}
