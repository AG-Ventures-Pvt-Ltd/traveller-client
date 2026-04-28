import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { Carousel, CarouselTrip } from '@/app/(pages)/(landing)/HomePage/types';

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

export const useFeaturedTrips = () => {
  return useGetData<Carousel[]>(
    API_ENDPOINTS.LANDING_PAGE.FEATURED_TRIPS,
    {
      queryKey: ['featured-trips'],
      staleTime: CACHE_TIME,
      gcTime: CACHE_TIME,
    }
  );
};
