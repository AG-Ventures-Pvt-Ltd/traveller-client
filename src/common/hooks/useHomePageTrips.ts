import { useGetData } from '@/services/useGetData';

interface Trip {
  days: string;
  image: string;
  isBookmarked: boolean;
  location: string;
  price: number;
  title: string;
  tripSlug: string;
  rating?: number;
  reviewCount?: number;
}

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

export const useMostBookedTrips = () => {
  return useGetData<Trip[]>(
    '/api/client/v1/landingpage/mostBooked',
    {
      queryKey: ['most-booked-trips'],
      staleTime: CACHE_TIME,
      gcTime: CACHE_TIME,
    }
  );
};

export const useTopRatedTrips = () => {
  return useGetData<Trip[]>(
    '/api/client/v1/landingpage/topRated',
    {
      queryKey: ['top-rated-trips'],
      staleTime: CACHE_TIME,
      gcTime: CACHE_TIME,
    }
  );
};
