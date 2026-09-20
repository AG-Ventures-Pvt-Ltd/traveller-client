'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import MyImage from '@/common/ui/Image';
import Footer from '../../(landing)/components/Footer/Footer';
import MobileCarouselCard from '../../(landing)/components/MobileLanding/components/CarouselCard';
import DesktopCarouselCard from '../../(landing)/components/DesktopLanding/components/CarouselCard';
import { useGetData } from '@/services/useGetData';
import { useDevice } from '@/common/hooks/useDevice';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface StateTrip {
  id: string;
  tripSlug: string;
  title: string;
  image: string;
  location: string;
  hostName: string;
  hostUsername: string;
  rating: number;
  price: number;
  days: string;
  nextTripDate: string | null;
  isBookmarked: boolean;
}

interface StateTripsResponse {
  state: { stateCode: string; name: string; imageUrl: string };
  trips: StateTrip[];
}

// Same rotation the landing carousels use, so a trip looks the same in both places.
const COLOR_SCHEMES: Array<'yellow' | 'green' | 'purple'> = ['yellow', 'green', 'purple'];

const formatNextDate = (iso: string | null): string | null => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

const CardSkeleton = () => (
  <div className="aspect-[3/4] animate-pulse rounded-3xl bg-black/5" />
);

export default function StateExplorePage() {
  const params = useParams();
  const router = useRouter();
  const { isMobile, isHydrated } = useDevice();
  const stateCode = String(params?.stateCode || '').toUpperCase();

  const { data, isLoading, isError } = useGetData<StateTripsResponse>(
    API_ENDPOINTS.LANDING_PAGE.TRIPS_BY_STATE(stateCode)
  );

  const stateName = data?.state?.name || stateCode;
  const stateImage = data?.state?.imageUrl;
  const trips = data?.trips ?? [];

  // Cards differ per device the same way the landing page's do, so hold the grid
  // until the device is known rather than rendering the wrong one and swapping.
  const showSkeletons = isLoading || !isHydrated;

  const grid = 'grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4';

  return (
    <main className="min-h-screen bg-[#FFF9F4]">
      <header className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-9 sm:pt-8">
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 sm:text-sm">
          <button onClick={() => router.push('/')} className="transition-colors hover:text-neutral-900">
            Home
          </button>
          <ChevronRight size={13} className="shrink-0" />
          <span className="truncate font-semibold text-neutral-900">{stateName}</span>
        </nav>

        {/* Title block — the state image doubles as the visual anchor so the page
            doesn't open on a wall of text. */}
        <div className="mt-4 flex items-center gap-4 sm:mt-7 sm:gap-6">
          {stateImage && (
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-4 border-[#FFD976] sm:h-28 sm:w-28">
              <MyImage src={stateImage} alt={stateName} className="h-full w-full" rounded={false} />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C4532A] sm:text-xs">
              Explore · India
            </p>
            <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              {stateName}
            </h1>
            {!isLoading && (
              <p className="mt-1.5 text-xs font-medium text-neutral-500 sm:text-base">
                {trips.length > 0
                  ? `${trips.length} ${trips.length === 1 ? 'group trip' : 'group trips'} for solo travellers`
                  : 'No upcoming trips right now'}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-9 sm:py-10">
        {showSkeletons ? (
          <div className={grid}>
            {[0, 1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : isError || trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center sm:py-24">
            <span className="text-5xl">🧭</span>
            <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">Nothing here yet</h2>
            <p className="max-w-md text-sm text-neutral-500 sm:text-base">
              No upcoming trips in {stateName} right now. Check back soon or explore another destination.
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
            >
              <ArrowLeft size={14} /> Back to home
            </Link>
          </div>
        ) : (
          <div className={grid}>
            {trips.map((trip, i) => {
              const Card = isMobile ? MobileCarouselCard : DesktopCarouselCard;
              return (
                <Card
                  key={trip.id}
                  id={trip.id}
                  tripSlug={trip.tripSlug}
                  image={trip.image}
                  title={trip.title}
                  provider={trip.hostName}
                  hostUsername={trip.hostUsername}
                  duration={trip.days}
                  price={trip.price}
                  rating={trip.rating}
                  isBookmarked={trip.isBookmarked}
                  colorScheme={COLOR_SCHEMES[i % COLOR_SCHEMES.length]}
                  nextDate={formatNextDate(trip.nextTripDate)}
                  source="explore"
                  priority={i < 4}
                />
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
