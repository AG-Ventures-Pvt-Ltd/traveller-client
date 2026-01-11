export interface HostProfile {
  id: string;
  name: string;
  initials: string;
  tagline: string;
  description: string;
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
  imageUrl: string;
}

export interface Review {
  id: string;
  reviewerName: string;
  reviewerInitials: string;
  reviewerLocation: string;
  rating: number;
  tripName: string;
  date: string;
  comment: string;
}

export interface RatingDistribution {
  stars: number;
  count: number;
  percentage: number;
}

export type TabType = "trips" | "reviews";
