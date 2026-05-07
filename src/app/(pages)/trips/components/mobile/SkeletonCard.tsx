'use client';

import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="w-full bg-gray-200 rounded-[20px] overflow-hidden animate-pulse flex">
      {/* Image skeleton */}
      <div className="relative m-[10px] rounded-[12px] bg-gray-300 w-[157px] h-[115px] shrink-0">
        <div className="absolute bottom-[5px] right-[5px] bg-white/80 w-[42px] h-[22px] rounded-[8px]" />
      </div>

      {/* Content skeleton */}
      <div className="flex flex-col justify-center gap-[5px] py-[10px] pr-[10px] flex-1 min-w-0">
        <div className="h-[18px] bg-gray-300 rounded w-3/4" />
        <div className="flex items-center gap-[4px]">
          <div className="h-[12px] bg-gray-300 rounded w-1/2" />
          <div className="w-[17px] h-[17px] bg-gray-300 rounded-full shrink-0" />
        </div>
        <div className="h-[12px] bg-gray-300 rounded w-1/4" />
        <div className="h-[12px] bg-gray-300 rounded w-2/3" />
        <div className="flex items-center gap-[7px]">
          <div className="w-[14px] h-[14px] bg-gray-300 rounded-full shrink-0" />
          <div className="h-[12px] bg-gray-300 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;