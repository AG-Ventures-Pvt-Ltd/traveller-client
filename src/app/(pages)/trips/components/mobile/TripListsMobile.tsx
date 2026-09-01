'use client';

import React, { useState } from 'react';
import { FunnelIcon } from '@phosphor-icons/react';
import BackButton from '@/common/ui/BackButton';
import FilterModal from '../FilterModal';
import SkeletonCard from './SkeletonCard';
import { TripCard } from './TripCard';
import ActiveFilterChips from '../filters/ActiveFilterChips';
import SortDropdown from '../filters/SortDropdown';
import { EMPTY_FILTERS, countActiveFilters, hasActiveFilters } from '../../buildApiUrl';
import { useTripFeed } from '../../useTripFeed';
import { FilterMeta, FilterValues, Pagination, Trip } from '../../types';

interface TripListsMobileProps {
  initialTrips: Trip[];
  initialPagination: Pagination | null;
  initialFilterMeta: FilterMeta | null;
  destination: string | null;
  qParam: string | null;
  hostParam: string | null;
  statusParam: string | null;
  /** Owned by TripsPageClient and backed by the URL, so it survives the mobile/desktop fork. */
  filters: FilterValues;
  onFiltersChange: (next: FilterValues) => void;
}

const TripListsMobile = ({
  initialTrips,
  initialPagination,
  initialFilterMeta,
  destination,
  qParam,
  hostParam,
  statusParam,
  filters,
  onFiltersChange,
}: TripListsMobileProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const feed = useTripFeed({
    filters,
    destination,
    qParam,
    hostParam,
    statusParam,
    initialTrips,
    initialPagination,
    initialFilterMeta,
  });

  const activeCount = countActiveFilters(filters);
  const showEmpty = !feed.isInitialLoading && feed.trips.length === 0;

  return (
    <div className="flex-1 bg-[#FFF9F4] px-4 pb-8 pt-4">
      <BackButton label="Back to Home" />

      <div className="mb-3 mt-3 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-black">
            {qParam ? `Results for ${qParam}` : destination ? destination : 'Explore'}
          </h1>
          <p className="mt-0.5 text-xs font-semibold text-neutral-600">
            {feed.isInitialLoading
              ? 'Finding trips…'
              : `${feed.total} ${feed.total === 1 ? 'trip' : 'trips'}`}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFilterModalOpen(true)}
          className="relative flex shrink-0 items-center gap-2 rounded-xl bg-[#E2F4A6] px-4 py-2.5 text-sm font-bold text-black"
        >
          <FunnelIcon size={20} weight="bold" />
          Filters
          {activeCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EEA0FF] px-1 text-[11px] font-bold text-black ring-2 ring-[#FFF9F4]">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      <div className="mb-3">
        <SortDropdown value={filters.sort} onChange={(sort) => onFiltersChange({ ...filters, sort })} />
      </div>

      {activeCount > 0 && (
        <div className="mb-4">
          <ActiveFilterChips value={filters} onChange={onFiltersChange} />
        </div>
      )}

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        value={filters}
        onApply={onFiltersChange}
        meta={feed.filterMeta}
        resultCount={feed.total}
      />

      {feed.isInitialLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} index={index} />
          ))}
        </div>
      )}

      {showEmpty && (
        <div className="mt-4 rounded-2xl border-2 border-neutral-200 bg-white px-6 py-10 text-center">
          <p className="text-lg font-bold text-neutral-900">No trips found</p>
          <p className="mt-1 text-sm text-neutral-600">
            {hasActiveFilters(filters)
              ? 'No upcoming departures match these filters.'
              : 'There are no upcoming departures right now.'}
          </p>
          {hasActiveFilters(filters) && (
            <button
              type="button"
              onClick={() => onFiltersChange({ ...EMPTY_FILTERS, sort: filters.sort })}
              className="mt-5 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {feed.trips.length > 0 && (
        <div className="flex flex-col gap-4">
          {feed.trips.map((trip, index) => (
            <TripCard key={`${trip.slug}-${index}`} trip={trip} index={index} />
          ))}
        </div>
      )}

      {feed.isLoadingMore && (
        <div className="flex justify-center py-6">
          <div className="flex items-center gap-1.5">
            {[0, 0.15, 0.3].map((delay) => (
              <div
                key={delay}
                className="h-2 w-2 animate-bounce rounded-full bg-neutral-900"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {feed.hasMore && <div ref={feed.bottomRef} className="mt-2 h-4" />}
    </div>
  );
};

export default TripListsMobile;
