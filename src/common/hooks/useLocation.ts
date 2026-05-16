'use client';

import { create } from 'zustand';
import { baseAPI } from '@/services/baseApi';

export interface LocationDetails {
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  address?: string;
  timezone?: string;
}

export interface LocationState {
  // Location data
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

const useLocationStore = create<LocationState>((set) => ({
  // Initial state
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
            const { latitude, longitude } = position.coords;
            
            set({
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
    set({
      latitude,
      longitude,
      locationDetails: details,
    });
  },

  // Clear location data
  clearLocation: () => {
    set({
      latitude: null,
      longitude: null,
      locationDetails: null,
      error: null,
      hasPermission: false,
      permissionDenied: false,
    });
  },
}));

export const useLocation = () => {
  return useLocationStore();
};
