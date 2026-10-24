'use client'

import React, { useState } from 'react'
import BookedTripCard from './components/BookedTripCard'
import BackButton from '@/common/ui/BackButton'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useGetData } from '@/services/useGetData'
import usePostData from '@/services/usePostData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { BookedTrip } from './constants'
import { usePayment } from '../../trip/book/[id]/[batchId]/hooks/usePayment'
import ReviewModal from '@/common/components/composites/ReviewModal'


const MyTrips = () => {

    const router = useRouter()
    const queryClient = useQueryClient()

    const [ reviewTarget, setReviewTarget ] = useState<BookedTrip | null>(null)

    const { data } = useGetData<BookedTrip[]>(API_ENDPOINTS.USER.MY_TRIPS)

    const { startPayment } = usePayment()

    const { mutate: submitReview } = usePostData({
      url: API_ENDPOINTS.REVIEW.SUBMIT,
      onSuccess: () => {
        setReviewTarget(null)
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.USER.MY_TRIPS] })
      },
    })

    const handleReviewSubmit = (rating: number, comment: string, images: string[]) => {
      if (!reviewTarget) return
      submitReview({ bookingId: reviewTarget._id, rating, comment, images })
    }


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
              onWriteReview={() => setReviewTarget(trip)}
              onEditReview={() => setReviewTarget(trip)}
              onViewDetails={() => router.push(`/profile/mytrips/${trip._id}`)}
            />
          ))
        )}
      </div>
      <ReviewModal
        key={reviewTarget?._id ?? 'closed'}
        isOpen={!!reviewTarget}
        onClose={() => setReviewTarget(null)}
        onSubmit={handleReviewSubmit}
        initialRating={reviewTarget?.reviewRating ?? 0}
        initialReview={reviewTarget?.reviewComment ?? ''}
        title={reviewTarget?.hasReview ? 'Edit Your Review' : 'Write a Review'}
      />
    </div>
  )
}

export default MyTrips