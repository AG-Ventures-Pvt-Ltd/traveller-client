import { create } from 'zustand';
import { baseAPI } from '@/services/baseApi';
import { TripDetailsState } from '../components/types';
import { notify } from '@/common/utils/notify';


const initialState = {
  tripDetails: null,
  isLoading: false,
  isRefetching: false,
  error: null,
  currentTripId: '',
  currentBatchId: '',
  currentGuests: 1,
  currentCouponCode: '',
  currentRoomSharing: null,
  currentReferralCode: '',
};

export const useTripDetailsStore = create<TripDetailsState>((set, get) => ({
  ...initialState,

  fetchTripDetails: async (tripId: string, batchId: string, guests: number, couponCode: string = '', roomSharing: number | null = null, referralCode: string = '') => {
    const state = get();
    
    if (
      state.tripDetails &&
      state.currentTripId === tripId &&
      state.currentBatchId === batchId &&
      state.currentGuests === guests &&
      state.currentCouponCode === couponCode &&
      state.currentRoomSharing === roomSharing &&
      state.currentReferralCode === referralCode &&
      !state.error
    ) {
      return;
    }

    const isInitialLoad = !state.tripDetails;
    
    set({ 
      isLoading: isInitialLoad, // Only show loading on initial load
      isRefetching: !isInitialLoad, // Set refetching for background updates
      error: null,
    });

    try {
      let apiUrl = `api/client/v1/trips/details/${tripId}/booking?batchId=${batchId}&seats=${guests}`;
      if (couponCode) {
        apiUrl += `&couponCode=${encodeURIComponent(couponCode)}`;
      }
      if (roomSharing !== null) {
        apiUrl += `&roomSharing=${roomSharing}`;
      }
      if (referralCode) {
        apiUrl += `&referralCode=${encodeURIComponent(referralCode)}`;
      }
      const response = await baseAPI.get(apiUrl);
      
      // Only update state on successful response
      set({ 
        tripDetails: response.data.data,
        isLoading: false,
        isRefetching: false,
        error: null,
        currentTripId: tripId,
        currentBatchId: batchId,
        currentGuests: guests,
        currentCouponCode: couponCode,
        currentRoomSharing: roomSharing,
        currentReferralCode: referralCode,
      });
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const errorMessage = axiosError?.response?.data?.message || (error instanceof Error ? error.message : 'Failed to fetch trip details');
      
      // Show error notification
      notify.error(errorMessage);
      
      // Keep previous state, only update loading flags
      set({ 
        isLoading: false,
        isRefetching: false,
        error: error instanceof Error ? error : new Error(errorMessage),
      });
    }
  },

  refetch: async () => {
    const { currentTripId, currentBatchId, currentGuests, currentCouponCode, currentRoomSharing, currentReferralCode } = get();
    
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
      if (currentRoomSharing !== null) {
        apiUrl += `&roomSharing=${currentRoomSharing}`;
      }
      if (currentReferralCode) {
        apiUrl += `&referralCode=${encodeURIComponent(currentReferralCode)}`;
      }
      const response = await baseAPI.get(apiUrl);
      
      set({ 
        tripDetails: response.data.data,
        isRefetching: false,
        error: null,
      });
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const errorMessage = axiosError?.response?.data?.message || (error instanceof Error ? error.message : 'Failed to fetch trip details');
      
      // Show error notification
      notify.error(errorMessage);
      
      // Keep previous state, only update loading flags
      set({ 
        isRefetching: false,
        error: error instanceof Error ? error : new Error(errorMessage),
      });
    }
  },

  reset: () => set(initialState),
}));
