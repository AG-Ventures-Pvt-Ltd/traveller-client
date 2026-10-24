import { cache } from 'react';
import { getServerData } from '@/services/serverApi';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

export interface StateTrip {
  id: string;
  tripSlug: string;
  title: string;
  image: string;
  location: string;
  hostName: string;
  hostUsername: string;
  rating: number;
  price: number;
  days: string;
  nextTripDate: string | null;
  isBookmarked: boolean;
}

export interface StateTripsResponse {
  state: { stateCode: string; name: string; imageUrl: string };
  trips: StateTrip[];
}

// cache() dedupes this across generateMetadata + Page within one request —
// both need the same state/trip data.
export const getStateTrips = cache(async (stateCode: string): Promise<StateTripsResponse | null> => {
  try {
    return await getServerData<StateTripsResponse>(API_ENDPOINTS.LANDING_PAGE.TRIPS_BY_STATE(stateCode));
  } catch {
    return null;
  }
});
