'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetData } from '@/services/useGetData';
import { buildTripsApiUrl, TripsSearchParams } from './buildApiUrl';
import { FilterMeta, FilterValues, Pagination, Trip, TripsResponse } from './types';

interface UseTripFeedArgs extends TripsSearchParams {
  filters: FilterValues;
  initialTrips: Trip[];
  initialPagination: Pagination | null;
  /** Seeded from the server fetch so the price slider renders its real domain on first
      paint instead of flashing the fallback range. */
  initialFilterMeta?: FilterMeta | null;
  /** Mobile and desktop render different trees; only the mounted one should fetch. */
  enabled?: boolean;
}

interface TripFeed {
  trips: Trip[];
  total: number;
  filterMeta?: FilterMeta;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  /** Attach to a sentinel element at the end of the list. */
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Paginated trip list with infinite scroll, shared by the desktop and mobile trees so the
 * fetch/accumulate logic exists once instead of being maintained in two places.
 *
 * Pages are kept in a map keyed by page number rather than appended to a flat array: a
 * re-delivered page overwrites itself instead of being concatenated again, so a repeated
 * effect run can't duplicate trips in the list.
 */
export function useTripFeed({
  filters,
  destination,
  qParam,
  hostParam,
  statusParam,
  initialTrips,
  initialPagination,
  initialFilterMeta,
  enabled = true,
}: UseTripFeedArgs): TripFeed {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<Record<number, Trip[]>>({ 1: initialTrips });
  // Held in state rather than read off `data`, which goes undefined while the next page is
  // in flight. Deriving hasMore from it would unmount the sentinel mid-load, disconnecting
  // the observer from an element it never re-observes — infinite scroll would stop at page 2.
  const [meta, setMeta] = useState({
    total: initialPagination?.total ?? 0,
    hasMore: initialPagination?.hasNextPage ?? false,
  });
  const [filterMeta, setFilterMeta] = useState<FilterMeta | undefined>(initialFilterMeta ?? undefined);

  const bottomRef = useRef<HTMLDivElement>(null);
  const isFetchingMore = useRef(false);
  const hasMoreRef = useRef(initialPagination?.hasNextPage ?? false);
  const isLoadingRef = useRef(false);

  // Identity of the current filter set — page 1's URL. Changing it means a different list.
  const feedKey = useMemo(
    () => buildTripsApiUrl(filters, { destination, qParam, hostParam, statusParam, page: 1 }),
    [filters, destination, qParam, hostParam, statusParam]
  );

  const apiUrl = useMemo(
    () => buildTripsApiUrl(filters, { destination, qParam, hostParam, statusParam, page }),
    [filters, destination, qParam, hostParam, statusParam, page]
  );

  // Comparing against the previous key skips the reset on mount, which would otherwise
  // throw away the server-rendered first page before the client has anything to show.
  const prevFeedKey = useRef(feedKey);
  useEffect(() => {
    if (prevFeedKey.current === feedKey) return;
    prevFeedKey.current = feedKey;
    setPage(1);
    setPages({});
    isFetchingMore.current = false;
    hasMoreRef.current = true;
  }, [feedKey]);

  const { data, isLoading, error } = useGetData<TripsResponse>(apiUrl, {
    queryKey: [apiUrl],
    enabled: enabled && !!apiUrl,
  });

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    if (!data) return;
    setPages((prev) => ({ ...prev, [page]: data.trips || [] }));
    setMeta({
      total: data.pagination?.total ?? 0,
      hasMore: data.pagination?.hasNextPage ?? false,
    });
    if (data.filterMeta) setFilterMeta(data.filterMeta);
    hasMoreRef.current = data.pagination?.hasNextPage ?? false;
    isFetchingMore.current = false;
  }, [data, page]);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMoreRef.current &&
          !isLoadingRef.current &&
          !isFetchingMore.current
        ) {
          isFetchingMore.current = true;
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );
    const el = bottomRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  const trips = useMemo(
    () =>
      Object.keys(pages)
        .map(Number)
        .sort((a, b) => a - b)
        .flatMap((n) => pages[n]),
    [pages]
  );

  // After every hook, so an error render doesn't change the hook call order.
  if (error) throw new Error(error.message || 'Error Loading Trips');

  return {
    trips,
    total: meta.total,
    filterMeta,
    isInitialLoading: isLoading && page === 1 && trips.length === 0,
    isLoadingMore: isLoading && page > 1,
    hasMore: meta.hasMore,
    bottomRef,
  };
}
