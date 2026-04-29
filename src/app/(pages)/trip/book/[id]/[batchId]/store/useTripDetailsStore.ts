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
  currentReferralCode: '',
  currentEmail: '',
  currentMeetingPointId: '',
  currentAddOnIds: '',
  currentTravelOptionId: '',
};

export const useTripDetailsStore = create<TripDetailsState>((set, get) => ({
  ...initialState,

  fetchTripDetails: async (tripId: string, batchId: string, guests: number, couponCode: string = '', referralCode: string = '', email: string = '', meetingPointId: string = '', addOnIds: string[] = [], travelOptionId: string = '') => {
    const state = get();
    const addOnIdsStr = addOnIds.join(',');
    
    if (
      state.tripDetails &&
      state.currentTripId === tripId &&
      state.currentBatchId === batchId &&
      state.currentGuests === guests &&
      state.currentCouponCode === couponCode &&
      state.currentReferralCode === referralCode &&
      state.currentEmail === email &&
      state.currentMeetingPointId === meetingPointId &&
      state.currentAddOnIds === addOnIdsStr &&
      state.currentTravelOptionId === travelOptionId &&
      !state.error
    ) {
      return;
    }

    const isInitialLoad = !state.tripDetails;
    
    set({ 
      isLoading: isInitialLoad, 
      isRefetching: !isInitialLoad, 
      error: null,
    });

    try {
      let apiUrl = `api/client/v1/trips/details/${tripId}/booking?batchId=${batchId}&seats=${guests}`;
      if (couponCode) {
        apiUrl += `&couponCode=${encodeURIComponent(couponCode)}`;
      }
      if (referralCode) {
        apiUrl += `&referralCode=${encodeURIComponent(referralCode)}`;
      }
      if (email) {
        apiUrl += `&email=${encodeURIComponent(email)}`;
      }
      if (meetingPointId) {
        apiUrl += `&meetingPointId=${encodeURIComponent(meetingPointId)}`;
      }
      if (addOnIds.length > 0) {
        apiUrl += `&addOnIds=${addOnIds.map(encodeURIComponent).join(',')}`;
      }
      if (travelOptionId) {
        apiUrl += `&travelOptionId=${encodeURIComponent(travelOptionId)}`;
      }
      const response = await baseAPI.get(apiUrl);
      
      set({ 
        tripDetails: response.data.data,
        isLoading: false,
        isRefetching: false,
        error: null,
        currentTripId: tripId,
        currentBatchId: batchId,
        currentGuests: guests,
        currentCouponCode: couponCode,
        currentReferralCode: referralCode,
        currentEmail: email,
        currentMeetingPointId: meetingPointId,
        currentAddOnIds: addOnIdsStr,
        currentTravelOptionId: travelOptionId,
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
    const { currentTripId, currentBatchId, currentGuests, currentCouponCode, currentReferralCode, currentEmail, currentMeetingPointId, currentAddOnIds, currentTravelOptionId } = get();
    
    if (!currentTripId || !currentBatchId) {
      return;
    }
    
    set({ isRefetching: true, error: null });
    
    try {
      let apiUrl = `api/client/v1/trips/details/${currentTripId}/booking?batchId=${currentBatchId}&seats=${currentGuests}`;
      if (currentCouponCode) {
        apiUrl += `&couponCode=${encodeURIComponent(currentCouponCode)}`;
      }
      if (currentReferralCode) {
        apiUrl += `&referralCode=${encodeURIComponent(currentReferralCode)}`;
      }
      if (currentEmail) {
        apiUrl += `&email=${encodeURIComponent(currentEmail)}`;
      }
      if (currentMeetingPointId) {
        apiUrl += `&meetingPointId=${encodeURIComponent(currentMeetingPointId)}`;
      }
      if (currentAddOnIds) {
        apiUrl += `&addOnIds=${currentAddOnIds}`;
      }
      if (currentTravelOptionId) {
        apiUrl += `&travelOptionId=${encodeURIComponent(currentTravelOptionId)}`;
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
