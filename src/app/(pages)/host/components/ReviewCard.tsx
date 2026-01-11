import { Star } from "lucide-react";
import { Review } from "../types";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 p-8">
      {/* Header - Avatar, Name, Location, and Rating */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg font-bold font-['Satoshi']">
              {review.reviewerInitials}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-neutral-900 text-base font-bold font-['Satoshi']">
              {review.reviewerName}
            </span>
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
              {review.reviewerLocation}
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating
                  ? "fill-neutral-900 text-neutral-900"
                  : "fill-none text-gray-200"
              }`}
              strokeWidth={1.5}
            />
          ))}
        </div>
      </div>

      {/* Trip Badge */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1.5 bg-neutral-50 rounded-[50px] text-neutral-700 text-xs font-bold font-['Satoshi']">
          {review.tripName}
        </span>
      </div>

      {/* Date */}
      <div className="mb-5">
        <span className="text-neutral-700 text-xs font-medium font-['Satoshi']">
          {review.date}
        </span>
      </div>

      {/* Comment */}
      <p className="text-neutral-900 text-base font-medium font-['Satoshi'] leading-5">
        {review.comment}
      </p>
    </div>
  );
}
