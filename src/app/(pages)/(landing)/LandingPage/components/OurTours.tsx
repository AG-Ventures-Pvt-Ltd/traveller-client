'use client'
import React from 'react'
import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MyImage from '@/common/ui/Image'

interface Trip {
  days: string
  image: string
  isBookmarked: boolean
  location: string
  price: number
  title: string
  tripSlug: string
}

const OurTours = () => {
  const router = useRouter()
  const { data, isLoading } = useGetData<Trip[]>(
    API_ENDPOINTS.LANDING_PAGE.FEATURED_TRIPS,
    {
      queryKey: [API_ENDPOINTS.LANDING_PAGE.FEATURED_TRIPS],
    }
  )

  const handleTripClick = (tripSlug: string) => {
    router.push(`/trip/${tripSlug}`)
  }

  const handleSeeAllClick = () => {
    router.push('/trips')
  }

  return (
    <section className="flex flex-col gap-6 sm:gap-8 px-4 sm:px-6 lg:px-9 py-12 sm:py-16 lg:py-24 w-full">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="px-3 sm:px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start">
          <span className="text-neutral-900 text-xs sm:text-sm font-medium">Our Tours</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-neutral-900 sm:ml-0 lg:ml-16">
            Find your perfect
            <br />
            wondrr experience
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSeeAllClick}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-neutral-900 text-white rounded-full font-bold hover:bg-neutral-800 hover:scale-105 transition-transform text-sm sm:text-base cursor-pointer"
            >
              See All Tours
            </button>
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform">
              <ArrowUpRight size={16} className="sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="relative p-4 sm:p-6 bg-neutral-100 rounded-2xl sm:rounded-3xl overflow-hidden min-h-[200px] sm:min-h-[400px] lg:min-h-[488px] w-full sm:w-[320px] lg:w-[400px] flex-shrink-0 animate-pulse flex flex-col justify-between snap-start"
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
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[200px] sm:min-h-[400px] lg:min-h-[488px] w-full sm:w-[320px] lg:w-[400px] flex-shrink-0 flex flex-col cursor-pointer snap-start group"
            >
              <div className="absolute inset-0 transition-transform group-hover:scale-105">
                <MyImage
                  src={trip.image || 'https://placehold.co/400x488'}
                  alt={trip.title}
                  width={400}
                  height={488}
                  className="w-full h-full object-cover"
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
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

export default OurTours
