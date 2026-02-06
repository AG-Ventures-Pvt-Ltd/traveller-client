'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import TripFilters, { FilterValues } from './components/TripFilters';
import FilterModal from './components/FilterModal';
import TripList from './components/TripList';
import { useGetData } from '@/services/useGetData';
import BackButton from '@/common/ui/BackButton';
import { SlidersHorizontal } from 'lucide-react';
import Button from '@/common/components/atoms/Button';
import CircularLoader from '@/common/ui/Loader/CircularLoader';


interface Trip {
  title: string;
  image: string;
  address: string;
  duration: string;
  startDate: string;
  endDate: string;
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
  const [filters, setFilters] = useState<FilterValues>({
    tourTypes: [],
    priceRange: null,
    durations: [],
    durationRange: null,
    difficulties: [],
    minRating: null,
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({
    tourTypes: [],
    priceRange: null,
    durations: [],
    durationRange: null,
    difficulties: [],
    minRating: null,
  });
  const [apiUrl, setApiUrl] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();

    if (appliedFilters.tourTypes && appliedFilters.tourTypes.length > 0) {
      const lowercaseCategories = appliedFilters.tourTypes.map(category => category.toLowerCase());
      params.append('category', JSON.stringify(lowercaseCategories));
    }
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
    if (destination) params.append('destination', destination);

    const queryString = params.toString();
    setApiUrl(`api/client/v1/trips/search${queryString ? `?${queryString}` : ''}`);
  }, [appliedFilters, destination]);

  const { data: tripsData, isLoading: tripsLoading, error } = useGetData<TripsResponse>(apiUrl || '', {
    queryKey: apiUrl ? [apiUrl] : ['trips-loading'],
    enabled: !!apiUrl,
  });

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

  return (
    <div className='flex flex-col py-2 mb-8'>
      <div className='mb-4 mx-[1%] flex items-center justify-between'>
      <BackButton className='ml-[1%]'/>
        <div className='md:hidden'>
          <Button
            onClick={() => setIsFilterModalOpen(true)}
            className="md:hidden flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl px-4 h-12"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </Button>
        </div>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />
      <div className='flex gap-3'>
        <div className='hidden md:block flex-1 sticky top-[12%] self-start'>
          <TripFilters onFilterChange={handleFilterChange} onApplyFilters={handleApplyFilters} />
        </div>
        <div className='flex-1 md:flex-[3]'>
          {tripsLoading && <CircularLoader />}
          {tripsData && tripsData.trips?.length === 0 && (
            <div className='bg-gray-50 border border-gray-200 text-gray-700 px-6 py-8 rounded-lg text-center'>
              <p className='text-lg font-medium'>No trips found</p>
              <p className='text-sm text-gray-600 mt-2'>Try adjusting your filters to see more results</p>
            </div>
          )}
          <div>
            <div>
              <h1 className='text-4xl font-bold text-gray-900'>
                {destination ? `Search Results for ${destination}` : 'All Trips'}
              </h1>
              {tripsData && (
                <p className='text mb-3 font-semibold text-gray-600 mt-1'>
                  {tripsData.pagination?.total} {tripsData.pagination?.total === 1 ? 'trip' : 'trips'} found
                </p>
              )}
            </div>
            {!tripsLoading && tripsData && <TripList
              trips={tripsData.trips}
              onBookNow={handleBookNow}
              formatDate={formatDate}
              calculateDays={calculateDays}
            />}
          </div>
        </div>
      </div>
    </div>
  );
}