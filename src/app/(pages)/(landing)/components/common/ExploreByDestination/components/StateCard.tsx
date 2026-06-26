'use client';

import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import MyImage from '@/common/ui/Image';
import { ExploreStateItem } from '../ExploreByDestination';

interface StateCardProps {
  state: ExploreStateItem;
  rank: number;
  compact?: boolean;
}

const StateCard: React.FC<StateCardProps> = ({ state, rank, compact = false }) => (
  <a
    href={`/explore/${state.stateCode}`}
    aria-label={`Explore group trips in ${state.name}`}
    className={`group relative block overflow-hidden rounded-3xl text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
      compact ? 'h-52 w-44 flex-shrink-0' : 'h-64 w-full'
    }`}
  >
    <MyImage
      src={state.imageUrl}
      alt={state.name}
      className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
      rounded={false}
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

    {rank === 0 && state.tripCount > 0 && (
      <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-[#FFD976] px-2.5 py-1 text-[11px] font-bold text-neutral-900 shadow">
        <TrendingUp size={11} />
        Most loved
      </span>
    )}

    <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-4">
      <div>
        <h3 className={`font-bold leading-tight text-white ${compact ? 'text-lg' : 'text-2xl'}`}>
          {state.name}
        </h3>
        {state.tripCount > 0 && (
          <p className="mt-0.5 text-xs font-medium text-white/75">
            {state.tripCount} {state.tripCount === 1 ? 'trip' : 'trips'} available
          </p>
        )}
      </div>
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD976] text-neutral-900 shadow transition-transform duration-300 group-hover:scale-110">
        <ArrowUpRight size={17} />
      </span>
    </div>
  </a>
);

export default StateCard;
