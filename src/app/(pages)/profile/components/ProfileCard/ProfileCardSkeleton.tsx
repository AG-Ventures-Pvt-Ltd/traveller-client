'use client';

import React from 'react';

const ProfileCardSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-neutral-50 to-gray-200 rounded-3xl border-2 border-gray-200 p-8 md:p-12 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Picture Skeleton */}
        <div className="w-36 h-36 rounded-2xl bg-gray-300" />
        
        <div className="flex-1 flex flex-col gap-4">
          {/* Profile Header Skeleton */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-6 bg-gray-300 rounded w-32" />
              <div className="h-4 bg-gray-300 rounded w-24" />
            </div>
            <div className="h-10 w-32 bg-gray-300 rounded-xl" />
          </div>
          
          {/* Profile Bio Skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-300 rounded w-3/4" />
          </div>
          
          {/* Contact Info Skeleton */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-48" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-40" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-44" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-52" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-36" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
