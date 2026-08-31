'use client';

import { useEffect, useState } from 'react';

/**
 * Shows a one-shot modal after `delayMs` of the component being mounted+enabled.
 * Does not re-arm after dismiss — caller unmount/remount resets it.
 */
export function useTimedModal(delayMs = 60_000, enabled = true) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled || show) return;
    const timer = setTimeout(() => setShow(true), delayMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, delayMs]);

  return { show, dismiss: () => setShow(false) };
}
