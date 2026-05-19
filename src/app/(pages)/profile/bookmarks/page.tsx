'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/common/ui/BackButton'
import { TripCard } from '../../trips/components/mobile/TripCard'
import { useBookmarks } from './hooks/useBookmarks'
import { BookmarkSimpleIcon } from '@phosphor-icons/react'
import { BookmarkedTrip } from './types'

const CARD_COLORS = ['#FFD976', '#EEA0FF', '#E2F4A6']

function BookmarkStatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className="absolute top-[-10px] right-2 z-10 px-3 py-[3px] rounded-full text-xs font-semibold text-white"
      style={{ backgroundColor: isActive ? '#43A047' : '#F44336' }}
    >
      {isActive ? 'Active' : 'Expired'}
    </span>
  )
}

function BookmarkCard({ trip, index }: { trip: BookmarkedTrip; index: number }) {
  const router = useRouter()
  const bgColor = CARD_COLORS[index % CARD_COLORS.length]

  return (
    <div className="relative">
      <BookmarkStatusBadge isActive={trip.isActive} />
      <TripCard
        title={trip.title}
        image={trip.image}
        address={trip.location}
        rating={trip.rating ?? 0}
        price={trip.price || 0}
        hostName={trip.hostName ?? ''}
        slug={trip.tripSlug}
        days={trip.days ?? ''}
        bgColor={bgColor}
        isBookmarked={true}
        onClick={(slug) => router.push(`/trip/${slug}`)}
      />
    </div>
  )
}

export default function BookmarksPage() {
  
  const { data: bookmarks, isLoading, error } = useBookmarks()

  return (
    <div className="min-h-screen bg-[#FFF9F4] pt-4 pb-8">
      <BackButton label="Back to Profile" to="/profile" className="mt-6" />

      <h1 className="text-4xl font-bold mt-6 mb-6 tracking-tight">
        Your Bookmarks
      </h1>

      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[135px] rounded-[20px] bg-gray-200 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-neutral-700 text-lg font-medium">Unable to load bookmarks</p>
          <p className="text-neutral-500 text-sm mt-2">Please try again later</p>
        </div>
      )}

      {!isLoading && !error && (!bookmarks || bookmarks.length === 0) && (
        <div className="text-center py-16">
          <BookmarkSimpleIcon size={64} className="text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-700 text-lg font-medium">No bookmarks yet</p>
          <p className="text-neutral-500 text-sm mt-2">
            Start exploring trips and save your favorites!
          </p>
        </div>
      )}

      {!isLoading && !error && bookmarks && bookmarks.length > 0 && (
        <div className="flex flex-col gap-6">
          {bookmarks.map((trip, index) => (
            <BookmarkCard key={trip._id} trip={trip} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
