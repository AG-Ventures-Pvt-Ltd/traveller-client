'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HeartIcon, SealCheckIcon, StarIcon, CurrencyInrIcon } from '@phosphor-icons/react';
import { ArrowLeft, Compass, Calendar } from 'lucide-react';
import MyImage from '@/common/ui/Image';
import Footer from '../../(landing)/components/Footer/Footer';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { useBookMarking } from '@/common/hooks/useBookMarking';

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

const formatNextDate = (iso: string | null): string | null => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const StateTripCard: React.FC<{ trip: StateTrip }> = ({ trip }) => {
  const router = useRouter();
  const slug = trip.tripSlug || String(trip.id);
  const { isBookmarked, toggle } = useBookMarking(slug, trip.isBookmarked);
  const nextDate = formatNextDate(trip.nextTripDate);

  const goToTrip = () => router.push(`/trip/${slug}`);
  const goToHost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (trip.hostUsername) router.push(`/${trip.hostUsername}`);
  };

  return (
    <div
      onClick={goToTrip}
      className="flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border-[10px] border-[#FFD976] bg-[#FFD976] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-44 flex-shrink-0 overflow-hidden rounded-2xl">
        <MyImage src={trip.image} alt={trip.title} className="h-full w-full" rounded={false} />

        <button
          onClick={(e) => { e.stopPropagation(); toggle(e); }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 transition-colors hover:bg-black"
        >
          <HeartIcon size={16} weight={isBookmarked ? 'fill' : 'regular'} className={isBookmarked ? 'text-red-500' : 'text-white'} />
        </button>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-md">
          <StarIcon size={14} weight="fill" className="text-yellow-500" />
          <span className="text-xs font-bold text-neutral-900">
            {trip.rating > 0 ? trip.rating.toFixed(1) : 'New'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-2 text-base font-bold leading-tight text-neutral-900">{trip.title}</h3>

        {/* Host — clickable */}
        <button
          onClick={goToHost}
          className="flex w-fit items-center gap-1 text-left text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:underline"
        >
          by {trip.hostName}
          <SealCheckIcon size={13} className="flex-shrink-0" />
        </button>

        <p className="text-xs font-medium text-neutral-700">{trip.days}{trip.location ? ` • ${trip.location}` : ''}</p>

        {/* Next trip date */}
        {nextDate && (
          <div className="mt-1 flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1">
            <Calendar size={14} className="text-neutral-800" />
            <span className="text-xs font-semibold text-neutral-900">Next trip on {nextDate}</span>
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex items-center">
            <span className="mr-1 text-sm font-semibold">From</span>
            <CurrencyInrIcon size={16} weight="bold" />
            <span className="text-xl font-bold text-neutral-900">{trip.price.toLocaleString('en-IN')}</span>
            <span className="text-sm font-medium">/person</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); goToTrip(); }}
            className="rounded-xl bg-neutral-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

const CardSkeleton = () => (
  <div className="h-[360px] animate-pulse rounded-3xl bg-gray-200" />
);

export default function StateExplorePage() {
  const params = useParams();
  const router = useRouter();
  const stateCode = String(params?.stateCode || '').toUpperCase();

  const { data, isLoading, isError } = useGetData<StateTripsResponse>(
    API_ENDPOINTS.LANDING_PAGE.TRIPS_BY_STATE(stateCode)
  );

  const stateName = data?.state?.name || stateCode;
  const trips = data?.trips ?? [];

  return (
    <main className="min-h-screen bg-[#FCF3EB]">
      {/* Hero */}
      <div className="relative h-56 w-full overflow-hidden sm:h-72">
        {data?.state?.imageUrl ? (
          <MyImage src={data.state.imageUrl} alt={stateName} className="absolute inset-0 h-full w-full" rounded={false} />
        ) : (
          <div className="absolute inset-0 bg-neutral-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

        <div className="absolute inset-0 mx-auto flex max-w-[1440px] flex-col justify-end px-5 pb-6 sm:px-9">
          <button
            onClick={() => router.back()}
            className="mb-auto mt-5 flex w-fit items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-neutral-900 shadow backdrop-blur transition-colors hover:bg-white"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-2 text-white/80">
            <Compass size={16} />
            <span className="text-sm font-medium uppercase tracking-wide">Explore · India</span>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{stateName}</h1>
          {!isLoading && (
            <p className="mt-1 text-sm font-medium text-white/90">
              {trips.length > 0
                ? `${trips.length} ${trips.length === 1 ? 'trip' : 'trips'} with upcoming departures`
                : 'No upcoming trips right now'}
            </p>
          )}
        </div>
      </div>

      {/* Trips grid */}
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-9 sm:py-10">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : isError || trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <span className="text-4xl">🗺️</span>
            <h2 className="text-xl font-bold text-neutral-900">No trips here yet</h2>
            <p className="max-w-md text-neutral-600">
              We don&apos;t have upcoming trips in {stateName} right now. Explore other destinations on the home page.
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-700"
            >
              Back to home
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {trips.map((trip) => <StateTripCard key={trip.id} trip={trip} />)}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
