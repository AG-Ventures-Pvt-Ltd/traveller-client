import { Star, ThumbsUp } from "lucide-react";
import { Avatar, LinearProgress, Box, Typography } from "@mui/material";

interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
}

interface TripReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export function TripReviews({ reviews, averageRating, totalReviews, ratingBreakdown }: TripReviewsProps) {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className="space-y-6 my-8">
        <div className="flex items-center gap-2">
          <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
          <h2 className="font-bold text-2xl">{averageRating} · {totalReviews} Reviews</h2>
        </div>
        <div className="text-gray-500 text-center py-8">
          Reviews are not available yet.
        </div>
      </div>
    );
  }

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 my-8">
      <div className="flex items-center gap-2">
        <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
        <h2 className="font-bold text-2xl">{averageRating} · {totalReviews} Reviews</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingBreakdown[rating as keyof typeof ratingBreakdown];
            const percentage = (count / totalReviews) * 100;
            return (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm w-6">{rating}</span>
                <LinearProgress 
                  variant="determinate" 
                  value={percentage} 
                  sx={{ flex: 1, height: 8, borderRadius: 1 }}
                />
                <span className="text-sm text-gray-500 w-12 text-right">{count}</span>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{averageRating}</span>
              </div>
              <Typography variant="body2" color="text.secondary">Overall Rating</Typography>
            </Box>
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
              <div className="flex items-center gap-2 mb-1">
                <ThumbsUp className="h-4 w-4 text-primary" />
                <span>98%</span>
              </div>
              <Typography variant="body2" color="text.secondary">Recommended</Typography>
            </Box>
          </div>
        </div>
      </div>

      <Box sx={{ pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar src={review.avatar} alt={review.author}>
                  {review.author[0]}
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span>{review.author}</span>
                    <Typography variant="body2" color="text.secondary">{review.date}</Typography>
                  </div>
                  <StarRating rating={review.rating} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {review.comment}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}
