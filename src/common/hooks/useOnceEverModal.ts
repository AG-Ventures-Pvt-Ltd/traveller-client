'use client';

import { useEffect, useState } from 'react';
import { useTimedModal } from './useTimedModal';

/**
 * Like useTimedModal, but only ever fires once per browser (tracked in localStorage).
 * Marks itself seen as soon as it shows, not on dismiss, so leaving the page early
 * still counts as shown.
 */
export function useOnceEverModal(delayMs: number, storageKey: string, enabled = true) {
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(storageKey)) setEligible(true);
    } catch {
      setEligible(true);
    }
  }, [storageKey]);

  const { show, dismiss } = useTimedModal(delayMs, enabled && eligible);

  useEffect(() => {
    if (!show) return;
    try {
      localStorage.setItem(storageKey, '1');
    } catch {
      // ignore
    }
  }, [show, storageKey]);

  return { show, dismiss };
}
