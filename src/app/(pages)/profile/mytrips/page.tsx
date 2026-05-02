'use client'

import React from 'react'
import BookedTripCard from './components/BookedTripCard'
import { BOOKED_TRIPS } from './constants'
import BackButton from '@/common/ui/BackButton'
import { useRouter } from 'next/navigation'

const MyTrips = () => {

    const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
        <BackButton className='mt-6' label='Back to Profile' to={'/profile'}/>
      <div className="pt-4 pb-2">
        <h1 className="text-4xl font-bold mb-4">My Trips</h1>
      </div>
      <div className="flex flex-col gap-4">
        {BOOKED_TRIPS.length === 0 ? (
          <div className="text-center py-16 text-neutral-500 text-sm">
            No trips found.
          </div>
        ) : (
          BOOKED_TRIPS.map((trip) => (
            <BookedTripCard
              key={trip.slug}
              trip={trip}
              onViewDetails={() => {}}
              onViewQRTicket={() => router.push(`/profile/mytrips/${trip.slug}/ticket`)}
              onFillDetails={() => {}}
              onPayNow={() => {}}
              onWriteReview={() => {}}
              onEditReview={() => {}}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default MyTrips