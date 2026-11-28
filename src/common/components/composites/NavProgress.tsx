'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const NAV_START = 'nav-progress:start';

/** For programmatic navigations (router.push) — link clicks are picked up automatically. */
export const startNavProgress = () => window.dispatchEvent(new Event(NAV_START));

/**
 * Left-to-right top bar shown while the next route renders on the server. Our pages are
 * force-dynamic with no loading.tsx (it would soft-404 trip pages), so without this a
 * click gives no feedback until the whole server render lands.
 *
 * Starts on any same-origin <a> click (capture phase, before Next's Link handler) or
 * startNavProgress(); finishes when the URL changes.
 */
export default function NavProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const url = `${pathname}?${searchParams}`;

  useEffect(() => {
    setState((s) => (s === 'loading' ? 'done' : s));
  }, [url]);

  useEffect(() => {
    if (state === 'idle') return;
    // done → fade out; loading → give up if the navigation never commits (aborted, same URL).
    const t = setTimeout(() => setState(state === 'done' ? 'idle' : 'done'), state === 'done' ? 500 : 15000);
    return () => clearTimeout(t);
  }, [state]);

  useEffect(() => {
    const start = () => setState('loading');
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || !a.href || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const next = new URL(a.href, location.href);
      if (next.origin !== location.origin) return;
      if (next.pathname === location.pathname && next.search === location.search) return;
      start();
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener(NAV_START, start);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener(NAV_START, start);
    };
  }, []);

  if (state === 'idle') return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[3px]">
      <div className={`h-full rounded-r-full bg-gradient-to-r from-[#EEA0FF] via-[#FFD976] to-[#D0EF65] shadow-[0_0_6px_rgba(238,160,255,0.7)] ${state === 'loading' ? 'nav-progress-loading' : 'nav-progress-done'}`} />
    </div>
  );
}
