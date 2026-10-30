'use client';

import { createContext, useContext } from 'react';
import { useLocationStore } from './useLocation';
import { DELHI, LatLng, nearestCity } from '@/common/utils/locationQuery';

const ServerLocationContext = createContext<LatLng | null>(null);

/** Wraps a page with the location its SSR fetch used (see getServerLocation). */
export const ServerLocationProvider = ServerLocationContext.Provider;

/**
 * Location used for trip API URLs. The user's own choice (GPS / picked city, persisted in
 * localStorage) wins; otherwise the server's resolution — so the first client render builds
 * exactly the URLs the server prefetched and hydration needs no refetch.
 */
export function useTripLocation(): LatLng {
  const serverLoc = useContext(ServerLocationContext);
  const lat = useLocationStore((s) => s.latitude);
  const lng = useLocationStore((s) => s.longitude);
  if (lat != null && lng != null) return { lat, lng };
  return serverLoc ?? DELHI;
}

interface City {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

/**
 * The departure city to display: nearest active city to the user's chosen coords, else the
 * city the server resolved for this request, else Delhi. Mirrors the backend's choice.
 */
export function useDepartureCity<C extends City>(cities: C[] | undefined, serverCity?: C | null): { city: string; state: string } {
  const lat = useLocationStore((s) => s.latitude);
  const lng = useLocationStore((s) => s.longitude);
  const fromUser = lat != null && lng != null && cities?.length ? nearestCity(cities, { lat, lng }) : null;
  return fromUser ?? serverCity ?? { city: 'Delhi', state: 'Delhi' };
}
