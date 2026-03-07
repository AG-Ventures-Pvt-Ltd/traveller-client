'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import TripFilters, { FilterValues } from '../trips/components/TripFilters';
import FilterModal from '../trips/components/FilterModal';
import TripList from '../trips/components/TripList';
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

export default function GirlsTripsPage() {
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

    // Always filter for female-only trips
    params.append('type', 'femaleonly');

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
    setApiUrl(`api/client/v1/trips/search?${queryString}`);
  }, [appliedFilters, destination]);

  const { data: tripsData, isLoading: tripsLoading, error } = useGetData<TripsResponse>(apiUrl || '', {
    queryKey: apiUrl ? [apiUrl] : ['girls-trips-loading'],
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
    throw Error(error.message || 'Error Loading Trips');
  }

  return (
    <div className='flex flex-col mb-8'>
      {/* Banner */}
      {/* <div className='relative w-full rounded-2xl overflow-hidden mb-6 bg-[#3D1A0E]'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#C4532A] via-[#8B3A1F] to-[#3D1A0E]' />
        <div className='relative z-10 px-8 py-5 flex items-center justify-between'>
          <p className='text-white text-lg md:text-xl font-bold tracking-wide'>
            ✦ Because the best adventures are the ones you take with your girls.
          </p>
          <span className='hidden md:inline-block bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 whitespace-nowrap ml-6'>
            Girls Only
          </span>
        </div>
      </div> */}

      {/* Filters & Listing */}
      <div className='py-2'>
        <div className='mb-4 mx-[1%] flex items-center justify-between'>
          <BackButton className='ml-[1%]' />
          <div className='md:hidden'>
            <Button
              onClick={() => setIsFilterModalOpen(true)}
              className="md:hidden flex items-center gap-2 bg-[#C4532A] hover:bg-[#A8461F] text-white font-bold rounded-xl px-4 h-12"
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
            <div>
              <div>
                <h2 className='text-4xl font-bold text-[#3D1A0E]'>
                  {destination ? `Search Results for ${destination}` : 'All Girls Trips'}
                </h2>
                {tripsData && (
                  <p className='text mb-3 font-semibold text-[#A0502E] mt-1'>
                    {tripsData.pagination?.total} {tripsData.pagination?.total === 1 ? 'trip' : 'trips'} found
                  </p>
                )}
                {tripsData && tripsData.trips?.length === 0 && (
                  <div className='bg-[#FDF0EB] border border-[#E8C4B0] text-[#7A3520] px-6 py-8 rounded-lg text-center'>
                    <p className='text-lg font-medium'>No trips found</p>
                    <p className='text-sm text-[#A0502E] mt-2'>Try adjusting your filters to see more results</p>
                  </div>
                )}
              </div>
              {!tripsLoading && tripsData && (
                <TripList
                  trips={tripsData.trips}
                  onBookNow={handleBookNow}
                  formatDate={formatDate}
                  calculateDays={calculateDays}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
