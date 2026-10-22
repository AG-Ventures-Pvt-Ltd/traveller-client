'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MobileCarouselCard from '../../(landing)/components/MobileLanding/components/CarouselCard';
import DesktopCarouselCard from '../../(landing)/components/DesktopLanding/components/CarouselCard';
import { useViewItemList } from '@/common/hooks/useViewItemList';
import type { StateTrip } from './serverFetch';

// Same rotation the landing carousels use, so a trip looks the same in both places.
const COLOR_SCHEMES: Array<'yellow' | 'green' | 'purple'> = ['yellow', 'green', 'purple'];

const formatNextDate = (iso: string | null): string | null => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

interface ExploreStateGridProps {
  trips: StateTrip[];
  stateName: string;
  /** Device guess from the request User-Agent so SSR renders the right card variant. */
  initialIsMobile: boolean;
}

export default function ExploreStateGrid({ trips, stateName, initialIsMobile }: ExploreStateGridProps) {
  // Initialised from the server UA guess so the first client render matches the
  // server render (no hydration mismatch). A resize effect corrects edge cases.
  const [isMobile, setIsMobile] = useState(initialIsMobile);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const listName = `explore:${stateName.toLowerCase()}` as const;

  useViewItemList(
    listName,
    trips.map((t) => ({ slug: t.tripSlug, title: t.title, hostUsername: t.hostUsername, city: t.location, price: t.price })),
    listName,
  );

  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center sm:py-24">
        <span className="text-5xl">🧭</span>
        <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">Nothing here yet</h2>
        <p className="max-w-md text-sm text-neutral-500 sm:text-base">
          No upcoming trips in {stateName} right now. Check back soon or explore another destination.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
      {trips.map((trip, i) => {
        const Card = isMobile ? MobileCarouselCard : DesktopCarouselCard;
        return (
          <Card
            key={trip.id}
            id={trip.id}
            tripSlug={trip.tripSlug}
            image={trip.image}
            title={trip.title}
            provider={trip.hostName}
            hostUsername={trip.hostUsername}
            duration={trip.days}
            price={trip.price}
            rating={trip.rating}
            isBookmarked={trip.isBookmarked}
            colorScheme={COLOR_SCHEMES[i % COLOR_SCHEMES.length]}
            nextDate={formatNextDate(trip.nextTripDate)}
            listName={listName}
            index={i}
            priority={i < 4}
          />
        );
      })}
    </div>
  );
}
