import { Star } from '@phosphor-icons/react'

export interface RatingDistributionItem {
  stars: number
  count: number
  percentage: number
}

interface MobileRatingOverviewProps {
  overallRating: number
  totalReviews: number
  distribution: RatingDistributionItem[]
}

export function MobileRatingOverview({
  overallRating,
  totalReviews,
  distribution,
}: MobileRatingOverviewProps) {
  return (
    <div className="flex flex-col items-center gap-[16px] pt-[10px]">
      {/* Overall rating + stars */}
      <div className="flex items-center gap-[13px]">
        <span className="text-[32px] font-normal text-black tracking-tight">
          {overallRating.toFixed(1)}
        </span>
        <div className="flex items-center gap-[6px]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={22}
              weight={star <= Math.floor(overallRating) ? 'fill' : 'regular'}
              className={
                star <= Math.floor(overallRating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }
            />
          ))}
        </div>
      </div>

      <p className="text-[14px] text-black tracking-tight">
        Based on {totalReviews}+ reviews
      </p>

      {/* Distribution bars */}
      {/* <div className="w-full flex flex-col gap-[10px] mt-[8px]">
        {distribution
          .slice()
          .sort((a, b) => b.stars - a.stars)
          .map((item) => (
            <div key={item.stars} className="flex items-center gap-[14px]">
              <div className="flex items-center gap-[6px] w-[32px] flex-shrink-0">
                <span className="text-[14px] text-black">{item.stars}</span>
                <Star size={18} weight="fill" className="text-yellow-400" />
              </div>
              <div className="flex-1 bg-white h-[6px] rounded-[8px] overflow-hidden">
                <div
                  className="h-full bg-[#EEA0FF] rounded-[8px]"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-[14px] text-black w-[32px] text-right">
                {item.count}
              </span>
            </div>
          ))}
      </div> */}
    </div>
  )
}
