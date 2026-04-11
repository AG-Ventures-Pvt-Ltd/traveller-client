export interface Activity {
  time?: string;
  description: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description?: string;
  activities: (string | Activity)[];
  meals?: string[];
  duration?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  initials?: string;
  location?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AvailableDate {
  startDate: Date | string;
  endDate?: Date | string;
  price: number;
  seatsAvailable: number;
  totalSeats: number;
  batchId: string;
  meetingPoint?: string;
}

export interface Host {
  name: string;
  avatar?: string;
  initials?: string;
  rating: number;
  username: string;
  totalReviews: number;
  joinedDate?: number;
  description: string;
  responseTime?: string;
  languages?: string[];
  certifications?: string[];
}

export interface CancellationRule {
  timing: string;
  refund: string;
}

export interface RefundTerm {
  text: string;
}

export interface TripData {
  title: string;
  description: string;
  images?: string[];
  category: string;
  location: string;
  meetingPoint: string;
  endPoint: string;
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  host?: Host;
  reviews?: Review[];
  rating?: number;
  totalReviews?: number;
  cancellationRules?: CancellationRule[];
  refundTerms?: RefundTerm[];
  refundProcessingTime?: string;
  additionalInfo?: string;
  faqs?: FAQ[];
  tripBatches?: AvailableDate[];
  basePrice?: number;
  tags: string[];
  slug?: string;
  isBookmarked?: boolean;
  cancellationPolicy?: Array<{ days: string; refund: string }>;
  refundPolicy?: { description: string; terms: string[] };
}

export interface TripImageGalleryProps {
  images: string[];
}

export interface TripBookingCardProps {
  availableDates: AvailableDate[];
  basePrice: number;
  duration?: string;
  meetingPoint?: string;
  category?: string;
  schedule?: string;
  difficulty?: string;
  languages?: string;
  tripSlug?: string;
  isBookmarked?: boolean;
}

export interface TripInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export interface TripItineraryProps {
  itinerary: ItineraryDay[];
}

export interface TripFAQProps {
  faqs: FAQ[];
}

export interface TripReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface HostCardProps {
  name: string;
  avatar?: string;
  initials?: string;
  rating: number;
  totalReviews: number;
  joinedDate?: number;
  username: string;
  description: string;
  responseTime?: string;
  languages?: string[];
  certifications?: string[];
}

export interface TripPoliciesProps {
  cancellationRules?: CancellationRule[];
  refundTerms?: RefundTerm[];
  refundProcessingTime?: string;
}

export interface TripAdditionalInfoProps {
  info?: string;
}