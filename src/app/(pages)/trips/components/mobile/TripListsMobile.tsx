

'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BackButton from '@/common/ui/BackButton';
import FilterModal from '../FilterModal';
import { FilterValues } from '../TripFilters';
import { useGetData } from '@/services/useGetData';
import CarouselCard from '@/app/(pages)/(landing)/HomePage/components/CarouselCard';
import SkeletonCard from './SkeletonCard';
import { FunnelIcon } from '@phosphor-icons/react';


interface Trip {
    title: string;
    image: string;
    address: string;
    rating: number;
    price: number;
    isBookmarked: boolean;
    hostName: string;
    slug: string;
    days: string;
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

const PAGE_SIZE = 12;

const EMPTY_FILTERS: FilterValues = {
    tourTypes: [],
    priceRange: null,
    durations: [],
    durationRange: null,
    difficulties: [],
    minRating: null,
};

const TripListsMobile = () => {
    const searchParams = useSearchParams();
    const destination = searchParams.get('destination');

    const [page, setPage] = useState(1);
    const [allTrips, setAllTrips] = useState<Trip[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [pendingFilters, setPendingFilters] = useState<FilterValues>(EMPTY_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<FilterValues>(EMPTY_FILTERS);

    const bottomRef = useRef<HTMLDivElement>(null);
    const isFetchingMore = useRef(false);
    const hasMoreRef = useRef(true);
    const isLoadingRef = useRef(false);

    const apiUrl = useMemo(() => {
        const params = new URLSearchParams();

        if (appliedFilters.tourTypes.length > 0) {
            params.append('category', JSON.stringify(appliedFilters.tourTypes.map(c => c.toLowerCase())));
        }
        if (appliedFilters.priceRange) {
            params.append('maxBudget', appliedFilters.priceRange.toString());
        }
        if (appliedFilters.durationRange) {
            params.append('numberOfDays', appliedFilters.durationRange.toString());
        }
        if (appliedFilters.difficulties.length > 0) {
            params.append('difficulties', appliedFilters.difficulties.join(','));
        }
        if (appliedFilters.minRating) {
            params.append('minRating', appliedFilters.minRating.toString());
        }
        if (destination) params.append('destination', destination);
        params.append('page', page.toString());
        params.append('limit', PAGE_SIZE.toString());

        return `api/client/v1/trips/search?${params.toString()}`;
    }, [appliedFilters, destination, page]);

    const { data: tripsData, isLoading, error } = useGetData<TripsResponse>(apiUrl, {
        queryKey: [apiUrl],
        enabled: true,
    });

    // Sync loading state to ref for observer
    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);

    // Accumulate trips when data arrives
    useEffect(() => {
        if (!tripsData) return;

        const newTrips = tripsData.trips || [];
        if (page === 1) {
            setAllTrips(newTrips);
        } else {
            setAllTrips(prev => [...prev, ...newTrips]);
        }

        const nextHasMore = tripsData.pagination?.hasNextPage ?? false;
        setHasMore(nextHasMore);
        hasMoreRef.current = nextHasMore;
        isFetchingMore.current = false;
    }, [tripsData]); // eslint-disable-line react-hooks/exhaustive-deps

    // Reset on filter change
    useEffect(() => {
        setPage(1);
        setAllTrips([]);
        setHasMore(true);
        hasMoreRef.current = true;
        isFetchingMore.current = false;
    }, [appliedFilters]);

    // Infinite scroll observer — created once, reads state via refs
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasMoreRef.current &&
                    !isLoadingRef.current &&
                    !isFetchingMore.current
                ) {
                    isFetchingMore.current = true;
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        const el = bottomRef.current;
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []); // intentionally empty — reads from refs

    const handleFilterChange = useCallback((newFilters: FilterValues) => {
        setPendingFilters(newFilters);
    }, []);

    const handleApplyFilters = useCallback(() => {
        setAppliedFilters(pendingFilters);
    }, [pendingFilters]);

    if (error) {
        throw new Error(error.message || 'Error Loading Trips');
    }

    const isInitialLoading = isLoading && page === 1 && allTrips.length === 0;
    const isLoadingMore = isLoading && page > 1;

    return (
        <div className="min-h-screen bg-[#FFF9F4] px-4 pt-4 pb-8">
            <BackButton label='Back to Home' />
            <div className="flex items-center justify-between my-3">
                <h1 className="text-4xl font-bold text-black mb-1">
                    {destination ? `Results for ${destination}` : 'All Trips'}

                </h1>
                <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center gap-2 bg-[#E2F4A6] text-black font-bold rounded-xl px-4 h-10 text-sm"
                >
                    <FunnelIcon size={24} weight='thin' />
                    Filters
                </button>
            </div>

            {!tripsData && !isInitialLoading && (
                <div className="mb-5" />
            )}
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onFilterChange={handleFilterChange}
                onApplyFilters={handleApplyFilters}
            />
            {isInitialLoading && (
                <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={`skeleton-${index}`} />
                    ))}
                </div>
            )}
            {/* Empty state */}
            {!isInitialLoading && allTrips.length === 0 && !isLoading && (
                <div className="bg-white border border-gray-200 text-gray-700 px-6 py-10 rounded-2xl text-center mt-4">
                    <p className="text-lg font-semibold">No trips found</p>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
                </div>
            )}

            {/* 2-column card grid */}
            {allTrips.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                    {allTrips.map((trip, index) => {
                        const colorScheme = (['yellow', 'purple', 'green'] as const)[index % 3];

                        return (
                            <div key={`${trip.slug}-${index}`} className=''>
                                <CarouselCard
                                    id={trip.slug}
                                    image={trip.image}
                                    title={trip.title}
                                    provider={trip.hostName}
                                    duration={trip.days}
                                    price={trip.price}
                                    rating={trip.rating}
                                    colorScheme={colorScheme}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Loading more indicator */}
            {isLoadingMore && (
                <div className="flex justify-center py-6">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-neutral-900 animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 rounded-full bg-neutral-900 animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <div className="w-2 h-2 rounded-full bg-neutral-900 animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                </div>
            )}

            {/* Sentinel for IntersectionObserver */}
            {hasMore && <div ref={bottomRef} className="h-4 mt-2" />}
        </div>
    );
};

export default TripListsMobile;
