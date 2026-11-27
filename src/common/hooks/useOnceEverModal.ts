'use client';

import { useEffect, useState } from 'react';
import { useTimedModal } from './useTimedModal';

const readCount = (key: string) => Number(localStorage.getItem(key)) || 0;

/**
 * Like useTimedModal, but fires at most `maxShows` times per browser (count in localStorage).
 * Counts as shown as soon as it shows, not on dismiss, so leaving the page early still counts.
 */
export function useOnceEverModal(delayMs: number, storageKey: string, enabled = true, maxShows = 1) {
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    try {
      if (readCount(storageKey) < maxShows) setEligible(true);
    } catch {
      setEligible(true);
    }
  }, [storageKey, maxShows]);

  const { show, dismiss } = useTimedModal(delayMs, enabled && eligible);

  useEffect(() => {
    if (!show) return;
    try {
      localStorage.setItem(storageKey, String(readCount(storageKey) + 1));
    } catch {
      // ignore
    }
  }, [show, storageKey]);

  return { show, dismiss };
}
