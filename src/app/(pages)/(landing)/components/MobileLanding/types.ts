export interface Trip {
  id: string | number;
  image: string;
  title: string;
  provider: string;
  hostUsername?: string;
  duration: string;
  price: number;
  rating: number;
  tripSlug?: string;
  isBookmarked?: boolean;
}

export interface CarouselTrip {
  tripSlug: string;
  image: string;
  title: string;
  hostName: string;
  hostUsername: string;
  location: string;
  days: string;
  price: number;
  isBookmarked: boolean;
  rating: number;
}

export interface Carousel {
  _id: string;
  title: string;
  priority: number;
  trips: CarouselTrip[];
}

export interface CarouselCardProps {
  id: string | number;
  image: string;
  title: string;
  provider: string;
  hostUsername?: string;
  duration: string;
  price: number;
  rating: number;
  colorScheme?: 'yellow' | 'green' | 'purple';
  className?:string;
  onClick?: () => void;
  tripSlug?: string;
  isBookmarked?: boolean;
  priority?: boolean;
}

export interface SlidingCarouselProps {
  trips: Trip[];
  isLoading?: boolean;
  onCardClick?: () => void;
  carouselIndex?: number;
}

export interface SlidingCarouselSectionProps {
  title: string;
  description?: string;
  trips: Trip[];
  isLoading?: boolean;
  carouselIndex?: number;
  viewAllClick?: () => void | undefined
}
