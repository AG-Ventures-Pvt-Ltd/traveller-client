'use client';

import React from 'react';
import Link from 'next/link';
import {
  StarIcon,
  MapPinIcon,
  HeartIcon,
  CalendarBlankIcon,
  ClockIcon,
  SealCheckIcon,
} from '@phosphor-icons/react';
import TripImageCarousel from '../TripImageCarousel';
import { useBookMarking } from '@/common/hooks/useBookMarking';
import { trackEvent, setFunnelSource } from '@/common/utils/analytics';
import { cardColor, cardImages, departureInfo } from '../cardUtils';
import { Trip } from '../../types';

interface TripCardProps {
  trip: Trip;
  index: number;
}

/**
 * Mobile trip card. Same shape as the desktop card — image left, detail right, detail
 * centred against the media — with the media share and type scaled for a phone-width column.
 */
export function TripCard({ trip, index }: TripCardProps) {
  const { isBookmarked, toggle } = useBookMarking(trip.slug, trip.isBookmarked);

  const bg = cardColor(index);
  const images = cardImages(trip);
  const departure = departureInfo(trip);
  const href = `/trip/${trip.tripSlug || trip.slug}`;

  return (
    <article
      className="relative flex gap-3 rounded-[22px] p-2.5 transition-transform active:scale-[0.99]"
      style={{ backgroundColor: bg }}
    >
      {/* Media. No fixed height — stretches to the row with min-h as the floor. */}
      <div className="relative min-h-[170px] w-[44%] max-w-[170px] shrink-0 overflow-hidden rounded-[16px]">
        <TripImageCarousel
          images={images}
          alt={trip.title}
          className="h-full w-full"
          priority={index < 2}
          sizes="40vw"
        />

        <button
          type="button"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Save trip'}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(e); }}
          className="absolute left-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/55"
        >
          <HeartIcon
            size={16}
            weight={isBookmarked ? 'fill' : 'regular'}
            className={isBookmarked ? 'text-red-500' : 'text-white'}
          />
        </button>

        <div className="absolute right-2 top-2 z-20 flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5">
          <StarIcon size={12} weight="fill" className="text-[#FFC107]" />
          <span className="text-[11px] font-bold text-black">
            {trip.rating > 0 ? trip.rating.toFixed(1) : 'New'}
          </span>
          {trip.totalReviews > 0 && (
            <span className="text-[11px] font-medium text-neutral-500">({trip.totalReviews})</span>
          )}
        </div>
      </div>

      {/* Detail — centred against the image, matching the desktop card. */}
      <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-0.5">
        <h2 className="line-clamp-2 text-[17px] font-bold leading-tight tracking-tight text-black">
          {trip.title}
        </h2>

        {trip.hostName && (
          <div className="mt-1.5 flex min-w-0 items-center gap-1">
            <Link
              href={trip.hostUsername ? `/${trip.hostUsername}` : '#'}
              onClick={(e) => e.stopPropagation()}
              className="relative z-20 truncate text-[13px] font-medium text-black/70 hover:underline"
            >
              by {trip.hostName}
            </Link>
            <SealCheckIcon size={16} weight="bold" className="shrink-0 text-black/45" />
          </div>
        )}

        <div className="mt-2.5 flex items-center gap-2 py-0.5 text-[13px] font-medium text-black/70">
          <span className="flex min-w-0 items-center gap-1.5">
            <MapPinIcon size={16} weight="bold" className="shrink-0" />
            <span className="truncate text-xs">
              {[trip.address, trip.state].filter(Boolean).join(', ') || 'India'}
            </span>
          </span>
        </div>

        <span className="ml-0.5 flex shrink-0 items-center gap-1.5 py-0.5 text-black/70">
          <ClockIcon size={14} weight="bold" className="shrink-0" />
          <span className="text-xs">{trip.days}</span>
        </span>

        {departure && (
          <span className="ml-0.5 flex shrink-0 items-center gap-1 py-0.5 text-black/70">
            <CalendarBlankIcon size={14} weight="bold" />
            <span className="text-xs">{departure.label}</span>
          </span>
        )}

        <div className="mt-3 flex items-end justify-between gap-2">
          <span className="flex min-w-0 items-baseline gap-1 text-black">
            <span className="text-[11px] font-medium text-black/60">From</span>
            <span className="text-xl font-bold leading-none">
              ₹{(trip.price ?? 0).toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] font-medium text-black/60">/person</span>
          </span>
        </div>
      </div>

      {/* Stretched link last and above the body, so a tap anywhere on the card opens the
          trip while the bookmark button, host link and carousel dots (z-20) stay tappable. */}
      <Link
        href={href}
        aria-label={trip.title}
        className="absolute inset-0 z-10 rounded-[22px]"
        onClick={() => {
          setFunnelSource('search');
          trackEvent('trip_card_click', { trip_id: trip.slug, trip_title: trip.title, source: 'trips' });
        }}
      />
    </article>
  );
}
