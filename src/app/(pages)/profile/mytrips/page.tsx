'use client'

import React, { useState } from 'react'
import BookedTripCard from './components/BookedTripCard'
import BackButton from '@/common/ui/BackButton'
import { useRouter } from 'next/navigation'
import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { BookedTrip } from './constants'
import { usePayment } from '../../trip/book/[id]/[batchId]/hooks/usePayment'
import ReviewModal from '@/common/components/composites/ReviewModal'


const MyTrips = () => {

    const router = useRouter()

    const [ openModal, setOpenModal ] = useState<boolean>(false)

    const { data } = useGetData<BookedTrip[]>(API_ENDPOINTS.USER.MY_TRIPS)

    const { startPayment } = usePayment()


  return (
    <div className="min-h-screen bg-gray-50 pb-24">
        <BackButton className='mt-6' label='Back to Profile' to={'/profile'}/>
      <div className="pt-4 pb-2">
        <h1 className="text-4xl font-bold mb-4">My Trips</h1>
      </div>
      <div className="flex flex-col gap-4">
        {data?.length === 0 ? (
          <div className="text-center py-16 text-neutral-500 text-sm">
            No trips found.
          </div>
        ) : (
          data?.map((trip) => (
            <BookedTripCard
              key={trip._id}
              trip={trip}
              onViewQRTicket={() => router.push(`/profile/mytrips/${trip.tripSlug}/ticket`)}
              onFillDetails={() => router.push(`/profile/mytrips/${trip._id}`)}
              onPayNow={() => startPayment({ bookingId : trip._id })}
              onWriteReview={() => setOpenModal(true)}
              onEditReview={() => {}}
              onViewDetails={() => router.push(`/profile/mytrips/${trip._id}`)}
            />
          ))
        )}
      </div>
      <ReviewModal isOpen={openModal} onClose={() => setOpenModal(false)} onSubmit={() => {}}/>
    </div>
  )
}

export default MyTrips