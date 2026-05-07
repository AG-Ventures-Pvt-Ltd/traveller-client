import React from 'react'

interface TripCardSkeletonProps {
  count?: number
}

export function TripCardSkeleton({ count = 4 }: TripCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative rounded-[20px] overflow-hidden bg-gray-200 animate-pulse"
        >
          {/* Image skeleton */}
          <div className="relative mx-[10px] mt-[10px] rounded-[12px] bg-gray-300 h-[100px]">
            {/* Rating badge skeleton */}
            <div className="absolute bottom-[6px] right-[6px] bg-white/80 w-[40px] h-[20px] rounded-[8px]"></div>
          </div>

          {/* Content skeleton */}
          <div className="px-[10px] pb-[10px] pt-[8px] flex flex-col gap-[4px]">
            {/* Title skeleton */}
            <div className="h-[14px] bg-gray-300 rounded w-3/4"></div>

            {/* Host name skeleton */}
            <div className="h-[10px] bg-gray-300 rounded w-1/2"></div>

            {/* Days skeleton */}
            <div className="h-[10px] bg-gray-300 rounded w-1/4"></div>

            {/* Price skeleton */}
            <div className="h-[10px] bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </>
  )
}