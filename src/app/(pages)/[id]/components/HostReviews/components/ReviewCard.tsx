import { Star } from "lucide-react";
import { Review } from "../../../types";
import { SealCheckIcon } from "@phosphor-icons/react";


interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-[#E2F4A6] rounded-[18px] p-4 h-full">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold font-['Rubik']">
              {review.reviewerInitials}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-black text-[13.7px] font-medium font-['Rubik'] tracking-tight leading-tight">
              {review.reviewerName}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-black text-[9px] font-normal font-['Rubik'] tracking-tight">
                Verified Traveler
              </span>
              <SealCheckIcon className="w-3.5 h-3.5 text-[#43A047]" weight="fill"/>
            </div>
          </div>
        </div>
        <div className="flex gap-0.5 items-center pt-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-none text-gray-300"
              }`}
              strokeWidth={0}
            />
          ))}
        </div>
      </div>
      <p className="text-black text-[15px] font-normal font-['Rubik'] leading-5 tracking-tight">
        {review.comment}
      </p>
    </div>
  );
}
