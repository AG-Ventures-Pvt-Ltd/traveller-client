'use client'

import { useRouter, useParams } from 'next/navigation'


import { MobileTripCard, MobileTripCardData } from './components/MobileTripCard'
import { TripCardSkeleton } from './components/TripCardSkeleton'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import HostHero from './components/HostHero'
import { useGetData } from '@/services/useGetData'
import { HostReviews } from '../HostReviews/HostReviews'


const CARD_COLORS = ['#FFD976', '#EEA0FF', '#E2F4A6']



interface MobileTripCardDataResponse {
  trips: MobileTripCardData[]
}


const HostProfileMobile = () => {

  const router = useRouter()

  const params = useParams();
  const id = params.id as string;

  const { data: fetchedTrips, isLoading } = useGetData<MobileTripCardDataResponse>(API_ENDPOINTS.HOST.TRIPS(id));

  return (
    <div className="min-h-screen bg-[#FFF9F4]">

      <HostHero />
      <div className="pt-6">
        <HostReviews hostUsername={id} />
      </div>
      <div className="flex gap-2 mt-2 mx-6 mb-3 font-semibold">
        Upcoming Trips
      </div>
      <div className="px-4 pb-8">
        <div className="grid grid-cols-2 gap-[11px]">
          {isLoading ? (
            <TripCardSkeleton count={4} />
          ) : (
            fetchedTrips?.trips?.map((trip, index) => (
              <MobileTripCard
                key={trip._id}
                trip={{ ...trip, bgColor: CARD_COLORS[index % CARD_COLORS.length] }}
                onClick={(id) => router.push(`/trip/${id}`)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default HostProfileMobile
