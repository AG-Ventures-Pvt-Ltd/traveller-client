import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerData } from '@/services/serverApi';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { getHostMeta } from './serverFetch';
import HostProfileClient from './HostProfileClient';

export const dynamic = 'force-dynamic';

const MOBILE_UA = /Android.+Mobile|iPhone|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile|Mobile.+Firefox|Firefox.+Mobile/i;

async function prefetch(qc: QueryClient, url: string) {
  try {
    await qc.prefetchQuery({ queryKey: [url], queryFn: () => getServerData(url) });
  } catch {
    // single API failure shouldn't block the page — client will refetch
  }
}

export default async function HostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lower = id.toLowerCase();

  if (id !== lower) {
    redirect(`/${lower}`);
  }

  if (!(await getHostMeta(lower))) {
    notFound();
  }

  const ua = (await headers()).get('user-agent') || '';
  const initialIsMobile = MOBILE_UA.test(ua);
  const limit = initialIsMobile ? 6 : 8;

  const hostProfileUrl = API_ENDPOINTS.USER.HOST_PROFILE(lower);
  const tripsUrl = API_ENDPOINTS.HOST.TRIPS(lower, 1, limit);
  const archivedUrl = API_ENDPOINTS.HOST.ARCHIVED_TRIPS(lower, 1, limit);
  const reviewsUrl = API_ENDPOINTS.REVIEW.PROFILE(lower);

  const qc = new QueryClient();

  await Promise.all([
    prefetch(qc, hostProfileUrl),
    prefetch(qc, tripsUrl),
    prefetch(qc, archivedUrl),
    prefetch(qc, reviewsUrl),
  ]);

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <HostProfileClient initialIsMobile={initialIsMobile} />
    </HydrationBoundary>
  );
}
