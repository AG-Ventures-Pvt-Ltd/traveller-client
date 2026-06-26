'use client';

import React from 'react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import StateCard from './components/StateCard';
import SkeletonCard from './components/SkeletonCard';

export interface ExploreStateItem {
  stateCode: string;
  name: string;
  imageUrl: string;
  tripCount: number;
}

interface ExploreByDestinationProps {
  variant?: 'desktop' | 'mobile';
}

const ExploreByDestination: React.FC<ExploreByDestinationProps> = ({ variant = 'desktop' }) => {
  const { data, isLoading } = useGetData<{ states: ExploreStateItem[] }>(
    API_ENDPOINTS.LANDING_PAGE.EXPLORE_STATES
  );

  const states = data?.states ?? [];
  const compact = variant === 'mobile';

  if (!isLoading && states.length === 0) return null;

  return (
    <section className="flex w-full flex-col gap-5">
      {/* Header — matches CarouselSection */}
      <div className="flex flex-col gap-1">
        <h2 className={`font-bold text-neutral-900 ${compact ? 'text-xl' : 'text-3xl'}`}>
          Explore by Destination
        </h2>
        <p className="text-sm font-medium text-neutral-500">
          Browse upcoming group trips by where they&apos;re headed.
        </p>
      </div>

      {compact ? (
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isLoading
            ? [0, 1, 2].map((i) => <SkeletonCard key={i} compact />)
            : states.map((s, i) => <StateCard key={s.stateCode} state={s} rank={i} compact />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? [0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)
            : states.map((s, i) => <StateCard key={s.stateCode} state={s} rank={i} />)}
        </div>
      )}
    </section>
  );
};

export default ExploreByDestination;
