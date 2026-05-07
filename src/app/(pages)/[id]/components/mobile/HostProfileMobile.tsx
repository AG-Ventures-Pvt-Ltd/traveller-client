'use client'

import { useRouter, useParams } from 'next/navigation'


import { MobileTripCard, MobileTripCardData } from './components/MobileTripCard'
import { MobileReviewSection } from './components/MobileReviewSection'
import { RatingDistributionItem } from './components/MobileRatingOverview'
import { MobileReviewCardData } from './components/MobileReviewCard'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import HostHero from './components/HostHero'
import { useGetData } from '@/services/useGetData'


const CARD_COLORS = ['#FFD976', '#EEA0FF', '#E2F4A6']

const DUMMY_DISTRIBUTION: RatingDistributionItem[] = [
  { stars: 5, count: 150, percentage: 75 },
  { stars: 4, count: 150, percentage: 58 },
  { stars: 3, count: 150, percentage: 46 },
  { stars: 2, count: 150, percentage: 21 },
  { stars: 1, count: 150, percentage: 6 },
]

const REVIEW_PHOTO =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200'

const DUMMY_REVIEWS: MobileReviewCardData[] = [
  {
    id: 'r1',
    reviewerName: 'Ayush G.',
    isVerified: true,
    rating: 4,
    date: '06/12/2025',
    comment:
      'I have been never so happy to travel with Wondrr and their operator. These trips are the best I have ever went on. Would recommend every new traveler !',
    photos: [REVIEW_PHOTO, REVIEW_PHOTO, REVIEW_PHOTO],
    totalPhotos: 8,
  },
  {
    id: 'r2',
    reviewerName: 'Ayush S.',
    isVerified: true,
    rating: 4,
    date: '06/10/2025',
    comment:
      'I have been never so happy to travel with Wondrr and their operator. These trips are the best I have ever went on. Would recommend every new traveler !',
    photos: [REVIEW_PHOTO, REVIEW_PHOTO, REVIEW_PHOTO],
    totalPhotos: 8,
  },
]

interface MobileTripCardDataResponse {
  trips: MobileTripCardData[]
}


const HostProfileMobile = () => {

   const router = useRouter()

   const params = useParams();
   const id = params.id as string;

   const { data: fetchedTrips , isLoading, error } = useGetData<MobileTripCardDataResponse>(API_ENDPOINTS.HOST.TRIPS(id));

  return (
    <div className="min-h-screen bg-[#FFF9F4]">

      <HostHero />
      <div className="flex gap-2 mt-2 mx-6 mb-3 font-semibold">
        Upcoming Trips
      </div>
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-[11px]">
          {fetchedTrips?.trips?.map((trip, index) => (
            <MobileTripCard
              key={trip._id}
              trip={{ ...trip, bgColor: CARD_COLORS[index % CARD_COLORS.length] }}
              onClick={(id) => router.push(`/trip/${id}`)}
            />
          ))}
        </div>
      </div>
      {/* <div className="px-4 pb-8">
        <MobileReviewSection
          totalReviews={258}
          overallRating={4.5}
          distribution={DUMMY_DISTRIBUTION}
          reviews={DUMMY_REVIEWS}
          onWriteReview={() => { }}
          onViewMore={() => { }}
        />
      </div> */}

    </div>
  )
}

export default HostProfileMobile
