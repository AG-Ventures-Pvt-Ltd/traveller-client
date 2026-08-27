'use client';

import React from 'react';
import { cardColor } from '../cardUtils';

/** Mirrors the mobile TripCard's geometry so loading → loaded doesn't shift layout. */
const SkeletonCard: React.FC<{ index?: number }> = ({ index = 0 }) => (
  <div
    className="flex animate-pulse gap-3 rounded-[22px] p-2.5"
    style={{ backgroundColor: cardColor(index) }}
  >
    <div className="min-h-[170px] w-[38%] max-w-[170px] shrink-0 rounded-[16px] bg-black/10" />

    <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-0.5">
      <div className="h-5 w-4/5 rounded bg-black/10" />
      <div className="mt-2 h-4 w-24 rounded bg-black/10" />
      <div className="mt-3 h-3 w-28 rounded bg-black/10" />
      <div className="mt-2 h-3 w-20 rounded bg-black/10" />
      <div className="mt-2 h-3 w-24 rounded bg-black/10" />
      <div className="mt-3 h-6 w-32 rounded-lg bg-black/10" />
    </div>
  </div>
);

export default SkeletonCard;
