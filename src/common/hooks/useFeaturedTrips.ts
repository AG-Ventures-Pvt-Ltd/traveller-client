import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface Trip {
  days: string;
  image: string;
  isBookmarked: boolean;
  location: string;
  price: number;
  title: string;
  tripSlug: string;
}

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

export const useFeaturedTrips = () => {
  return useGetData<Trip[]>(
    API_ENDPOINTS.LANDING_PAGE.FEATURED_TRIPS,
    {
      queryKey: ['featured-trips'],
      staleTime: CACHE_TIME,
      gcTime: CACHE_TIME,
    }
  );
};
