'use client';

import React from 'react';

const CardSkeleton = () => (
  <div className="flex-shrink-0 w-[200px] sm:w-64 rounded-3xl overflow-hidden bg-gray-200 animate-pulse">
    <div className="h-32 bg-gray-300 rounded-3xl" />
    <div className="p-3 flex flex-col gap-2">
      <div className="h-4 bg-gray-300 rounded-full w-3/4" />
      <div className="h-3 bg-gray-300 rounded-full w-1/2" />
      <div className="h-3 bg-gray-300 rounded-full w-2/3 mt-1" />
      <div className="h-4 bg-gray-300 rounded-full w-1/2 mt-1" />
    </div>
  </div>
);

const CarouselSectionSkeleton = () => (
  <div className="w-full flex flex-col gap-3">
    <div className="pl-1">
      <div className="h-8 sm:h-12 lg:h-14 bg-gray-200 animate-pulse rounded-xl w-64 sm:w-80" />
    </div>
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);

const HomePageSkeleton = () => (
  <div className="w-full bg-[#FFF9F4] px-4 sm:px-6 lg:px-9 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-24">
    <div className="max-w-[1440px] mx-auto flex flex-col gap-8 sm:gap-10 lg:gap-12">
      {/* LocationSelector skeleton */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
          <div className="flex flex-col gap-1">
            <div className="h-3 bg-gray-200 animate-pulse rounded-full w-28" />
            <div className="h-7 bg-gray-200 animate-pulse rounded-full w-20 mt-0.5" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
        </div>
      </div>

      {/* SuggestionBanner skeleton */}
      <div className="w-full bg-gray-200 animate-pulse rounded-2xl h-28 sm:h-36" />

      {/* Two carousel sections */}
      <CarouselSectionSkeleton />
      <CarouselSectionSkeleton />
    </div>
  </div>
);

export default HomePageSkeleton;
