'use client';

import React from 'react';
import { ArrowRight, MapPin, TrendingUp } from 'lucide-react';
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
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Explore group trips in ${state.name}`}
    className={`group relative block overflow-hidden rounded-3xl text-left shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
      compact ? 'h-44 w-60 flex-shrink-0' : 'h-64 w-full'
    }`}
  >
    <MyImage
      src={state.imageUrl}
      alt={state.name}
      className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
      rounded={false}
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

    {rank === 0 && state.tripCount > 0 && (
      <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-[#D0EF65] px-2.5 py-1 text-[11px] font-bold text-neutral-900 shadow">
        <TrendingUp size={12} />
        Most loved
      </span>
    )}

    {state.tripCount > 0 && (
      <span className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-neutral-900 shadow backdrop-blur">
        {state.tripCount} {state.tripCount === 1 ? 'trip' : 'trips'}
      </span>
    )}

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

export default StateCard;
