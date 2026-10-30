import { cookies, headers } from 'next/headers';
import { DELHI, LatLng, parseLatLng, USER_LOC_COOKIE } from './locationQuery';

const BOT_UA = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|lighthouse|headless/i;

/**
 * The visitor's location for SSR trip fetches, read from the visitor's own request so
 * the page stays fully server-rendered (no client-side geo round trip before LCP).
 *
 *   1. user_loc cookie — GPS or a picked city, mirrored from localStorage
 *   2. crawlers / visitors outside India → Delhi (stable indexable page; "nearest city"
 *      would otherwise map a US crawler to an arbitrary Indian city)
 *   3. x-vercel-ip-latitude/longitude — Vercel's IP geo of the visitor
 *   4. Delhi (e.g. local dev, where Vercel adds no geo headers)
 */
export async function getServerLocation(): Promise<LatLng> {
  const [c, h] = await Promise.all([cookies(), headers()]);

  const [lat, lng] = (c.get(USER_LOC_COOKIE)?.value || '').split(',');
  const fromCookie = parseLatLng(lat, lng);
  if (fromCookie) return fromCookie;

  const country = h.get('x-vercel-ip-country');
  if (BOT_UA.test(h.get('user-agent') || '') || (country && country.toUpperCase() !== 'IN')) return DELHI;

  return parseLatLng(h.get('x-vercel-ip-latitude'), h.get('x-vercel-ip-longitude')) ?? DELHI;
}
