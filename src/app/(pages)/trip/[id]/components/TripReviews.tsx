import { Star } from "lucide-react";
import { TripReviewsProps } from '../types';
import MyImage from "@/common/ui/Image";


export function TripReviews({
  reviews,
  averageRating,
  totalReviews,
}: TripReviewsProps) {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className="flex flex-col gap-6 my-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#0F172B] tracking-tight">
            Traveler Reviews
          </h2>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
            <span className="text-base font-medium text-[#0F172B] leading-6">
              {averageRating}
            </span>
            <span className="text-sm text-[#475569] leading-5">
              ({totalReviews} reviews)
            </span>
          </div>
        </div>
        <div className="text-gray-500 text-center py-8">
          Reviews are not available yet.
        </div>
      </div>
    );
  }

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= rating
              ? "fill-yellow-500 text-yellow-500"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-4 sm:gap-6 my-6 sm:my-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl md:text-2xl text-[#0F172B] tracking-tight">
          Customer Reviews
        </h2>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-500 text-yellow-500" />
          <span className="text-sm sm:text-base font-medium text-[#0F172B] leading-5 sm:leading-6">
            {averageRating}
          </span>
          <span className="text-xs sm:text-sm text-[#475569] leading-4 sm:leading-5">
            ({totalReviews} reviews)
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => {
          const displayInitials =
            review.initials ||
            review.author
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

          return (
            <div
              key={review.id}
              className="flex flex-col p-4 sm:p-6 bg-white/60 rounded-2xl"
            >
              <div className="flex gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0D203F] rounded-full flex items-center justify-center flex-shrink-0">
                  {review.avatar ? (
                    <MyImage
                      src={review.avatar}
                      alt={review.author}
                      width={0}
                      height={0}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm sm:text-base font-medium leading-5 sm:leading-6">
                      {displayInitials}
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex flex-col">
                      <span className="text-sm sm:text-base font-medium text-[#0F172B] leading-5 sm:leading-6">
                        {review.author}
                      </span>
                      {review.location && (
                        <span className="text-xs text-[#475569] leading-4">
                          {review.location}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-[#64748B] leading-4">
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#334155] leading-5 sm:leading-6">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
