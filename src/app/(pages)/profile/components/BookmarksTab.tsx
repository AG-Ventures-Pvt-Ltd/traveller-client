'use client'

import React from 'react'
import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { Bookmark } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { TripCard } from '../../host/[id]/components/HostTrips/components/TripCard'
import { Trip } from '../../host/[id]/types'


interface BookmarkedTrip {
  _id: string
  tripSlug: string
  title: string
  image: string
  location: string
  price: number
  currency: string
  category:string
  isBookMarked:boolean
}

const BookmarksTab = () => {
  const router = useRouter()

  const { data: bookmarks, isLoading, error } = useGetData<BookmarkedTrip[]>(API_ENDPOINTS.BOOKMARKS.GET_USER_BOOKMARKS)

  const handleTripClick = (slug: string) => {
    router.push(`/trip/${slug}`)
  }

  const mapToTrip = (bookmark: BookmarkedTrip): Trip => ({
    id: bookmark._id,
    title: bookmark.title,
    location: bookmark.location,
    category: bookmark.category, 
    rating: 0, 
    reviewCount: 0, 
    price: bookmark.price,
    image: bookmark.image,
    slug: bookmark.tripSlug,
    isBookMarked : true
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading your bookmarks...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <div className="text-center py-12">
          <p className="text-neutral-700 text-lg font-['Satoshi']">Unable to load bookmarks</p>
          <p className="text-neutral-500 text-sm mt-2">Please try again later</p>
        </div>
      </div>
    )
  }

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-700 text-lg font-['Satoshi']">No bookmarks yet</p>
          <p className="text-neutral-500 text-sm mt-2">Start exploring trips and save your favorites!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-4">
        <Bookmark className="w-6 h-6 text-neutral-900" />
        <h2 className="text-2xl font-bold font-['Satoshi'] text-neutral-900">
          My Bookmarks ({bookmarks.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <TripCard
            key={bookmark._id}
            trip={mapToTrip(bookmark)}
            onViewDetails={handleTripClick}
          />
        ))}
      </div>
    </div>
  )
}

export default BookmarksTab
