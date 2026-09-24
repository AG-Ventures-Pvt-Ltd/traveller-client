'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEventOnce, type ListName } from '@/common/utils/analytics';
import { useViewItemList } from '@/common/hooks/useViewItemList';
import type { Trip } from './types';

/**
 * GA4 tracking for the /trips feed, shared by the desktop and mobile lists:
 * `search` when the page was reached from a query, and one `view_item_list`
 * per distinct result set (a filter change is a new list, a re-render is not).
 */
export function useTripsListTracking(trips: Trip[]) {
  const searchParams = useSearchParams();

  const q = searchParams.get('q');
  const host = searchParams.get('host');
  const listName: ListName = host ? `operator:${host}` : q ? 'search' : 'trips';

  useEffect(() => {
    if (q) trackEventOnce(`search:${q}`, 'search', { search_term: q });
  }, [q]);

  useViewItemList(
    listName,
    trips.map((t) => ({
      slug: t.slug, title: t.title, hostUsername: t.hostUsername, city: t.state, price: t.price,
    })),
    `${listName}:${searchParams.toString()}`,
  );
}
