import { keepPreviousData } from '@tanstack/react-query';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { Carousel, CarouselTrip } from '@/app/(pages)/(landing)/components/MobileLanding/types';
import { withLocation } from '@/common/utils/locationQuery';
import { useTripLocation } from './useTripLocation';

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

export const useFeaturedTrips = () => {
  // Key must match the SSR prefetch in (pages)/page.tsx: ['featured-trips', lat, lng].
  const loc = useTripLocation();
  return useGetData<Carousel[]>(
    withLocation(API_ENDPOINTS.LANDING_PAGE.FEATURED_TRIPS, loc),
    {
      queryKey: ['featured-trips', loc.lat, loc.lng],
      staleTime: CACHE_TIME,
      gcTime: CACHE_TIME,
      // Keep the old city's carousels on screen while the new city loads (no skeleton flash).
      placeholderData: keepPreviousData,
    }
  );
};
