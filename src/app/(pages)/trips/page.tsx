'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import TripFilters, { FilterValues } from './components/TripFilters';
import TripList from './components/TripList';
import { useGetData } from '@/services/useGetData';
import TripListSkeleton from './components/TripListSkeleton';
import { useDevice } from '@/common/hooks/useDevice';
import TripListsMobile from './components/mobile/TripListsMobile'


interface Trip {
  title: string;
  image: string;
  address: string;
  duration: string;
  startDate: string;
  endDate: string;
  days: string;
  rating: number;
  totalReviews: number;
  basePrice: number;
  price: number;
  totalSeats: number;
  totalBookings: number;
  availableSeats: number;
  status: string;
  category: string;
  difficulty: string;
  isFeatured: boolean;
  isBookmarked: boolean;
  hostName: string;
  slug: string;
  tags?: string[];
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface TripsResponse {
  trips: Trip[];
  pagination: Pagination;
  message: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const destination = searchParams.get('destination');
  const qParam = searchParams.get('q');
  const hostParam = searchParams.get('host');
  const statusParam = searchParams.get('status');
  const [filters, setFilters] = useState<FilterValues>({
    states: [],
    priceRange: null,
    durations: [],
    durationRange: null,
    difficulties: [],
    minRating: null,
    international: false,
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({
    states: [],
    priceRange: null,
    durations: [],
    durationRange: null,
    difficulties: [],
    minRating: null,
    international: false,
  });
  const [apiUrl, setApiUrl] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 12;

  const bottomRef = useRef<HTMLDivElement>(null);
  const isFetchingMore = useRef(false);
  const hasMoreRef = useRef(true);
  const isLoadingRef = useRef(false);


  const { isMobile } = useDevice()

  // Reset accumulation whenever filters/search change
  useEffect(() => {
    setPage(1);
    setAllTrips([]);
    setHasMore(true);
    hasMoreRef.current = true;
    isFetchingMore.current = false;
  }, [appliedFilters, destination, qParam, hostParam, statusParam]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (appliedFilters.priceRange) {
      params.append('maxBudget', appliedFilters.priceRange.toString());
    }
    if (appliedFilters.durationRange) {
      params.append('numberOfDays', appliedFilters.durationRange.toString());
    }
    if (appliedFilters.difficulties && appliedFilters.difficulties.length > 0) {
      params.append('difficulties', appliedFilters.difficulties.join(','));
    }
    if (appliedFilters.minRating) {
      params.append('minRating', appliedFilters.minRating.toString());
    }
    if (appliedFilters.states && appliedFilters.states.length > 0) {
      params.append('states', appliedFilters.states.join(','));
    }
    if (appliedFilters.international) {
      params.append('international', 'true');
    }

    if (hostParam) params.append('host', hostParam);
    if (statusParam) params.append('status', statusParam);

    if (qParam) {
      params.append('q', qParam);
      setApiUrl(`api/client/v1/trips/v2/search?${params.toString()}`);
      return;
    }

    if (destination) params.append('destination', destination);
    params.append('page', page.toString());
    params.append('limit', PAGE_SIZE.toString());

    const queryString = params.toString();
    setApiUrl(`api/client/v1/trips/search${queryString ? `?${queryString}` : ''}`);
  }, [appliedFilters, destination, qParam, hostParam, statusParam, page]);

  const { data: tripsData, isLoading: tripsLoading, error } = useGetData<TripsResponse>(apiUrl || '', {
    queryKey: apiUrl ? [apiUrl] : ['trips-loading'],
    enabled: !!apiUrl && !isMobile,
  });

  // Keep loading state in a ref for the observer
  useEffect(() => {
    isLoadingRef.current = tripsLoading;
  }, [tripsLoading]);

  // Accumulate trips as pages arrive
  useEffect(() => {
    if (!tripsData) return;

    const newTrips = tripsData.trips || [];
    if (page === 1) {
      setAllTrips(newTrips);
    } else {
      setAllTrips((prev) => [...prev, ...newTrips]);
    }

    const nextHasMore = tripsData.pagination?.hasNextPage ?? false;
    setHasMore(nextHasMore);
    hasMoreRef.current = nextHasMore;
    isFetchingMore.current = false;
  }, [tripsData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Infinite scroll observer — created once, reads state via refs
  useEffect(() => {
    if (isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMoreRef.current &&
          !isLoadingRef.current &&
          !isFetchingMore.current
        ) {
          isFetchingMore.current = true;
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const el = bottomRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  const handleFilterChange = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
  }, []);

  const handleApplyFilters = useCallback(() => {
    setAppliedFilters(filters);
  }, [filters]);

  const handleBookNow = (slug: string) => {
    router.push(`/trip/${slug}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (error) {
    throw Error(error.message || 'Error Loading Trips')
  }

  if (isMobile) {
    return <TripListsMobile />
  }

  return (
    <div className='flex flex-col py-2 mb-8 mx-12'>
      <div className='flex gap-3'>
        <div className='flex-1 self-start sticky top-[10%]'>
          <TripFilters onFilterChange={handleFilterChange} onApplyFilters={handleApplyFilters} />
        </div>
        <div className='flex-1 md:flex-[3]'>
          {!tripsLoading && allTrips.length === 0 && (
            <div className='bg-gray-50 border border-gray-200 text-gray-700 px-6 py-8 rounded-lg text-center'>
              <p className='text-lg font-medium'>No trips found</p>
              <p className='text-sm text-gray-600 mt-2'>Try adjusting your filters to see more results</p>
            </div>
          )}
          <div>
            {tripsData && tripsData.pagination?.total > 0 && <div>
              <h1 className='text-4xl font-bold text-gray-900'>
                {hostParam ? `Trips by ${hostParam}` : qParam ? `Results for "${qParam}"` : destination ? `Search Results for ${destination}` : 'All Trips'}
              </h1>
              {tripsData && (
                <p className='text mb-3 font-semibold text-gray-600 mt-1'>
                  {tripsData.pagination?.total} {tripsData.pagination?.total === 1 ? 'trip' : 'trips'} found
                </p>
              )}
            </div>}
            {tripsLoading && page === 1 && allTrips.length === 0 && <TripListSkeleton />}
            {allTrips.length > 0 && <TripList
              trips={allTrips}
              onBookNow={handleBookNow}
              formatDate={formatDate}
              calculateDays={calculateDays}
            />}
            {tripsLoading && page > 1 && (
              <div className='flex justify-center py-6'>
                <div className='flex items-center gap-1.5'>
                  <div className='w-2 h-2 rounded-full bg-neutral-900 animate-bounce' style={{ animationDelay: '0s' }} />
                  <div className='w-2 h-2 rounded-full bg-neutral-900 animate-bounce' style={{ animationDelay: '0.15s' }} />
                  <div className='w-2 h-2 rounded-full bg-neutral-900 animate-bounce' style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            )}
            {hasMore && <div ref={bottomRef} className='h-4 mt-2' />}
          </div>
        </div>
      </div>
    </div>
  );
}