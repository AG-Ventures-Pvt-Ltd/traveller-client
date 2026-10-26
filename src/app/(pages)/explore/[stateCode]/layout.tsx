import type { Metadata } from 'next';
import { getStateTrips } from './serverFetch';
import { exploreMeta } from '@/common/seo/meta';
import { MIN_INDEXABLE_TRIPS } from './stateContent';

// Without this, the page inherited the shared (pages) layout's canonical,
// which wrongly pointed every explore/[stateCode] URL at "/".
export async function generateMetadata({
  params,
}: {
  params: Promise<{ stateCode: string }>;
}): Promise<Metadata> {
  const { stateCode } = await params;
  const code = stateCode.toUpperCase();
  const data = await getStateTrips(code);
  const stateName = data?.state?.name || code;

  const trips = data?.trips ?? [];
  const upcoming = trips.filter((t) => t.nextTripDate).length;
  const prices = trips.map((t) => t.price).filter((p) => typeof p === 'number' && p > 0);
  const { title, description } = exploreMeta(stateName, prices.length ? Math.min(...prices) : undefined, upcoming);
  const canonical = `https://wondrr.in/explore/${code}`;

  return {
    title,
    description,
    alternates: { canonical },
    ...(upcoming < MIN_INDEXABLE_TRIPS && { robots: { index: false, follow: true } }),
    openGraph: {
      title, description, url: canonical, type: 'website', siteName: 'Wondrr', locale: 'en_IN',
      images: [{ url: 'https://wondrr.in/png/metadata.png', width: 3944, height: 1584, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['https://wondrr.in/png/metadata.png'] },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
