// Shared by server pages and client hooks so both build byte-identical API URLs
// (and therefore identical react-query keys) for the same location.

export interface LatLng {
  lat: number;
  lng: number;
}

export const DELHI: LatLng = { lat: 28.61, lng: 77.21 };

/** Cookie mirror of the persisted location store, readable by SSR on first paint. */
export const USER_LOC_COOKIE = 'user_loc';

// 2 decimals ≈ 1 km — plenty to pick a departure city, and keeps cache keys stable.
export const round2 = (n: number) => Math.round(n * 100) / 100;

export const parseLatLng = (lat: unknown, lng: unknown): LatLng | null => {
  if (lat == null || lng == null || lat === '' || lng === '') return null;
  const la = Number(lat);
  const ln = Number(lng);
  if (!Number.isFinite(la) || !Number.isFinite(ln) || Math.abs(la) > 90 || Math.abs(ln) > 180) return null;
  return { lat: round2(la), lng: round2(ln) };
};

export const withLocation = (url: string, loc: LatLng | null | undefined) =>
  loc ? `${url}${url.includes('?') ? '&' : '?'}lat=${loc.lat}&lng=${loc.lng}` : url;

const toRad = (d: number) => (d * Math.PI) / 180;
const distKm = (a: LatLng, b: LatLng) => {
  const h = Math.sin(toRad(b.lat - a.lat) / 2) ** 2
    + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(toRad(b.lng - a.lng) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};

/** Same rule as the backend: closest active city wins, no radius cap. */
export const nearestCity = <C extends { latitude: number; longitude: number }>(cities: C[], loc: LatLng): C | null => {
  let best: C | null = null;
  let bestDist = Infinity;
  for (const c of cities) {
    const d = distKm(loc, { lat: c.latitude, lng: c.longitude });
    if (d < bestDist) { bestDist = d; best = c; }
  }
  return best;
};
