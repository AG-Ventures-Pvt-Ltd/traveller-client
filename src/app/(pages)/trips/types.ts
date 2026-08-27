/**
 * A trip as returned by `/trips/search` and `/trips/v2/search`.
 *
 * This mirrors the endpoints' `$project` exactly. It previously declared a dozen fields the
 * API has never sent (basePrice, totalSeats, status, isFeatured, …), which is how a card
 * ends up calling `.toLocaleString()` on `undefined` — keep the two in step.
 */
export interface Trip {
  _id?: string;
  title: string;
  slug: string;
  /** Slugified title + slug, used for the /trip/<slug> URL. */
  tripSlug?: string;
  image: string;
  /** Up to 5 images for the card carousel. Falls back to `image` when empty. */
  images?: string[];
  address: string;
  state?: string;
  days: string;
  /** ISO date of the soonest upcoming departure, or null when the trip has none. */
  nextStartDate?: string | null;
  rating: number;
  totalReviews: number;
  price: number;
  isBookmarked: boolean;
  hostName: string;
  hostUsername?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** Bounds for the price slider — the domain of all published trips, not of the current results. */
export interface FilterMeta {
  minPrice: number;
  maxPrice: number;
}

export interface TripsResponse {
  trips: Trip[];
  pagination: Pagination;
  filterMeta?: FilterMeta;
  message: string;
}

export const SORT_OPTIONS = [
  { value: '', label: 'Recommended' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'rating_desc', label: 'Top rated' },
  { value: 'nextStartDate_asc', label: 'Departing soonest' },
] as const;

/** Short month names. Fixed table, not toLocaleDateString — see formatDepartureDate. */
export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

/** Full month names, for the month filter list. */
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

/**
 * Filter state. Field names match the API query params so the URL, the API call and this
 * object stay one-to-one — the one exception is `month`, which expands to the API's
 * startDate/endDate pair in buildTripsApiUrl.
 */
export interface FilterValues {
  states: string[];
  minBudget: number | null;
  maxBudget: number | null;
  /** Server applies this as "at most N days", not as a range. */
  numberOfDays: number | null;
  /** Departure month as 'YYYY-MM', or null for any month. */
  month: string | null;
  international: boolean;
  /** One of SORT_OPTIONS' values, e.g. 'price_asc'. Empty means relevance/default. */
  sort: string;
}
