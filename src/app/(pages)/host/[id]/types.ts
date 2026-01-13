export interface HostProfile {
  id: string;
  fullName: string;
  yearsOfExperience: string;
  bio: string;
  avatar?: string;
  stats: HostStats;
  rating: number;
  reviewCount: number;
}

export interface HostStats {
  yearsWithPlatform: number;
  successfulTrips: number;
  happyGuests: number;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PerformanceMetric {
  id: string;
  icon: string;
  value: string;
  label: string;
  description: string;
}

export interface Trip {
  id: string;
  title: string;
  location: string;
  category: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
  image: string;
  slug: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  reviewerName: string;
  reviewerInitials: string;
  reviewerLocation?: string;
  rating: number;
  tripName: string;
  date: string;
  comment: string;
}

export interface ReviewData {
  _id: string;
  username: string;
  tripTitle: string;
  tripSlug: string;
  rating: number;
  comment: string;
  helpful: number;
  createdAt: string;
}

export interface RatingDistributionData {
  "5": number;
  "4": number;
  "3": number;
  "2": number;
  "1": number;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: RatingDistributionData;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ReviewsResponse {
  reviews: ReviewData[];
  stats: ReviewStats;
  pagination: Pagination;
}

export interface RatingDistribution {
  stars: number;
  count: number;
  percentage: number;
}

export type TabType = "trips" | "reviews";
