'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import TripFilters, { FilterValues } from './components/TripFilters';
import TripList from './components/TripList';
import { useGetData } from '@/services/useGetData';
import TripListSkeleton from './components/TripListSkeleton';
import TripListsMobile from './components/mobile/TripListsMobile';
import { buildTripsApiUrl, EMPTY_FILTERS } from './buildApiUrl';
import { Trip, Pagination, TripsResponse } from './types';

interface TripsPageClientProps {
  initialTrips: Trip[];
  initialPagination: Pagination | null;
  /** Device guess from the request User-Agent so SSR renders the right variant. */
  initialIsMobile: boolean;
  destination: string | null;
  qParam: string | null;
  hostParam: string | null;
  statusParam: string | null;
}

export default function TripsPageClient({
  initialTrips,
  initialPagination,
  initialIsMobile,
  destination,
  qParam,
  hostParam,
  statusParam,
}: TripsPageClientProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(initialIsMobile);
  const [filters, setFilters] = useState<FilterValues>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(EMPTY_FILTERS);
  const [apiUrl, setApiUrl] = useState<string>(() =>
    buildTripsApiUrl(EMPTY_FILTERS, { destination, qParam, hostParam, statusParam, page: 1 })
  );
  const [page, setPage] = useState(1);
  const [allTrips, setAllTrips] = useState<Trip[]>(initialTrips);
  const [hasMore, setHasMore] = useState(initialPagination?.hasNextPage ?? false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const isFetchingMore = useRef(false);
  const hasMoreRef = useRef(true);
  const isLoadingRef = useRef(false);
  // Skips the reset-on-change effect's first fire, so it doesn't clobber the
  // server-seeded trip list before the client has anything to replace it with.
  const isFirstRender = useRef(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reset accumulation whenever filters/search change (skips the initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(1);
    setAllTrips([]);
    setHasMore(true);
    hasMoreRef.current = true;
    isFetchingMore.current = false;
  }, [appliedFilters, destination, qParam, hostParam, statusParam]);

  useEffect(() => {
    setApiUrl(buildTripsApiUrl(appliedFilters, { destination, qParam, hostParam, statusParam, page }));
  }, [appliedFilters, destination, qParam, hostParam, statusParam, page]);

  const { data: tripsData, isLoading: tripsLoading, error } = useGetData<TripsResponse>(apiUrl, {
    queryKey: [apiUrl],
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
    throw Error(error.message || 'Error Loading Trips');
  }

  if (isMobile) {
    return (
      <TripListsMobile
        initialTrips={initialTrips}
        initialPagination={initialPagination}
        destination={destination}
        qParam={qParam}
        hostParam={hostParam}
        statusParam={statusParam}
      />
    );
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
            {allTrips.length > 0 && <div>
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
