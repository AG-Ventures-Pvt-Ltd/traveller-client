import React from 'react'

export function HostHeroSkeleton() {
  return (
    <div>
      {/* Cover image skeleton */}
      <div className="relative h-[160px] w-full bg-gray-300 animate-pulse">
        {/* Gradient overlay simulation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

        {/* Back button skeleton */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-white/80 rounded-full animate-pulse"></div>

        {/* Share button skeleton */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-black/80 rounded-full animate-pulse"></div>

        {/* Avatar and badge skeleton positioned at bottom */}
        <div className='absolute -bottom-12 w-full'>
          <div className='flex justify-between px-6'>
            {/* Avatar skeleton */}
            <div className="w-24 h-24 bg-white rounded-full border-4 border-white animate-pulse"></div>

            {/* Wondrr Verified badge skeleton */}
            <div className="flex items-center gap-[5px]">
              <div className='bg-white/90 flex rounded-3xl border border-gray-300 px-2.5 py-1.5 gap-1 animate-pulse'>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="w-20 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile info skeleton */}
      <div className="px-6 pt-16 pb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            {/* Name skeleton */}
            <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
            {/* Username skeleton */}
            <div className="h-3 bg-gray-300 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}