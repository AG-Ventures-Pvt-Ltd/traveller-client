import { create } from 'zustand';
import { baseAPI } from '@/services/baseApi';
import { TripDetailsState } from '../components/types';


const initialState = {
  tripDetails: null,
  isLoading: false,
  isRefetching: false,
  error: null,
  currentTripId: '',
  currentBatchId: '',
  currentGuests: 1,
  currentCouponCode: '',
};

export const useTripDetailsStore = create<TripDetailsState>((set, get) => ({
  ...initialState,

  fetchTripDetails: async (tripId: string, batchId: string, guests: number, couponCode: string = '') => {
    const state = get();
    
    if (
      state.tripDetails &&
      state.currentTripId === tripId &&
      state.currentBatchId === batchId &&
      state.currentGuests === guests &&
      state.currentCouponCode === couponCode &&
      !state.error
    ) {
      return;
    }

    const isInitialLoad = !state.tripDetails;
    
    set({ 
      isLoading: isInitialLoad, // Only show loading on initial load
      isRefetching: !isInitialLoad, // Set refetching for background updates
      error: null,
      currentTripId: tripId,
      currentBatchId: batchId,
      currentGuests: guests,
      currentCouponCode: couponCode,
    });

    try {
      let apiUrl = `api/client/v1/trips/details/${tripId}/booking?batchId=${batchId}&seats=${guests}`;
      if (couponCode) {
        apiUrl += `&couponCode=${encodeURIComponent(couponCode)}`;
      }
      const response = await baseAPI.get(apiUrl);
      
      set({ 
        tripDetails: response.data.data,
        isLoading: false,
        isRefetching: false,
        error: null,
      });
    } catch (error) {
      set({ 
        tripDetails: null,
        isLoading: false,
        isRefetching: false,
        error: error instanceof Error ? error : new Error('Failed to fetch trip details'),
      });
    }
  },

  refetch: async () => {
    const { currentTripId, currentBatchId, currentGuests, currentCouponCode } = get();
    
    if (!currentTripId || !currentBatchId) {
      return;
    }
    
    // Background refetch without clearing existing data
    set({ isRefetching: true, error: null });
    
    try {
      let apiUrl = `api/client/v1/trips/details/${currentTripId}/booking?batchId=${currentBatchId}&seats=${currentGuests}`;
      if (currentCouponCode) {
        apiUrl += `&couponCode=${encodeURIComponent(currentCouponCode)}`;
      }
      const response = await baseAPI.get(apiUrl);
      
      set({ 
        tripDetails: response.data.data,
        isRefetching: false,
        error: null,
      });
    } catch (error) {
      set({ 
        isRefetching: false,
        error: error instanceof Error ? error : new Error('Failed to fetch trip details'),
      });
    }
  },

  reset: () => set(initialState),
}));
