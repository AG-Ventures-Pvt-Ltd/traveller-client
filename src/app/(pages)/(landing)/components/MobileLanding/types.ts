import type { ListName } from '@/common/utils/analytics';

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
  /** Next departure, already formatted. Landing cards omit it; explore shows it. */
  nextDate?: string | null;
  /** GA4 item_list_name — the card is used outside the landing page. */
  listName?: ListName;
  /** Position in the list, sent as items[].index on select_item. */
  index?: number;
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
  /** GA4 item_list_name for the cards in this carousel. */
  listName?: ListName;
}

export interface SlidingCarouselSectionProps {
  title: string;
  /** GA4 item_list_name for the cards in this section. */
  listName?: ListName;
  description?: string;
  trips: Trip[];
  isLoading?: boolean;
  carouselIndex?: number;
  viewAllClick?: () => void | undefined
}
