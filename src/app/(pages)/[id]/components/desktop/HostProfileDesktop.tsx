'use client'

import { useRouter, useParams } from 'next/navigation'
import { ArrowRight, SuitcaseRollingIcon } from '@phosphor-icons/react'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { useGetData } from '@/services/useGetData'
import DesktopCarouselSection from '@/app/(pages)/(landing)/components/DesktopLanding/components/CarouselSection'
import { Trip } from '@/app/(pages)/(landing)/components/MobileLanding/types'
import { MobileTripCardData } from '../mobile/components/MobileTripCard'
import AboutHost from '../AboutHost'
import HostHeroDesktop from './components/HostHeroDesktop'
import { HostReviewsDesktop } from './components/HostReviewsDesktop'

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

/** Travel-flavoured eyebrow that sits above each desktop section header. */
function SectionEyebrow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ size?: number; weight?: 'fill' | 'duotone'; className?: string }>
  children: React.ReactNode
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5EE]">
        <Icon size={16} weight="fill" className="text-[#1B4332]" />
      </span>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1B4332]">{children}</span>
    </div>
  )
}

const HostProfileDesktop = () => {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const { data: upcomingData } = useGetData<TripsResponse>(API_ENDPOINTS.HOST.TRIPS(id, 1, 8))
  const { data: pastData } = useGetData<TripsResponse>(API_ENDPOINTS.HOST.ARCHIVED_TRIPS(id, 1, 8))

  const upcomingTrips: Trip[] = toCarouselTrips(upcomingData?.trips ?? [])
  const pastTrips: Trip[] = toCarouselTrips(pastData?.trips ?? [])

  const hasMoreUpcoming = (upcomingData?.pagination?.total ?? 0) > 8
  const hasMorePast = (pastData?.pagination?.total ?? 0) > 8

  return (
    <div className="min-h-screen bg-[#FFF9F4] pb-24">
      <HostHeroDesktop />
      <section className="mx-auto mt-10 max-w-6xl px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            What travellers say
          </h2>
        </div>
        <HostReviewsDesktop hostUsername={id} />
      </section>

      {/* ── Upcoming trips ── */}
      {upcomingTrips.length > 0 && (
        <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-8">
          <DesktopCarouselSection title="Upcoming Trips" trips={upcomingTrips} carouselIndex={0} />
          {hasMoreUpcoming && (
            <button
              onClick={() => router.push(`/trips?host=${id}&status=published`)}
              className="mx-4 mt-4 flex items-center gap-1 text-sm font-semibold text-[#1B4332] transition hover:gap-2"
            >
              View all upcoming trips <ArrowRight size={16} weight="bold" />
            </button>
          )}
        </section>
      )}

      {pastTrips.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-8">
          <div className="pl-4">
            <SectionEyebrow icon={SuitcaseRollingIcon}>Journeys completed</SectionEyebrow>
          </div>
          <DesktopCarouselSection title="Past Trips" trips={pastTrips} carouselIndex={1} />
          {hasMorePast && (
            <button
              onClick={() => router.push(`/trips?host=${id}&status=archived`)}
              className="mx-4 mt-4 flex items-center gap-1 text-sm font-semibold text-[#1B4332] transition hover:gap-2"
            >
              View all past trips <ArrowRight size={16} weight="bold" />
            </button>
          )}
        </section>
      )}

      {/* ── About the host (rendered last, matching mobile priority) ── */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-8">
        <AboutHost />
      </section>
    </div>
  )
}

export default HostProfileDesktop
