'use client'

import { useState } from 'react'
import { CaretDown, ArrowUp } from '@phosphor-icons/react'
import Button from '@/common/ui/Buttons/Button'
import { MobileRatingOverview, RatingDistributionItem } from './MobileRatingOverview'
import { MobileReviewCard, MobileReviewCardData } from './MobileReviewCard'

export interface MobileReviewSectionProps {
  totalReviews: number
  overallRating: number
  distribution: RatingDistributionItem[]
  reviews: MobileReviewCardData[]
  onWriteReview?: () => void
  onViewMore?: () => void
}

export function MobileReviewSection({
  totalReviews,
  overallRating,
  distribution,
  reviews,
  onWriteReview,
  onViewMore,
}: MobileReviewSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="bg-[#EDEDED] border border-[#D9D9D9] rounded-[16px] overflow-hidden">
      {/* Section header */}
      <button
        className="w-full flex items-center justify-between px-[14px] py-[18px] cursor-pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <span className="text-[12px] font-normal text-black tracking-tight">
          Reviews
        </span>
        <CaretDown
          size={16}
          className={`text-black transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="px-[14px] pb-[20px] flex flex-col gap-[20px]">
          {/* Rating overview */}
          <MobileRatingOverview
            overallRating={overallRating}
            totalReviews={totalReviews}
            distribution={distribution}
          />

          {/* Write a review button */}
          <Button
            variant="primary"
            fullWidth
            onClick={onWriteReview}
            className="!rounded-[12px] !py-[10px]"
          >
            Write a review
          </Button>

          {/* Reviews meta */}
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-black tracking-tight">
              {totalReviews} reviews
            </span>
            <button className="flex items-center gap-[6px]">
              <span className="text-[12px] text-black tracking-tight">
                Sort by : Highest Rating
              </span>
              <ArrowUp size={14} className="text-black" />
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#D9D9D9]" />

          {/* Review list */}
          <div className="flex flex-col gap-[20px]">
            {reviews.map((review, idx) => (
              <div key={review.id}>
                <MobileReviewCard review={review} />
                {idx < reviews.length - 1 && (
                  <div className="w-full h-px bg-[#D9D9D9] mt-[20px]" />
                )}
              </div>
            ))}
          </div>

          {/* View more */}
          {onViewMore && (
            <button
              className="w-full flex items-center justify-center gap-[6px] py-[8px] text-[14px] text-black tracking-tight"
              onClick={onViewMore}
            >
              view more
              <CaretDown size={14} className="text-black" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
