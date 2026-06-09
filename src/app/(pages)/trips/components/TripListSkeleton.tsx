import React from 'react';

const TripSearchCardSkeleton = () => (
  <div className="bg-white w-full flex flex-col md:flex-row gap-4 md:gap-6 p-4 items-center rounded-2xl border-2 border-gray-200">
    {/* Image */}
    <div className="w-80 h-45 rounded-2xl bg-gray-200 flex-shrink-0" />
    {/* Middle content */}
    <div className="flex-1 flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-3">
        <div className="h-7 w-3/4 bg-gray-200 rounded-lg" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
      </div>
    </div>
    {/* Price box */}
    <div className="w-full md:w-60 bg-neutral-50 rounded-2xl border-2 border-gray-200 p-4 flex flex-col gap-4 flex-shrink-0">
      <div className="h-3 w-12 bg-gray-200 rounded" />
      <div className="h-9 w-28 bg-gray-200 rounded-lg" />
      <div className="h-11 w-full bg-gray-200 rounded-xl" />
    </div>
  </div>
);

interface TripListSkeletonProps {
  count?: number;
}

const TripListSkeleton: React.FC<TripListSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <TripSearchCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default TripListSkeleton;
