'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import TripSearchCard from './components/TripSearchCard';
import TripFilters, { FilterValues } from './components/TripFilters';
import { useGetData } from '@/services/useGetData';

interface Trip {
  title: string;
  image: string;
  address: string;
  duration: string;
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
  slug: string;
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
  const [filters, setFilters] = useState<FilterValues>({});
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});
  const [apiUrl, setApiUrl] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();

    if (appliedFilters.numberOfDays) params.append('numberOfDays', appliedFilters.numberOfDays.toString());
    if (appliedFilters.maxPeople) params.append('maxPeople', appliedFilters.maxPeople.toString());
    if (appliedFilters.minBudget) params.append('minBudget', appliedFilters.minBudget.toString());
    if (appliedFilters.maxBudget) params.append('maxBudget', appliedFilters.maxBudget.toString());
    if (appliedFilters.startDate) params.append('startDate', appliedFilters.startDate);
    if (appliedFilters.endDate) params.append('endDate', appliedFilters.endDate);
    if (destination) params.append('destination', destination);

    const queryString = params.toString();
    setApiUrl(`api/client/v1/trips/search${queryString ? `?${queryString}` : ''}`);
  }, [appliedFilters, destination]);

  const { data: tripsData, isLoading, error } = useGetData<TripsResponse>(apiUrl || '', {
    queryKey: apiUrl ? [apiUrl] : ['trips-loading'],
    enabled: !!apiUrl,
  });

  const handleFilterChange = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
  }, []);

  const handleApplyFilters = useCallback(() => {
    setAppliedFilters(filters);
  }, [filters]);

  const handleBookmark = () => {
    // Implement bookmark logic
    // TODO: Add bookmark functionality
  };

  const handleBookNow = (slug: string) => {
    router.push(`/trip/${slug}`);
  };

  return (
    <div className='flex gap-6 p-6 max-w-7xl mx-auto'>
      <div className='flex-1'>
        <TripFilters onFilterChange={handleFilterChange} onApplyFilters={handleApplyFilters} />
      </div>
      <div className='flex-[3]'>
        <div className='mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>
            {destination ? `Search Results for ${destination}` : 'All Trips'}
          </h1>
          {tripsData && (
            <p className='text-sm text-gray-600 mt-1'>
              {tripsData.pagination?.total} {tripsData.pagination?.total === 1 ? 'trip' : 'trips'} found
            </p>
          )}
        </div>

        {(!apiUrl || isLoading) && (
          <div className='flex items-center justify-center py-12'>
            <div className='text-gray-600'>Loading trips...</div>
          </div>
        )}

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
            Error loading trips: {error.message}
          </div>
        )}

        {tripsData && tripsData.trips?.length === 0 && (
          <div className='bg-gray-50 border border-gray-200 text-gray-700 px-6 py-8 rounded-lg text-center'>
            <p className='text-lg font-medium'>No trips found</p>
            <p className='text-sm text-gray-600 mt-2'>Try adjusting your filters to see more results</p>
          </div>
        )}

        <div className='space-y-4'>
          {tripsData?.trips?.map((trip) => {

            return (
              <TripSearchCard
                key={trip.slug}
                imageUrl={trip.image}
                title={trip.title}
                location={trip.address}
                days={parseInt(trip.duration)}
                rating={trip.rating}
                reviewCount={trip.totalReviews}
                price={trip?.price || trip.basePrice}
                seatsLeft={trip.availableSeats || 0}
                totalSeats={trip.totalSeats || 0}
                onBookmark={handleBookmark}
                onBookNow={() => handleBookNow(trip.slug)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}