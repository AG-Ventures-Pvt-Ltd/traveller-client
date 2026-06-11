export interface Activity {
  time?: string;
  description: string;
}

export interface TripHighlight {
  title: string;
  image: string;
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
  startDateTime: Date | string;
  endDateTime: Date | string;
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
  certificates?: string[];
  isCertified?: boolean;
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
  duration : string;
  difficulty : string;
  images?: string[];
  highlights?: TripHighlight[];
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
  tags?: string[];
  slug : string;
  isBookmarked?: boolean;
  bestTimeToVisit?: string;
  cancellationPolicy?: { refundTiers?: Array<{ daysBeforeCancellation: string; refundPercentage: string }> };
  refundPolicy?: { description: string; terms: string[] };
  pricing : {
    pricings: Array<{
      label: string;
      description: string;
      pricePerPerson: number;
    }>
  }
  pricings?: Array<{
    label: string;
    description: string;
    pricePerPerson: number;
  }>;
}

export interface TripMetadata {
  title: string;
  numberOfDays: number;
  location: string;
  hostName: string;
  image: string;
  // Optional enrichment fields — included in schema only when the backend sends them.
  priceFrom?: number;
  priceCurrency?: string;
  rating?: number;
  reviewCount?: number;
  hostUsername?: string;
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