'use client';

import { useEffect } from 'react';
import { trackEventOnce, toGaItem, type GaItemInput, type ListName } from '@/common/utils/analytics';

const MAX_ITEMS = 20; // GA4 drops events with oversized item arrays

/**
 * Sends GA4 `view_item_list` once per list, after the cards have data.
 *
 * `key` separates two lists on the same page (e.g. several landing carousels)
 * so each is counted once instead of the first one winning.
 */
export function useViewItemList(listName: ListName, items: GaItemInput[], key: string = listName) {
  // The slug list is the only thing that decides whether this is a new list —
  // depending on `items` itself would re-fire on every parent render.
  const signature = items.slice(0, MAX_ITEMS).map((i) => i.slug).join(',');

  useEffect(() => {
    if (!signature) return;
    trackEventOnce(`view_item_list:${key}`, 'view_item_list', {
      item_list_name: listName,
      items: items.slice(0, MAX_ITEMS).map((item, index) => toGaItem({ ...item, index, listName })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, key, listName]);
}
