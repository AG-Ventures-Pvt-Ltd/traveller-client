import { useGetData } from "@/services/useGetData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { ReviewsResponse, RatingDistribution } from "../../types";
import { RatingOverview } from "./components/RatingOverview";
import { ReviewCard } from "./components/ReviewCard";
import Divider from "@/common/ui/Divider";

interface HostReviewsProps {
  hostUsername: string;
  onDataLoaded?: (count: number) => void;
}

export function HostReviews({ hostUsername }: HostReviewsProps) {
  const { data, isLoading, error } = useGetData<ReviewsResponse>(
    API_ENDPOINTS.RATINGS.BY_USERNAME(hostUsername, 1, 10)
  );
  

  if (isLoading) {
    return <div className="flex items-center justify-center py-8">Loading reviews...</div>;
  }

  if (error || !data) {
    return <div className="flex items-center justify-center py-8">Error loading reviews</div>;
  }

  const distribution: RatingDistribution[] = Object.entries(data?.stats?.ratingDistribution || {})
    .map(([stars, count]) => ({
      stars: parseInt(stars),
      count: count,
      percentage: (count / data.stats.totalReviews) * 100,
    }))
    .sort((a, b) => b.stars - a.stars);

  if (data.reviews.length <= 0) {
    return <></>
  }

  return (
    <>
      <Divider className={'my-12! h-[3px]'} />
      <div className="flex flex-col gap-8">
        <div className="flex gap-3">
          <div className="w-1 h-9 bg-neutral-900 rounded-full flex-shrink-0" />
          <h2 className="text-neutral-900 text-3xl font-bold leading-10">Guest Reviews ({data.stats.averageRating})</h2>
        </div>
        <RatingOverview
          overallRating={data.stats.averageRating}
          totalReviews={data.stats.totalReviews}
          distribution={distribution}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.reviews?.map((review) => (
            <ReviewCard
              key={review._id}
              review={{
                id: review._id,
                reviewerName: review.username,
                reviewerInitials: review.username
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase(),
                rating: review.rating,
                tripName: review.tripTitle,
                date: new Date(review.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
                comment: review.comment,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
