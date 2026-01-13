import { Star } from "lucide-react";
import { Review } from "../../../types";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 gap-4">
        <div className="flex gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm sm:text-base lg:text-lg font-bold font-['Satoshi']">
              {review.reviewerInitials}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-neutral-900 text-sm sm:text-base font-bold font-['Satoshi']">
              {review.reviewerName}
            </span>
            <span className="text-neutral-700 text-xs sm:text-sm font-medium font-['Satoshi']">
              {review.reviewerLocation}
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                star <= review.rating
                  ? "fill-neutral-900 text-neutral-900"
                  : "fill-none text-gray-200"
              }`}
              strokeWidth={1.5}
            />
          ))}
        </div>
      </div>
      <div className="mb-4 sm:mb-6">
        <span className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 bg-neutral-50 rounded-[50px] text-neutral-700 text-xs font-bold font-['Satoshi']">
          {review.tripName}
        </span>
      </div>
      <div className="mb-3 sm:mb-5">
        <span className="text-neutral-700 text-xs font-medium font-['Satoshi']">
          {review.date}
        </span>
      </div>
      <p className="text-neutral-900 text-sm sm:text-base font-medium font-['Satoshi'] leading-5">
        {review.comment}
      </p>
    </div>
  );
}
