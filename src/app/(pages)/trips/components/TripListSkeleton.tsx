import React from 'react';
import { cardColor } from './cardUtils';

/** Mirrors TripSearchCard's geometry so the loading → loaded swap doesn't shift layout. */
const TripSearchCardSkeleton: React.FC<{ index: number }> = ({ index }) => (
  <div
    className="flex h-full gap-4 rounded-[24px] p-3"
    style={{ backgroundColor: cardColor(index) }}
  >
    <div className="min-h-[190px] w-[40%] max-w-[320px] shrink-0 rounded-[18px] bg-black/10" />

    <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-1">
      <div className="h-6 w-4/5 rounded-lg bg-black/10" />
      <div className="mt-2 h-4 w-28 rounded bg-black/10" />

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="h-4 w-24 rounded bg-black/10" />
        <div className="h-4 w-14 rounded bg-black/10" />
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="h-7 w-28 rounded-lg bg-black/10" />
        <div className="h-6 w-24 rounded-lg bg-black/10" />
      </div>
    </div>
  </div>
);

const TripListSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <div className="grid animate-pulse grid-cols-1 xl:grid-cols-2">
    {[...Array(count)].map((_, i) => (
      <TripSearchCardSkeleton key={i} index={i} />
    ))}
  </div>
);

export default TripListSkeleton;
