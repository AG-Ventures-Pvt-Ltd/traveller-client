'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { SealCheckIcon } from '@phosphor-icons/react'
import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'

interface Review {
  _id: string
  username: string
  review: string
  rating: number
  createdAt: string
}

interface TripReviewResponse {
  reviews: Review[]
}

const POSTCARD_COLORS = ['#E2F4A6', '#FFD976', '#EEA0FF', '#BFE3FF']
const TILTS = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1']
const INITIAL_VISIBLE = 6

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3.5 w-3.5 ${s <= rating ? 'fill-amber-500 text-amber-500' : 'fill-none text-black/20'}`}
          strokeWidth={0}
        />
      ))}
    </div>
  )
}

function PostcardReview({ review, index }: { review: Review; index: number }) {
  const initials = review.username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const color = POSTCARD_COLORS[index % POSTCARD_COLORS.length]
  const tilt = TILTS[index % TILTS.length]

  return (
    <div
      className={`group relative mb-6 break-inside-avoid rounded-[20px] p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 ${tilt}`}
      style={{ backgroundColor: color }}
    >
      <div className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-2 rounded-sm bg-white/40 backdrop-blur-sm" />

      <p className="whitespace-pre-line text-[15px] font-normal leading-6 tracking-tight text-black/80">
        &ldquo;{review.review}&rdquo;
      </p>

      <div className="mt-4">
        <StarRow rating={review.rating} />
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-black/10 pt-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900">
          <span className="text-xs font-bold text-white">{initials}</span>
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="text-sm font-semibold tracking-tight text-black">{review.username}</span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-black/50">
            Verified traveller
            <SealCheckIcon size={12} weight="fill" className="text-[#1B4332]" />
          </span>
        </div>
      </div>
    </div>
  )
}

interface HostReviewsDesktopProps {
  hostUsername: string
}

export function HostReviewsDesktop({ hostUsername }: HostReviewsDesktopProps) {
  const [expanded, setExpanded] = useState(false)

  const { data, isLoading, error } = useGetData<TripReviewResponse>(
    API_ENDPOINTS.REVIEW.PROFILE(hostUsername)
  )

  if (isLoading) {
    return (
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="mb-6 break-inside-avoid rounded-[20px] bg-neutral-100"
            style={{ height: 180 + (i % 3) * 40 }}
          />
        ))}
      </div>
    )
  }

  if (error || !data || data.reviews.length === 0) return null

  const reviews = data.reviews
  const visible = expanded ? reviews : reviews.slice(0, INITIAL_VISIBLE)

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3 w-full">
        {visible.map((r, i) => (
          <PostcardReview key={r._id} review={r} index={i} />
        ))}
      </div>

      {reviews.length > INITIAL_VISIBLE && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-[#1B4332]/20 bg-white px-6 py-3 text-sm font-semibold text-[#1B4332] shadow-sm transition hover:bg-[#E8F5EE]"
        >
          {expanded ? 'Show fewer postcards' : `Read all ${reviews.length} postcards`}
        </button>
      )}
    </div>
  )
}
