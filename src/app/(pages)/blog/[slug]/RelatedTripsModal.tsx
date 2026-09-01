'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import CarouselCard from '../../(landing)/components/DesktopLanding/components/CarouselCard';
import type { Trip } from '../../(landing)/components/MobileLanding/types';

interface Props {
  open: boolean;
  onClose: () => void;
  trips: Trip[];
  blogTitle: string;
}

const COLOR_SCHEMES: Array<'yellow' | 'green' | 'purple'> = ['yellow', 'green', 'purple'];

export default function RelatedTripsModal({ open, onClose, trips, blogTitle }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [open]);

  if (!open || !mounted) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
        <div className="relative flex max-h-[90vh] w-full flex-col rounded-t-3xl border-2 border-neutral-900 bg-white p-6 shadow-[8px_8px_0_0_#111] sm:max-w-2xl sm:rounded-3xl">
          <button
            onClick={onClose}
            className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-900 bg-white transition-colors hover:bg-neutral-100"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <h2 className="pr-10 text-xl font-bold text-neutral-900 sm:text-2xl">Still here? Keep exploring</h2>
          <p className="mt-1 text-sm text-neutral-500">
            You may explore these trips around the location and story in &ldquo;{blogTitle}&rdquo;
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 overflow-y-auto sm:grid-cols-2">
            {trips.map((trip, index) => (
              <CarouselCard
                key={trip.id}
                {...trip}
                colorScheme={COLOR_SCHEMES[index % COLOR_SCHEMES.length]}
                onClick={onClose}
              />
            ))}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
