'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TripFilters from './components/TripFilters';
import TripList from './components/TripList';
import TripListSkeleton from './components/TripListSkeleton';
import TripListsMobile from './components/mobile/TripListsMobile';
import ActiveFilterChips from './components/filters/ActiveFilterChips';
import SortDropdown from './components/filters/SortDropdown';
import { EMPTY_FILTERS, filtersToQuery, hasActiveFilters, parseFilters } from './buildApiUrl';
import { useTripFeed } from './useTripFeed';
import { FilterMeta, FilterValues, Pagination, Trip } from './types';

interface TripsPageClientProps {
  initialTrips: Trip[];
  initialPagination: Pagination | null;
  initialFilterMeta: FilterMeta | null;
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
  initialFilterMeta,
  initialIsMobile,
  destination,
  qParam,
  hostParam,
  statusParam,
}: TripsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState(initialIsMobile);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // The URL is the source of truth for filters: refresh, back/forward and sharing all
  // keep the current view, and the server can render the same list on first paint.
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const setFilters = useCallback(
    (next: FilterValues) => {
      const sp = filtersToQuery(next);
      // Search context lives in the URL too and isn't ours to drop.
      if (destination) sp.set('destination', destination);
      if (qParam) sp.set('q', qParam);
      if (hostParam) sp.set('host', hostParam);
      if (statusParam) sp.set('status', statusParam);
      const query = sp.toString();
      router.replace(query ? `/trips?${query}` : '/trips', { scroll: false });
    },
    [router, destination, qParam, hostParam, statusParam]
  );

  const feed = useTripFeed({
    filters,
    destination,
    qParam,
    hostParam,
    statusParam,
    initialTrips,
    initialPagination,
    initialFilterMeta,
    enabled: !isMobile,
  });

  if (isMobile) {
    return (
      <TripListsMobile
        initialTrips={initialTrips}
        initialPagination={initialPagination}
        initialFilterMeta={initialFilterMeta}
        destination={destination}
        qParam={qParam}
        hostParam={hostParam}
        statusParam={statusParam}
        filters={filters}
        onFiltersChange={setFilters}
      />
    );
  }

  const heading = hostParam
    ? `Trips by ${hostParam}`
    : qParam
      ? `Results for "${qParam}"`
      : destination
        ? `Trips in ${destination}`
        : 'All trips';

  const showEmpty = !feed.isInitialLoading && feed.trips.length === 0;

  return (
    <div className="flex-1 bg-[#FFF9F4] px-12 py-6">
      <div className="flex gap-8">
        {/* No self-start: the rail must stretch to the row's height or the sticky element
            has no room to travel and simply sits at the top. */}
        <div className="w-72 shrink-0">
          <TripFilters value={filters} onChange={setFilters} meta={feed.filterMeta} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900">{heading}</h1>
              <p className="mt-1 text-sm font-semibold text-neutral-600">
                {feed.isInitialLoading
                  ? 'Finding trips…'
                  : `${feed.total} ${feed.total === 1 ? 'trip' : 'trips'} found`}
              </p>
            </div>
            <SortDropdown value={filters.sort} onChange={(sort) => setFilters({ ...filters, sort })} />
          </div>

          <div className="mb-4">
            <ActiveFilterChips value={filters} onChange={setFilters} />
          </div>

          {feed.isInitialLoading && <TripListSkeleton />}

          {showEmpty && (
            <div className="rounded-3xl border-2 border-neutral-200 bg-white px-6 py-12 text-center">
              <p className="text-lg font-bold text-neutral-900">No trips found</p>
              <p className="mt-2 text-sm text-neutral-600">
                {hasActiveFilters(filters)
                  ? 'No upcoming departures match these filters. Try widening them.'
                  : 'There are no upcoming departures right now. Check back soon.'}
              </p>
              {hasActiveFilters(filters) && (
                <button
                  type="button"
                  onClick={() => setFilters({ ...EMPTY_FILTERS, sort: filters.sort })}
                  className="mt-5 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {feed.trips.length > 0 && <TripList trips={feed.trips} />}

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
      </div>
    </div>
  );
}
