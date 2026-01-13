import { useEffect } from "react";
import { useGetData } from "@/services/useGetData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { ReviewsResponse, RatingDistribution } from "../../types";
import { RatingOverview } from "./components/RatingOverview";
import { ReviewCard } from "./components/ReviewCard";

interface HostReviewsProps {
  hostUsername: string;
  onDataLoaded?: (count: number) => void;
}

export function HostReviews({ hostUsername, onDataLoaded }: HostReviewsProps) {
  const { data, isLoading, error } = useGetData<ReviewsResponse>(
    API_ENDPOINTS.RATINGS.BY_USERNAME(hostUsername, 1, 10)
  );

  // Call onDataLoaded when reviews data is available
  useEffect(() => {
    if (data && onDataLoaded) {
      onDataLoaded(data.stats.totalReviews);
    }
  }, [data, onDataLoaded]);

  if (isLoading) {
    return <div className="flex items-center justify-center py-8">Loading reviews...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center py-8">Error loading reviews</div>;
  }

  if (!data || !data.reviews || data.reviews.length === 0) {
    return <div className="flex items-center justify-center py-8">No reviews found</div>;
  }

  // Transform rating distribution data to RatingDistribution[] format
  const distribution: RatingDistribution[] = Object.entries(data.stats.ratingDistribution)
    .map(([stars, count]) => ({
      stars: parseInt(stars),
      count: count,
      percentage: (count / data.stats.totalReviews) * 100,
    }))
    .sort((a, b) => b.stars - a.stars);

  return (
    <div className="flex flex-col gap-8">
      <RatingOverview
        overallRating={data.stats.averageRating}
        totalReviews={data.stats.totalReviews}
        distribution={distribution}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.reviews.map((review) => (
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
  );
}
