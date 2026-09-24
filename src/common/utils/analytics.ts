// GA4 tracking — every event in the app goes through this module.
//
// Two guards keep production data clean:
//   1. layout.tsx only injects gtag when NEXT_PUBLIC_ENV === 'PRODUCTION'
//   2. canTrack() below refuses to send from any host that isn't wondrr.in,
//      so a production build running on dev1/dev2/localhost/*.vercel.app stays
//      silent even if the env var says otherwise.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = 'G-8ZL8763359';

export const ALLOWED_HOSTS = ['wondrr.in', 'www.wondrr.in'];

function canTrack(): boolean {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return false;
  return ALLOWED_HOSTS.includes(window.location.hostname);
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (!canTrack()) return;
  window.gtag!('event', eventName, params);
}

/**
 * Fires once per key for the lifetime of the tab. Booking and trip pages
 * re-render (and re-mount, on an auth redirect or a return from the payment
 * page) far more often than a user "views" them — the key is what makes
 * begin_checkout/view_item count 1 per visit instead of 2–5.
 */
const fired = new Set<string>();

export function trackEventOnce(key: string, eventName: string, params: Record<string, unknown> = {}) {
  if (fired.has(key)) return;
  fired.add(key);
  trackEvent(eventName, params);
}

// ── Identity ────────────────────────────────────────────────────────────────

/** Internal ID only — never email or phone (GA4 forbids PII). */
export function setGaUserId(userId: string) {
  if (!canTrack()) return;
  window.gtag!('config', GA_ID, { user_id: userId });
}

/** Tags the session so GA4's "Internal traffic" filter drops team activity. */
export function markInternalTraffic() {
  if (!canTrack()) return;
  window.gtag!('set', { traffic_type: 'internal' });
}

/**
 * Client ID + session ID, read out of gtag so the server can attribute the
 * purchase it sends from the payment webhook to this same session.
 * Resolves empty (never rejects, never hangs) — checkout must not wait on GA.
 */
export function getGaIds(): Promise<{ clientId?: string; sessionId?: string }> {
  return new Promise((resolve) => {
    if (!canTrack()) return resolve({});

    let clientId: string | undefined;
    let sessionId: string | undefined;
    let settled = false;
    let received = 0;

    const finish = () => {
      if (settled) return;
      if (++received === 2) {
        settled = true;
        resolve({ clientId, sessionId });
      }
    };

    window.gtag!('get', GA_ID, 'client_id', (v: string) => { clientId = v; finish(); });
    window.gtag!('get', GA_ID, 'session_id', (v: string) => { sessionId = v == null ? undefined : String(v); finish(); });

    setTimeout(() => {
      if (settled) return;
      settled = true;
      resolve({ clientId, sessionId });
    }, 1500);
  });
}

// ── Ecommerce items ─────────────────────────────────────────────────────────

/**
 * Trip URLs are `<title-slug>-<code>` (e.g. spiti-valley-bike-trip-xsvwy) but
 * the trip's real id is the 5-char code. item_id must be the code on every
 * event — client and server — or a per-trip funnel can't be built.
 */
export function shortId(slugOrPath: string): string {
  return slugOrPath.split('-').pop() || slugOrPath;
}

/** Where a click/list impression happened. Same values everywhere. */
export type ListName = 'home' | 'trips' | 'search' | 'blog' | 'explore' | `operator:${string}` | `explore:${string}`;

export interface GaItemInput {
  /** Trip slug or URL path — reduced to the short code. */
  slug: string;
  title?: string;
  /** Operator handle, e.g. "jugraafiya". */
  hostUsername?: string;
  category?: string | string[];
  city?: string;
  country?: string;
  /** Per-person price of the selected batch, else the starting price. */
  price?: number;
  batchId?: string;
  quantity?: number;
  index?: number;
  listName?: ListName;
}

export type GaItem = Record<string, string | number>;

export function toGaItem(input: GaItemInput): GaItem {
  const category = Array.isArray(input.category) ? input.category[0] : input.category;

  // Undefined keys are dropped rather than sent — keeps DebugView readable.
  return Object.fromEntries(
    Object.entries({
      item_id: shortId(input.slug),
      item_name: input.title,
      item_brand: input.hostUsername,
      // No explicit international flag on a trip — country is the only signal.
      item_category: input.country ? (input.country.toLowerCase() === 'india' ? 'domestic' : 'international') : undefined,
      item_category2: category,
      item_category3: input.city,
      item_variant: input.batchId,
      price: input.price,
      quantity: input.quantity ?? 1,
      index: input.index,
      item_list_name: input.listName,
    }).filter(([, v]) => v !== undefined && v !== null && v !== '')
  ) as GaItem;
}
