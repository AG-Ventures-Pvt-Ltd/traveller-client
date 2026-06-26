'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { HeartIcon, SealCheckIcon, StarIcon, CurrencyInrIcon } from '@phosphor-icons/react';
import { ArrowLeft, Calendar, MapPin, ChevronRight } from 'lucide-react';
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

const CARD_COLORS: Array<{ bg: string; border: string }> = [
  { bg: 'bg-[#FFD976]', border: 'border-[#FFD976]' },
  { bg: 'bg-[#E2F4A6]', border: 'border-[#E2F4A6]' },
  { bg: 'bg-[#EEA0FF]', border: 'border-[#EEA0FF]' },
];

const formatNextDate = (iso: string | null): string | null => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const StateTripCard: React.FC<{ trip: StateTrip; index: number }> = ({ trip, index }) => {
  const router = useRouter();
  const slug = trip.tripSlug || String(trip.id);
  const { isBookmarked, toggle } = useBookMarking(slug, trip.isBookmarked);
  const nextDate = formatNextDate(trip.nextTripDate);
  const color = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <div
      onClick={() => router.push(`/trip/${slug}`)}
      className={`relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border-[10px] ${color.border} ${color.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
    >
      {/* Image */}
      <div className="relative h-52 flex-shrink-0 overflow-hidden rounded-2xl">
        <MyImage src={trip.image} alt={trip.title} className="h-full w-full" rounded={false} />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

        <button
          onClick={(e) => { e.stopPropagation(); toggle(e); }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-all hover:scale-110 hover:bg-black"
        >
          <HeartIcon
            size={15}
            weight={isBookmarked ? 'fill' : 'regular'}
            className={isBookmarked ? 'text-red-400' : 'text-white'}
          />
        </button>

        {/* Price badge on image */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center rounded-full bg-white/95 px-2.5 py-1 shadow-lg backdrop-blur-sm">
          <CurrencyInrIcon size={12} weight="bold" className="text-neutral-900" />
          <span className="text-xs font-bold text-neutral-900">{trip.price.toLocaleString('en-IN')}</span>
          <span className="ml-0.5 text-[10px] font-medium text-neutral-600">/p</span>
        </div>

        {/* Rating badge */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 shadow-md backdrop-blur-sm">
          <StarIcon size={11} weight="fill" className="text-yellow-500" />
          <span className="text-[11px] font-bold text-neutral-900">
            {trip.rating > 0 ? trip.rating.toFixed(1) : 'New'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-neutral-900">{trip.title}</h3>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (trip.hostUsername) router.push(`/${trip.hostUsername}`);
          }}
          className="flex w-fit items-center gap-1 text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:underline"
        >
          by {trip.hostName}
          <SealCheckIcon size={12} className="flex-shrink-0" />
        </button>

        <p className="text-xs font-medium text-neutral-600">
          {trip.days}{trip.location ? ` · ${trip.location}` : ''}
        </p>

        {nextDate && (
          <div className="mt-1 flex w-fit items-center gap-1.5 rounded-full bg-black/10 px-2.5 py-1">
            <Calendar size={12} className="text-neutral-800" />
            <span className="text-[11px] font-semibold text-neutral-900">Next: {nextDate}</span>
          </div>
        )}

        <div className="mt-auto flex justify-end pt-2">
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/trip/${slug}`); }}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-neutral-700"
          >
            View trip →
          </button>
        </div>
      </div>
    </div>
  );
};

const CardSkeleton = () => (
  <div className="h-[400px] animate-pulse rounded-3xl bg-black/5" />
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
    <main className="min-h-screen bg-[#FFF9F4]">
      {/* Clean header — no image, no solid block */}
      <header className="mx-auto max-w-[1440px] px-5 pt-6 sm:px-9 sm:pt-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-neutral-500">
          <button onClick={() => router.push('/')} className="transition-colors hover:text-neutral-900">
            Home
          </button>
          <ChevronRight size={13} />
          <span className="font-semibold text-neutral-900">{stateName}</span>
        </nav>

        {/* Back — mobile only (desktop uses breadcrumb) */}
        <button
          onClick={() => router.back()}
          className="mt-4 flex w-fit items-center gap-1.5 text-sm font-semibold text-neutral-700 hover:text-neutral-900 sm:hidden"
        >
          <ArrowLeft size={15} /> Back
        </button>

        {/* Title block */}
        <div className="mt-5 sm:mt-7">
          <div className="mb-2 flex items-center gap-1.5 text-[#C4532A]">
            <MapPin size={14} />
            <span className="text-xs font-bold uppercase tracking-[0.18em]">Explore · India</span>
          </div>
          <h1 className="break-words text-3xl font-bold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            {stateName}
          </h1>
          {!isLoading && (
            <p className="mt-3 text-sm font-medium text-neutral-500 sm:text-base">
              {trips.length > 0
                ? `${trips.length} ${trips.length === 1 ? 'group trip' : 'group trips'} for solo travellers`
                : 'No upcoming trips right now'}
            </p>
          )}
        </div>

        {/* Brand accent divider */}
        <div className="mt-6 h-1 w-16 rounded-full bg-[#FFD976]" />
      </header>

      {/* Trips grid */}
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-9 sm:py-12">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : isError || trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <span className="text-5xl">🧭</span>
            <h2 className="text-2xl font-bold text-neutral-900">Nothing here yet</h2>
            <p className="max-w-md text-neutral-500">
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
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {trips.map((trip, i) => (
              <StateTripCard key={trip.id} trip={trip} index={i} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
