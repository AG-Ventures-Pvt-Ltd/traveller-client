import { Star, SealCheck } from '@phosphor-icons/react'

export interface MobileReviewCardData {
  id: string
  reviewerName: string
  isVerified: boolean
  rating: number
  date: string
  comment: string
  photos?: string[]
  totalPhotos?: number
}

interface MobileReviewCardProps {
  review: MobileReviewCardData
}

export function MobileReviewCard({ review }: MobileReviewCardProps) {
  const visiblePhotos = review.photos?.slice(0, 3) ?? []
  const extraPhotos =
    review.totalPhotos && review.totalPhotos > 3
      ? review.totalPhotos - 3
      : 0

  return (
    <div className="flex flex-col gap-[10px]">
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[12px] font-semibold text-black tracking-tight">
            {review.reviewerName}
          </p>
          {review.isVerified && (
            <div className="flex items-center gap-[6px]">
              <SealCheck size={16} weight="fill" className="text-blue-500" />
              <span className="text-[12px] text-black tracking-tight">
                Verified Traveler
              </span>
            </div>
          )}
          {/* Star rating */}
          <div className="flex items-center gap-[3px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                weight={star <= review.rating ? 'fill' : 'regular'}
                className={
                  star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                }
              />
            ))}
          </div>
        </div>
        <span className="text-[12px] text-black tracking-tight whitespace-nowrap">
          on {review.date}
        </span>
      </div>

      {/* Comment */}
      <p className="text-[14px] text-black leading-[22px] tracking-tight">
        {review.comment}
      </p>

      {/* Photos */}
      {visiblePhotos.length > 0 && (
        <div className="flex flex-col gap-[6px]">
          <p className="text-[12px] text-[#888] leading-[22px]">
            {review.totalPhotos} photos shared
          </p>
          <div className="flex items-center gap-[6px]">
            {visiblePhotos.map((photo, idx) => (
              <div
                key={idx}
                className="w-[90px] h-[90px] rounded-[8px] overflow-hidden flex-shrink-0"
              >
                <img
                  src={photo}
                  alt={`Review photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {extraPhotos > 0 && (
              <span className="text-[12px] text-black tracking-tight">
                +{extraPhotos}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
