'use client';

import React from 'react';
import { ArrowRight, MapPin, TrendingUp } from 'lucide-react';
import MyImage from '@/common/ui/Image';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

export interface ExploreStateItem {
  stateCode: string;
  name: string;
  imageUrl: string;
  tripCount: number;
}

interface ExploreByDestinationProps {
  /** 'desktop' = larger type + 4-col grid, 'mobile' = compact horizontal scroll */
  variant?: 'desktop' | 'mobile';
}

const StateCard: React.FC<{ state: ExploreStateItem; rank: number; compact?: boolean }> = ({
  state,
  rank,
  compact = false,
}) => (
  <a
    href={`/explore/${state.stateCode}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Explore group trips in ${state.name}`}
    className={`group relative block overflow-hidden rounded-3xl text-left shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
      compact ? 'h-44 w-60 flex-shrink-0' : 'h-64 w-full'
    }`}
  >
    {/* Image */}
    <MyImage
      src={state.imageUrl}
      alt={state.name}
      className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
      rounded={false}
    />

    {/* Gradient for legible text */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

    {/* "Most popular" rank ribbon for the top state */}
    {rank === 0 && state.tripCount > 0 && (
      <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-[#D0EF65] px-2.5 py-1 text-[11px] font-bold text-neutral-900 shadow">
        <TrendingUp size={12} />
        Most loved
      </span>
    )}

    {/* Trip count chip */}
    {state.tripCount > 0 && (
      <span className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-neutral-900 shadow backdrop-blur">
        {state.tripCount} {state.tripCount === 1 ? 'trip' : 'trips'}
      </span>
    )}

    {/* Bottom content */}
    <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-4">
      <div>
        <div className="flex items-center gap-1 text-white/80">
          <MapPin size={13} />
          <span className="text-[11px] font-medium uppercase tracking-wide">India</span>
        </div>
        <h3 className={`font-bold leading-tight text-white ${compact ? 'text-lg' : 'text-2xl'}`}>
          {state.name}
        </h3>
      </div>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-[#D0EF65]">
        <ArrowRight size={18} />
      </span>
    </div>
  </a>
);

const SkeletonCard: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <div
    className={`animate-pulse rounded-3xl bg-gray-200 ${
      compact ? 'h-44 w-60 flex-shrink-0' : 'h-64 w-full'
    }`}
  />
);

const ExploreByDestination: React.FC<ExploreByDestinationProps> = ({ variant = 'desktop' }) => {
  const { data, isLoading } = useGetData<{ states: ExploreStateItem[] }>(
    API_ENDPOINTS.LANDING_PAGE.EXPLORE_STATES
  );

  const states = data?.states ?? [];
  const compact = variant === 'mobile';

  // Nothing configured in admin → render nothing (no empty section).
  if (!isLoading && states.length === 0) return null;

  return (
    <section className="w-full">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-2xl">🧭</span>
        <h2 className={`font-bold text-neutral-900 ${compact ? 'text-xl' : 'text-3xl'}`}>
          Explore by Destination
        </h2>
      </div>
      <p className={`mb-5 text-neutral-600 ${compact ? 'text-sm' : 'text-base'}`}>
        Not sure where to go? Start with where everyone&apos;s heading right now.
      </p>

      {compact ? (
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isLoading
            ? [0, 1, 2].map((i) => <SkeletonCard key={i} compact />)
            : states.map((s, i) => <StateCard key={s.stateCode} state={s} rank={i} compact />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? [0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)
            : states.map((s, i) => <StateCard key={s.stateCode} state={s} rank={i} />)}
        </div>
      )}
    </section>
  );
};

export default ExploreByDestination;
