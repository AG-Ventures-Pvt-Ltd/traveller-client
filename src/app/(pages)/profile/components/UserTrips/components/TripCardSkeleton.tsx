'use client';

import React from 'react';

const TripCardSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-3xl border-2 border-gray-200 p-6 md:p-8 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Skeleton */}
        <div className="w-full md:w-48 h-48 md:h-56 rounded-2xl bg-gray-300 flex-shrink-0" />
        
        {/* Content Skeleton */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Header with status */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-7 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
            <div className="h-6 w-24 bg-gray-300 rounded-full" />
          </div>
          
          {/* Trip Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-3 bg-gray-300 rounded w-16" />
              <div className="h-4 bg-gray-300 rounded w-24" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-3 bg-gray-300 rounded w-20" />
              <div className="h-4 bg-gray-300 rounded w-20" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-3 bg-gray-300 rounded w-12" />
              <div className="h-4 bg-gray-300 rounded w-28" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-3 bg-gray-300 rounded w-16" />
              <div className="h-4 bg-gray-300 rounded w-20" />
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-gray-200" />
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <div className="h-10 bg-gray-300 rounded-xl flex-1" />
            <div className="h-10 bg-gray-300 rounded-xl flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCardSkeleton;
