export interface Trip {
  title: string;
  image: string;
  address: string;
  duration: string;
  startDate: string;
  endDate: string;
  days: string;
  rating: number;
  totalReviews: number;
  basePrice: number;
  price: number;
  totalSeats: number;
  totalBookings: number;
  availableSeats: number;
  status: string;
  category: string;
  difficulty: string;
  isFeatured: boolean;
  isBookmarked: boolean;
  hostName: string;
  hostUsername?: string;
  slug: string;
  tripSlug?: string;
  tags?: string[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface TripsResponse {
  trips: Trip[];
  pagination: Pagination;
  message: string;
}
