'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  CalendarBlankIcon,
  SealCheckIcon,
} from '@phosphor-icons/react';
import TripImageCarousel from './TripImageCarousel';
import { useBookMarking } from '@/common/hooks/useBookMarking';
import { trackEvent, setFunnelSource } from '@/common/utils/analytics';
import { cardColor, cardImages, departureInfo } from './cardUtils';
import { Trip } from '../types';

interface TripSearchCardProps {
  trip: Trip;
  /** List position — drives which brand colour the card takes. */
  index: number;
}

/**
 * Desktop trip card: image left, detail right, two cards per row from `xl`.
 * The brand colour is the card itself — content sits directly on it, no inner panel.
 *
 * Sized for a column that ranges from ~400px (2-up at xl) to full width (1-up below it),
 * so the media takes a share of the card rather than a fixed pixel width, and the detail
 * rows pair a truncating left item with a fixed-width right one to stay readable when the
 * text column is at its narrowest.
 */
const TripSearchCard: React.FC<TripSearchCardProps> = ({ trip, index }) => {
  const { isBookmarked, toggle } = useBookMarking(trip.slug, trip.isBookmarked);
  const [hovered, setHovered] = useState(false);

  const bg = cardColor(index);
  const images = cardImages(trip);
  const departure = departureInfo(trip);
  const href = `/trip/${trip.tripSlug || trip.slug}`;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex h-full gap-4 rounded-[24px] p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.35)]"
      style={{ backgroundColor: bg }}
    >
      {/* Media. No fixed height — it stretches to the row, with min-h as the floor, so the
          image always fills the card instead of leaving a gap under a taller detail column. */}
      <div className="relative w-[40%] max-w-[320px] min-h-[190px] shrink-0 overflow-hidden rounded-[18px]">
        <TripImageCarousel
          images={images}
          alt={trip.title}
          className="h-full w-full"
          priority={index < 4}
          paused={hovered}
          sizes="(min-width: 1280px) 22vw, 45vw"
        />

        <button
          type="button"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Save trip'}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(e); }}
          className="absolute left-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 transition-colors hover:bg-black"
        >
          <HeartIcon
            size={16}
            weight={isBookmarked ? 'fill' : 'regular'}
            className={isBookmarked ? 'text-red-500' : 'text-white'}
          />
        </button>

        <div className="absolute right-2.5 top-2.5 z-20 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 shadow-sm">
          <StarIcon size={13} weight="fill" className="text-[#FFC107]" />
          <span className="text-[11px] font-bold text-neutral-900">
            {trip.rating > 0 ? trip.rating.toFixed(1) : 'New'}
          </span>
          {trip.totalReviews > 0 && (
            <span className="text-[11px] font-medium text-neutral-500">({trip.totalReviews})</span>
          )}
        </div>
      </div>

      {/* Detail — centred against the image rather than top-aligned, so short and long
          titles both sit level with the media beside them. */}
      <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-1">
        <h2 className="line-clamp-2 text-xl font-bold leading-tight tracking-tight text-black">
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
            <SealCheckIcon size={16} className="shrink-0 text-black/45" weight="bold" />
          </div>
        )}

        {/* Paired to the card's edges: a truncating left item and a fixed-width right one,
            so two facts cost one line even when the detail column is narrow. */}
        <div className="mt-2.5 flex items-center justify-between gap-2 text-[13px] font-medium text-black/70 py-0.5">
          <span className="flex min-w-0 items-center gap-1.5">
            <MapPinIcon size={16} className="shrink-0" weight="bold" />
            <span className="truncate text-xs">
              {[trip.address, trip.state].filter(Boolean).join(', ') || 'India'}
            </span>
          </span>

        </div>
        <span className="flex shrink-0 items-center gap-1.5 ml-0.5 py-0.5">
          <ClockIcon size={14} className="shrink-0" weight="bold" />
          <span className='text-xs'>{trip.days}</span>
        </span>

        {departure && (
          <span className="flex shrink-0 items-center gap-1 rounded-lg ml-0.5 text-[11px] py-0.5">
            <CalendarBlankIcon size={14} weight="bold" />
            <span className='text-xs'>{departure.label}</span>
          </span>
        )}
        {/* Price and departure share a line, anchored to opposite corners. */}
        <div className="mt-3 flex items-end justify-between gap-2">
          <span className="flex min-w-0 items-baseline gap-1 text-black">
            <span className="text-[11px] font-medium text-black/60">From</span>
            <span className="text-2xl font-bold leading-none">
              ₹{(trip.price ?? 0).toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] font-medium text-black/60">/person</span>
          </span>


        </div>
      </div>

      {/* Stretched link, placed last and above the card body so a click anywhere —
          including on the image — opens the trip. It stays a single crawlable <a> with no
          nested anchors; the bookmark button, dots and host link sit at z-20 above it. */}
      <Link
        href={href}
        aria-label={trip.title}
        className="absolute inset-0 z-10 rounded-[24px]"
        onClick={() => {
          setFunnelSource('search');
          trackEvent('trip_card_click', { trip_id: trip.slug, trip_title: trip.title, source: 'trips' });
        }}
      />
    </article>
  );
};

export default TripSearchCard;
