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
