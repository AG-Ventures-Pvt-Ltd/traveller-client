'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { baseAPI } from '@/services/baseApi';
import { round2, USER_LOC_COOKIE } from '@/common/utils/locationQuery';

export interface LocationDetails {
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  address?: string;
  timezone?: string;
}

export interface LocationState {
  // Location data — persisted to localStorage and mirrored to the user_loc cookie so SSR
  // fetches trips for the same departure city on the next visit.
  source: 'gps' | 'manual' | null;
  latitude: number | null;
  longitude: number | null;
  locationDetails: LocationDetails | null;
  
  // Loading and error states
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean;
  permissionDenied: boolean;
  
  // Actions
  requestLocationPermission: () => Promise<void>;
  setLocationDetails: (details: LocationDetails) => void;
  setCityLocation: (latitude: number, longitude: number, details: LocationDetails) => void;
  clearLocation: () => void;
}

const writeLocCookie = (lat: number | null, lng: number | null) => {
  if (typeof document === 'undefined') return;
  document.cookie = lat != null && lng != null
    ? `${USER_LOC_COOKIE}=${lat},${lng}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
    : `${USER_LOC_COOKIE}=; path=/; max-age=0`;
};

const useLocationStore = create<LocationState>()(persist((set) => ({
  // Initial state
  source: null,
  latitude: null,
  longitude: null,
  locationDetails: null,
  isLoading: false,
  error: null,
  hasPermission: false,
  permissionDenied: false,

  // Request location permission and get coordinates
  requestLocationPermission: async () => {
    set({ isLoading: true, error: null });
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      return new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = round2(position.coords.latitude);
            const longitude = round2(position.coords.longitude);
            writeLocCookie(latitude, longitude);

            set({
              source: 'gps',
              latitude,
              longitude,
              hasPermission: true,
              permissionDenied: false,
            });

            // Fetch location details from backend
            try {
              const response = await baseAPI.post('/api/client/v1/location/details', {
                latitude,
                longitude,
              });

              const locationDetails = response.data.data as LocationDetails;
              set({
                locationDetails,
                isLoading: false,
              });
              resolve();
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Failed to fetch location details';
              set({
                error: errorMessage,
                isLoading: false,
              });
              reject(error);
            }
          },
          (error) => {
            const errorMessage =
              error.code === 1
                ? 'Location permission denied'
                : error.code === 2
                ? 'Unable to retrieve location'
                : 'An error occurred while retrieving location';

            set({
              permissionDenied: error.code === 1,
              error: errorMessage,
              isLoading: false,
            });
            reject(new Error(errorMessage));
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000, 
          }
        );
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  // Set location details manually
  setLocationDetails: (details: LocationDetails) => {
    set({ locationDetails: details });
  },

  // Set city location with coordinates
  setCityLocation: (latitude: number, longitude: number, details: LocationDetails) => {
    latitude = round2(latitude);
    longitude = round2(longitude);
    writeLocCookie(latitude, longitude);
    set({
      source: 'manual',
      latitude,
      longitude,
      locationDetails: details,
    });
  },

  // Clear location data
  clearLocation: () => {
    writeLocCookie(null, null);
    set({
      source: null,
      latitude: null,
      longitude: null,
      locationDetails: null,
      error: null,
      hasPermission: false,
      permissionDenied: false,
    });
  },
}), {
  name: 'user-location',
  storage: createJSONStorage(() => localStorage),
  partialize: ({ source, latitude, longitude, locationDetails }) => ({ source, latitude, longitude, locationDetails }),
  // Re-mirror on load: the cookie can expire or be cleared while localStorage survives.
  onRehydrateStorage: () => (state) => {
    if (state?.latitude != null) writeLocCookie(state.latitude, state.longitude);
  },
}));

/** Non-hook access for selectors (e.g. subscribing to just the coords). */
export { useLocationStore };

export const useLocation = () => {
  return useLocationStore();
};
