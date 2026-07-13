

'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import BackButton from '@/common/ui/BackButton';
import FilterModal from '../FilterModal';
import { FilterValues } from '../TripFilters';
import { useGetData } from '@/services/useGetData';
import SkeletonCard from './SkeletonCard';
import { TripCard } from './TripCard';
import { FunnelIcon } from '@phosphor-icons/react';
import { buildTripsApiUrl, EMPTY_FILTERS } from '../../buildApiUrl';
import { Trip, Pagination, TripsResponse } from '../../types';

interface TripListsMobileProps {
    initialTrips: Trip[];
    initialPagination: Pagination | null;
    destination: string | null;
    qParam: string | null;
    hostParam: string | null;
    statusParam: string | null;
}

const TripListsMobile = ({
    initialTrips,
    initialPagination,
    destination,
    qParam,
    hostParam,
    statusParam,
}: TripListsMobileProps) => {
    const [page, setPage] = useState(1);
    const [allTrips, setAllTrips] = useState<Trip[]>(initialTrips);
    const [hasMore, setHasMore] = useState(initialPagination?.hasNextPage ?? false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [pendingFilters, setPendingFilters] = useState<FilterValues>(EMPTY_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<FilterValues>(EMPTY_FILTERS);

    const bottomRef = useRef<HTMLDivElement>(null);
    const isFetchingMore = useRef(false);
    const hasMoreRef = useRef(true);
    const isLoadingRef = useRef(false);
    // Skips the reset-on-change effect's first fire, so it doesn't clobber the
    // server-seeded trip list before the client has anything to replace it with.
    const isFirstRender = useRef(true);

    const apiUrl = useMemo(
        () => buildTripsApiUrl(appliedFilters, { destination, qParam, hostParam, statusParam, page }),
        [appliedFilters, destination, page, qParam, hostParam, statusParam]
    );

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

    // Reset on filter change (skips the initial mount)
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
    }, [appliedFilters, hostParam, statusParam]);

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
            <div className="flex items-center justify-between my-3 px-4 pt-2">
                <h1 className="text-3xl font-bold text-black mb-1">
                    {qParam ? `Results for ${qParam}` : 'Explore'}

                </h1>
                <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center gap-2 bg-[#E2F4A6] text-black font-bold rounded-xl px-4 h-10 text-sm"
                >
                    <FunnelIcon size={24} weight='thin' />
                    Filters
                </button>
            </div>
            {/* <div className='flex gap-4 items-center mb-4'>
                <span className='border rounded-full py-1 px-3'>Experiences</span>
                <span>Destinations</span>
            </div> */}

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
                <div className="flex flex-col gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
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

            {/* Card list */}
            {allTrips.length > 0 && (
                <div className="flex flex-col gap-3">
                    {allTrips.map((trip, index) => {
                        const CARD_COLORS = ['#FFD976', '#EEA0FF', '#E2F4A6'];
                        const bgColor = CARD_COLORS[index % CARD_COLORS.length];

                        return (
                            <TripCard
                                key={`${trip.slug}-${index}`}
                                title={trip.title}
                                image={trip.image}
                                address={trip.address}
                                rating={trip.rating}
                                price={trip.price}
                                hostName={trip.hostName}
                                hostUsername={trip.hostUsername}
                                slug={trip.slug}
                                tripSlug={trip.tripSlug || trip.slug}
                                days={trip.days}
                                bgColor={bgColor}
                                isBookmarked={trip.isBookmarked}
                            />
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
