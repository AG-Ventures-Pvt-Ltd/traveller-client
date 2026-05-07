'use client'

import { MobileRatingOverview, RatingDistributionItem } from './MobileRatingOverview'
import { MobileReviewCard, MobileReviewCardData } from './MobileReviewCard'
import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import CollapsibleCard from '@/common/ui/CollapsibleCard'


export interface MobileReviewSectionProps {
  hostId?: string;
  tripId?: string;
  distribution?: RatingDistributionItem[]
  onWriteReview?: () => void
  onViewMore?: () => void
}

export interface TripReviewResponse {
  reviews: MobileReviewCardData[]
}





const DUMMY_DISTRIBUTION: RatingDistributionItem[] = [
  { stars: 5, count: 150, percentage: 75 },
  { stars: 4, count: 150, percentage: 58 },
  { stars: 3, count: 150, percentage: 46 },
  { stars: 2, count: 150, percentage: 21 },
  { stars: 1, count: 150, percentage: 6 },
]


export function MobileReviewSection({
  hostId,
  tripId,
  onWriteReview,
  onViewMore,
}: MobileReviewSectionProps) {


  let reviewURL = '';

  if (hostId) {
    reviewURL = API_ENDPOINTS.REVIEW.PROFILE(hostId)
  }
  else if (tripId) {
    reviewURL = API_ENDPOINTS.REVIEW.TRIP(tripId)
  }

  const { data } = useGetData<TripReviewResponse>(reviewURL)


  return (
    <CollapsibleCard title='Reviews' className="bg-[#EDEDED] border border-[#D9D9D9] rounded-[16px] overflow-hidden">

      <div className="px-[14px] pb-[20px] flex flex-col gap-[20px]">
        {/* Rating overview */}
        <MobileRatingOverview
          overallRating={Number((data?.reviews?.length
            ? data.reviews.reduce((sum, review) => sum + Number(review.rating), 0) / data.reviews.length
            : 0).toFixed(2))}
          totalReviews={(data?.reviews.length || 0)}
          distribution={DUMMY_DISTRIBUTION}
        />

        {/* Write a review button */}
        {/* <Button
            variant="primary"
            fullWidth
            onClick={onWriteReview}
            className="!rounded-[12px] !py-[10px]"
          >
            Write a review
          </Button> */}

        {/* Reviews meta */}
        {/* <div className="flex items-center justify-between">
            <span className="text-[14px] text-black tracking-tight">
              {totalReviews} reviews
            </span>
            <button className="flex items-center gap-[6px]">
              <span className="text-[12px] text-black tracking-tight">
                Sort by : Highest Rating
              </span>
              <ArrowUp size={14} className="text-black" />
            </button>
          </div> */}

        {/* Divider */}
        <div className="w-full h-px bg-[#D9D9D9]" />

        {/* Review list */}
        <div className="flex flex-col gap-[20px]">
          {data?.reviews.map((review, idx) => (
            <div key={review._id}>
              <MobileReviewCard review={review} />
              {idx < data?.reviews.length - 1 && (
                <div className="w-full h-px bg-[#D9D9D9] mt-[20px]" />
              )}
            </div>
          ))}
        </div>

        {/* View more */}
        {/* {onViewMore && (
            <button
              className="w-full flex items-center justify-center gap-[6px] py-[8px] text-[14px] text-black tracking-tight"
              onClick={onViewMore}
            >
              view more
              <CaretDown size={14} className="text-black" />
            </button>
          )} */}
      </div>

    </CollapsibleCard>
  )
}
