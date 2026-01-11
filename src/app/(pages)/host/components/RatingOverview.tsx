import { Star } from "lucide-react";
import { RatingDistribution } from "../types";

interface RatingOverviewProps {
  overallRating: number;
  totalReviews: number;
  distribution: RatingDistribution[];
}

export function RatingOverview({
  overallRating,
  totalReviews,
  distribution,
}: RatingOverviewProps) {
  return (
    <div className="w-full px-8 py-12 bg-neutral-50 rounded-3xl border-2 border-gray-200 flex gap-12">
      {/* Left Side - Overall Rating */}
      <div className="flex flex-col items-center gap-3 min-w-[144px]">
        <span className="text-neutral-900 text-6xl font-bold font-['Satoshi'] leading-[70.40px]">
          {overallRating}
        </span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-6 h-6 fill-neutral-900 text-neutral-900"
              strokeWidth={2}
            />
          ))}
        </div>
        <span className="text-neutral-700 text-base font-medium font-['Satoshi'] text-center">
          Based on {totalReviews} reviews
        </span>
      </div>

      {/* Divider */}
      <div className="w-0.5 bg-gray-200" />

      {/* Right Side - Rating Distribution */}
      <div className="flex-1 flex flex-col gap-3">
        {distribution.map((item) => (
          <div key={item.stars} className="flex items-center gap-4">
            <span className="w-14 text-neutral-900 text-sm font-medium font-['Satoshi']">
              {item.stars} star{item.stars !== 1 ? "s" : ""}
            </span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-900 rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="w-10 text-right text-neutral-900 text-sm font-bold font-['Satoshi']">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
