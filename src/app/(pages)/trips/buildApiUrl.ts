import { FilterValues } from './components/TripFilters';

export const TRIPS_PAGE_SIZE = 12;

export const EMPTY_FILTERS: FilterValues = {
  states: [],
  priceRange: null,
  durations: [],
  durationRange: null,
  difficulties: [],
  minRating: null,
  international: false,
};

export interface TripsSearchParams {
  destination?: string | null;
  qParam?: string | null;
  hostParam?: string | null;
  statusParam?: string | null;
  page?: number;
}

// Shared by the server page (initial fetch) and both client trees (desktop
// pagination, mobile infinite scroll) so the query key always matches — a
// mismatched key would bypass the HydrationBoundary cache and refetch.
export function buildTripsApiUrl(filters: FilterValues, params: TripsSearchParams): string {
  const { destination, qParam, hostParam, statusParam, page = 1 } = params;
  const search = new URLSearchParams();

  if (filters.priceRange) search.append('maxBudget', filters.priceRange.toString());
  if (filters.durationRange) search.append('numberOfDays', filters.durationRange.toString());
  if (filters.difficulties && filters.difficulties.length > 0) search.append('difficulties', filters.difficulties.join(','));
  if (filters.minRating) search.append('minRating', filters.minRating.toString());
  if (filters.states && filters.states.length > 0) search.append('states', filters.states.join(','));
  if (filters.international) search.append('international', 'true');

  if (hostParam) search.append('host', hostParam);
  if (statusParam) search.append('status', statusParam);

  if (qParam) {
    search.append('q', qParam);
    return `api/client/v1/trips/v2/search?${search.toString()}`;
  }

  if (destination) search.append('destination', destination);
  search.append('page', page.toString());
  search.append('limit', TRIPS_PAGE_SIZE.toString());

  return `api/client/v1/trips/search?${search.toString()}`;
}
