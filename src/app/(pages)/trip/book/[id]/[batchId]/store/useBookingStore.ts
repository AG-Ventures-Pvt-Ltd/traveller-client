import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BookingStore } from '../components/types';

const defaultBookingState = {
    guests: 1,
    selectedBatchId: '',
    selectedMeetingPoint: null,
    selectedAddOn: null,
    selectedAddOnIdx: null,
    selectedExtraAddOn: null,
    selectedExtraAddOnIdx: null,
    selectedTransportAddOn: null,
    selectedTransportAddOnIdx: null,
    selectedActivityAddOn: null,
    selectedActivityAddOnIdx: null,
    selectedTravelOption: null,
    selectedTravelIdx: null,
    foodPreference: null,
    couponCode: '',
    referralCode: '',
    personalDetails: null,
    totalAmount: 0,
    storedTripId: '',
};

export const useBookingStore = create<BookingStore>()(
    persist(
        (set) => ({
            ...defaultBookingState,
            // Setters
            setGuests: (guests) => set({ guests }),
            setSelectedBatchId: (selectedBatchId) => set({ selectedBatchId }),
            setSelectedMeetingPoint: (point, idx) => set({ selectedMeetingPoint: point }),
            setSelectedAddOn: (addOn, idx) => set({ selectedAddOn: addOn, selectedAddOnIdx: idx }),
            setSelectedExtraAddOn: (addOn, idx) => set({ selectedExtraAddOn: addOn, selectedExtraAddOnIdx: idx }),
            setSelectedTransportAddOn: (addOn, idx) => set({ selectedTransportAddOn: addOn, selectedTransportAddOnIdx: idx }),
            setSelectedActivityAddOn: (addOn, idx) => set({ selectedActivityAddOn: addOn, selectedActivityAddOnIdx: idx }),
            setSelectedTravelOption: (option, idx) => set({ selectedTravelOption: option, selectedTravelIdx: idx }),
            setFoodPreference: (foodPreference) => set({ foodPreference }),
            setCouponCode: (couponCode) => set({ couponCode }),
            setReferralCode: (referralCode) => set({ referralCode }),
            setPersonalDetails: (personalDetails) => set({ personalDetails }),
            setTotalAmount: (totalAmount) => set({ totalAmount }),
            setStoredTripId: (storedTripId) => set({ storedTripId }),
            reset: () => set(defaultBookingState),
        }),
        {
            name: 'ag-booking-state',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                guests: state.guests,
                selectedBatchId: state.selectedBatchId,
                selectedMeetingPoint: state.selectedMeetingPoint,
                selectedAddOn: state.selectedAddOn,
                selectedAddOnIdx: state.selectedAddOnIdx,
                selectedExtraAddOn: state.selectedExtraAddOn,
                selectedExtraAddOnIdx: state.selectedExtraAddOnIdx,
                selectedTransportAddOn: state.selectedTransportAddOn,
                selectedTransportAddOnIdx: state.selectedTransportAddOnIdx,
                selectedActivityAddOn: state.selectedActivityAddOn,
                selectedActivityAddOnIdx: state.selectedActivityAddOnIdx,
                selectedTravelOption: state.selectedTravelOption,
                selectedTravelIdx: state.selectedTravelIdx,
                foodPreference: state.foodPreference,
                couponCode: state.couponCode,
                referralCode: state.referralCode,
                personalDetails: state.personalDetails,
                storedTripId: state.storedTripId,
            }),
        }
    )
);
