'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowLeft as PrevIcon, ArrowRight as NextIcon } from '@phosphor-icons/react'
import { MobileTripCard, MobileTripCardData } from '../components/mobile/components/MobileTripCard'
import { TripCardSkeleton } from '../components/mobile/components/TripCardSkeleton'
import { useGetData } from '@/services/useGetData'

const CARD_COLORS = ['#FFD976', '#EEA0FF', '#E2F4A6']
const PAGE_LIMIT = 12

interface Pagination {
  total: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface TripsResponse {
  trips: MobileTripCardData[]
  pagination: Pagination
}

interface Props {
  title: string
  buildUrl: (page: number) => string
  queryKey: string[]
}

export default function HostTripsGrid({ title, buildUrl, queryKey }: Props) {
  const router = useRouter()
  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetData<TripsResponse>(
    buildUrl(page),
    { queryKey: [...queryKey, String(page)] }
  )

  const trips = data?.trips ?? []
  const pagination = data?.pagination

  return (
    <div className="min-h-screen bg-[#FFF9F4]">
      <div className="flex items-center gap-3 px-4 pt-5 pb-4">
        <button onClick={() => router.back()} className="active:opacity-70">
          <ArrowLeft size={22} weight="bold" />
        </button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="px-4 pb-8">
        <div className="grid grid-cols-2 gap-[11px]">
          {isLoading ? (
            <TripCardSkeleton count={PAGE_LIMIT} />
          ) : trips.length === 0 ? (
            <p className="col-span-2 text-center text-sm text-neutral-500 py-12">No {title.toLowerCase()} found.</p>
          ) : (
            trips.map((trip, index) => (
              <MobileTripCard
                key={trip._id}
                trip={{ ...trip, bgColor: CARD_COLORS[index % CARD_COLORS.length] }}
                onClick={(slug) => router.push(`/trip/${slug}`)}
              />
            ))
          )}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={!pagination.hasPrevPage}
              className="flex items-center gap-1 text-sm font-medium disabled:opacity-40 active:opacity-70"
            >
              <PrevIcon size={16} weight="bold" /> Prev
            </button>
            <span className="text-sm text-neutral-500">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.hasNextPage}
              className="flex items-center gap-1 text-sm font-medium disabled:opacity-40 active:opacity-70"
            >
              Next <NextIcon size={16} weight="bold" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
