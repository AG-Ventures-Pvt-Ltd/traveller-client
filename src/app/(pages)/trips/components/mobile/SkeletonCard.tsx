'use client';

import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-200 rounded-3xl overflow-hidden border-10 border-gray-200 animate-pulse flex flex-col">
      {/* Image skeleton */}
      <div className="relative h-32 bg-gray-300 rounded-3xl">
        {/* Star rating skeleton */}
        <div className="absolute bottom-3 right-3 bg-gray-100 rounded-full px-2 py-1 flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-300 rounded-full" />
          <div className="w-6 h-3 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="flex-1 p-3 flex flex-col gap-1.5">
        <div className="flex flex-col gap-0.5">
          {/* Title skeleton */}
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="flex items-center gap-1">
            {/* Provider skeleton */}
            <div className="h-3 bg-gray-300 rounded w-1/2" />
            <div className="w-3.5 h-3.5 bg-gray-300 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col gap-0.5 pt-0">
          {/* Duration skeleton */}
          <div className="h-3 bg-gray-300 rounded w-1/3" />
          <div className="flex items-baseline">
            {/* Price skeleton */}
            <div className="h-4 bg-gray-300 rounded w-16" />
            <div className="h-3 bg-gray-300 rounded w-8 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;