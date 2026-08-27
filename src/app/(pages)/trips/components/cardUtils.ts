import { MONTHS, Trip } from '../types';

/**
 * Card surface colours, cycled by list position. Brand palette only — the same three
 * used by the landing page carousel cards, so /trips reads as the same product.
 */
export const CARD_COLORS = ['#FFD976', '#EEA0FF', '#E2F4A6'] as const;

export const cardColor = (index: number) => CARD_COLORS[index % CARD_COLORS.length];

/** Images for the carousel, falling back to the single legacy `image` field. */
export function cardImages(trip: Pick<Trip, 'images' | 'image'>): string[] {
  const list = (trip.images || []).filter(Boolean);
  return list.length > 0 ? list : [trip.image].filter(Boolean);
}

/**
 * "14 Sep", or "14 Sep 2027" when the departure isn't in the current year.
 *
 * Formatted from a fixed month table rather than toLocaleDateString: Node and the browser
 * disagree on en-IN's short month ("Sept" vs "Sep"), which renders one string on the
 * server and a different one on the client and trips a hydration mismatch.
 */
export function formatDepartureDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return `${date.getDate()} ${MONTHS[date.getMonth()]}${sameYear ? '' : ` ${date.getFullYear()}`}`;
}

export interface DepartureInfo {
  label: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Departure strip content, or null when there is nothing trustworthy to show.
 *
 * Returns null for a missing or past date rather than rendering a stale one — the API
 * only sends upcoming departures, but a card can outlive the departure it was rendered with.
 */
export function departureInfo(trip: Pick<Trip, 'nextStartDate'>): DepartureInfo | null {
  if (!trip.nextStartDate) return null;

  const start = new Date(trip.nextStartDate);
  if (Number.isNaN(start.getTime())) return null;

  const daysAway = Math.ceil((start.getTime() - Date.now()) / DAY_MS);
  if (daysAway < 0) return null;

  return {
    label: daysAway === 0 ? 'Departs today' : `Next: ${formatDepartureDate(trip.nextStartDate)}`,
  };
}
