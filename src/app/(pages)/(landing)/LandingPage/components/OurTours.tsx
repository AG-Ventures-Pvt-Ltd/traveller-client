'use client'
import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MyImage from '@/common/ui/Image'
import ArrowButton from '@/common/ui/Buttons/ArrowButton'
import { useFeaturedTrips } from '@/common/hooks/useFeaturedTrips'

const OurTours = () => {
  const router = useRouter()
  const { data, isLoading } = useFeaturedTrips()

  const handleTripClick = (tripSlug: string) => {
    router.push(`/trip/${tripSlug}`)
  }

  const handleSeeAllClick = () => {
    router.push('/trips')
  }

  return (
    <section className="flex flex-col gap-6 sm:gap-8 px-4 sm:px-6 lg:px-9 py-12 sm:py-16 lg:py-24 w-full overflow-hidden">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="px-3 sm:px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start">
          <span className="text-neutral-900 text-xs sm:text-sm font-medium">Our Trips</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-neutral-900 sm:ml-0 lg:ml-16">
            Find Your Perfect
            <br />
            Group Trip Experience
          </h2>
          <ArrowButton onClick={handleSeeAllClick}>
            See All Group Trips
          </ArrowButton>
        </div>
      </div>
      <div className="flex flex-row gap-3 sm:gap-4 overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory touch-pan-x -mx-4 sm:-mx-6 lg:-mx-9 px-4 sm:px-6 lg:px-9">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="relative p-4 sm:p-6 bg-neutral-100 rounded-2xl sm:rounded-3xl overflow-hidden min-h-[200px] sm:min-h-[400px] lg:min-h-[488px] w-[calc(100vw-2rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex-shrink-0 animate-pulse flex flex-col justify-between snap-start"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-neutral-200 rounded-full self-end" />
              <div className="relative space-y-2">
                <div className="h-4 sm:h-6 bg-neutral-200 rounded w-3/4" />
                <div className="h-4 sm:h-6 bg-neutral-200 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : (
          data?.map((trip) => (
            <div
              key={trip.tripSlug}
              onClick={() => handleTripClick(trip.tripSlug)}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[200px] sm:min-h-[400px] lg:min-h-[488px] w-[calc(100vw-2rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex-shrink-0 flex flex-col cursor-pointer snap-start group"
            >
              <div className="absolute inset-0 transition-transform group-hover:scale-105">
                <MyImage
                  src={trip.image || 'https://placehold.co/400x488'}
                  alt={trip.title}
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/65 rounded-2xl sm:rounded-3xl" />
              <div className="relative p-4 sm:p-6 flex flex-col justify-between h-full">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center self-end hover:bg-neutral-100 hover:scale-110 transition-all">
                  <ArrowUpRight size={14} className="sm:w-5 sm:h-5" />
                </div>
                <div className='pt-26'>
                  <h3 className="text-white text-base sm:text-lg font-bold">{trip.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white/90 text-xs sm:text-sm font-medium">₹</span>
                    <span className="text-white text-base sm:text-lg font-bold">{trip.price}</span>
                    <span className="text-white/90 text-xs sm:text-sm font-medium">/ per person</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default OurTours
