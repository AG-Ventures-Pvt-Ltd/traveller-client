import { headers } from 'next/headers';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerData } from '@/services/serverApi';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import LandingClient from './(landing)/LandingClient';

// SSR fresh on every request so trip cards, destinations, copy and internal links
// are present in the initial HTML (fixes the CSR empty-shell / slow-LCP problem).
export const dynamic = 'force-dynamic';

async function prefetch(qc: QueryClient, queryKey: unknown[], url: string) {
  try {
    await qc.prefetchQuery({ queryKey, queryFn: () => getServerData(url) });
  } catch {
    // A single API hiccup shouldn't blank the homepage — the client will refetch.
  }
}

// Phones (incl. mobile-first Googlebot) report a UA with one of these tokens.
// iPads/tablets report desktop-like UAs and are treated as desktop (≥768px).
const MOBILE_UA = /Android.+Mobile|iPhone|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile|Mobile.+Firefox|Firefox.+Mobile/i;

export default async function Page() {
  const ua = (await headers()).get('user-agent') || '';
  const initialIsMobile = MOBILE_UA.test(ua);

  const qc = new QueryClient();
  const L = API_ENDPOINTS.LANDING_PAGE;

  // Query keys MUST match the client hooks (useFeaturedTrips, useSignupBonus,
  // useGetData) so HydrationBoundary feeds the SSR'd components their data.
  await Promise.all([
    prefetch(qc, ['featured-trips'], L.FEATURED_TRIPS),
    prefetch(qc, [L.CITIES], L.CITIES),
    prefetch(qc, [L.EXPLORE_STATES], L.EXPLORE_STATES),
    prefetch(qc, ['signup-bonus'], L.SIGNUP_BONUS),
    prefetch(qc, [L.TRAVELER_STATS], L.TRAVELER_STATS),
  ]);

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <LandingClient initialIsMobile={initialIsMobile} />
    </HydrationBoundary>
  );
}
