'use client'

import { useRouter, useParams } from 'next/navigation'

import { MobileTripCardData } from './components/MobileTripCard'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import HostHero from './components/HostHero'
import { useGetData } from '@/services/useGetData'
import { HostReviews } from '../HostReviews/HostReviews'
import SlidingCarouselSection from '@/app/(pages)/(landing)/components/MobileLanding/components/CarouselSection'
import { Trip } from '@/app/(pages)/(landing)/components/MobileLanding/types'
import ReelsSection from '../Reels/ReelsSection'

interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface TripsResponse {
  trips: MobileTripCardData[]
  pagination: Pagination
}

const toCarouselTrips = (trips: MobileTripCardData[]): Trip[] =>
  trips.map((t) => ({
    id: t._id,
    image: t.image,
    title: t.title,
    provider: t.hostName,
    hostUsername: t.hostUsername,
    duration: String(t.days),
    price: t.price,
    rating: t.rating,
    tripSlug: t.slug,
    isBookmarked: t.isBookmarked,
  }))

const HostProfileMobile = () => {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const { data: upcomingData } = useGetData<TripsResponse>(API_ENDPOINTS.HOST.TRIPS(id, 1, 6))
  const { data: pastData } = useGetData<TripsResponse>(API_ENDPOINTS.HOST.ARCHIVED_TRIPS(id, 1, 6))

  const upcomingTrips: Trip[] = toCarouselTrips(upcomingData?.trips ?? [])
  const pastTrips: Trip[] = toCarouselTrips(pastData?.trips ?? [])

  const hasMoreUpcoming = (upcomingData?.pagination?.total ?? 0) > 6
  const hasMorePast = (pastData?.pagination?.total ?? 0) > 6

  return (
    <div className="min-h-screen bg-[#FFF9F4]">
      <HostHero />

      {upcomingTrips.length > 0 && (
        <div className="mt-10">
          <SlidingCarouselSection
            title="Upcoming Trips"
            trips={upcomingTrips}
            carouselIndex={0}
            viewAllClick={hasMoreUpcoming ? () => router.push(`/trips?host=${id}&status=published`) : undefined}
          />
        </div>
      )}

      {pastTrips.length > 0 && (
        <div className="mt-10">
          <SlidingCarouselSection
            title="Past Trips"
            trips={pastTrips}
            carouselIndex={1}
            viewAllClick={hasMorePast ? () => router.push(`/trips?host=${id}&status=archived`) : undefined}
          />
        </div>
      )}

      <ReelsSection variant="mobile" />
      <HostReviews hostUsername={id} />
    </div>
  )
}

export default HostProfileMobile
