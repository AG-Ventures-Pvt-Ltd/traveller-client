import { headers } from 'next/headers';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import MyImage from '@/common/ui/Image';
import Footer from '../../(landing)/components/Footer/Footer';
import { JsonLd, SITE_URL } from '@/common/seo/JsonLd';
import { getStateTrips } from './serverFetch';
import ExploreStateGrid from './ExploreStateGrid';

// Trip list and prices change often enough (batches sell out, new ones open) that a
// cached page would go stale — matches the same tradeoff made on the home page.
export const dynamic = 'force-dynamic';

// Phones (incl. mobile-first Googlebot) report a UA with one of these tokens.
const MOBILE_UA = /Android.+Mobile|iPhone|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile|Mobile.+Firefox|Firefox.+Mobile/i;

export default async function StateExplorePage({ params }: { params: Promise<{ stateCode: string }> }) {
  const { stateCode: rawStateCode } = await params;
  const stateCode = rawStateCode.toUpperCase();

  const ua = (await headers()).get('user-agent') || '';
  const initialIsMobile = MOBILE_UA.test(ua);

  const data = await getStateTrips(stateCode);
  const stateName = data?.state?.name || stateCode;
  const stateImage = data?.state?.imageUrl;
  const trips = data?.trips ?? [];

  const url = `${SITE_URL}/explore/${stateCode}`;
  const tripCountLine =
    trips.length > 0
      ? `${trips.length} ${trips.length === 1 ? 'group trip' : 'group trips'} for solo travellers`
      : 'No upcoming trips right now';

  // Generic, honest copy — no state-specific claims we can't back with real data
  // (ratings, "best time to visit" etc. would need a backend field we don't have).
  const introCopy = `Wondrr lists fixed-departure group trips in ${stateName} run by verified Indian travel operators. Every trip shown below has a confirmed departure date, upfront pricing and a published refund policy — book with a group of solo travellers, not a private tour.`;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Explore', item: `${SITE_URL}/explore` },
      { '@type': 'ListItem', position: 3, name: stateName, item: url },
    ],
  };

  const schemas: Record<string, unknown>[] = [breadcrumb];

  if (trips.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: trips.map((trip, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/trip/${trip.tripSlug}`,
        name: trip.title,
      })),
    });
  }

  return (
    <main className="min-h-screen bg-[#FFF9F4]">
      <JsonLd data={schemas} />
      <header className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-9 sm:pt-8">
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 sm:text-sm">
          <Link href="/" className="transition-colors hover:text-neutral-900">
            Home
          </Link>
          <ChevronRight size={13} className="shrink-0" />
          <span className="truncate font-semibold text-neutral-900">{stateName}</span>
        </nav>

        {/* Title block — the state image doubles as the visual anchor so the page
            doesn't open on a wall of text. */}
        <div className="mt-4 flex items-center gap-4 sm:mt-7 sm:gap-6">
          {stateImage && (
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-4 border-[#FFD976] sm:h-28 sm:w-28">
              <MyImage src={stateImage} alt={stateName} className="h-full w-full" rounded={false} sizes="112px" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C4532A] sm:text-xs">
              Explore · India
            </p>
            <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              {stateName}
            </h1>
            <p className="mt-1.5 text-xs font-medium text-neutral-500 sm:text-base">{tripCountLine}</p>
          </div>
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-base">{introCopy}</p>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-9 sm:py-10">
        <ExploreStateGrid trips={trips} stateName={stateName} initialIsMobile={initialIsMobile} />
      </div>

      <Footer />
    </main>
  );
}
