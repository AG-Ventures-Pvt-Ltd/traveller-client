'use client';

import { useEffect } from 'react';

// next-pwa's auto-registration only patches pages/_app.js, so an App Router
// project has to register the generated /sw.js itself.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Best-effort — a failed registration shouldn't affect the page.
    });
  }, []);

  return null;
}
