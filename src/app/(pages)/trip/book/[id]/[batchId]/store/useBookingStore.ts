import { create } from 'zustand';
import { BookingStore } from '../components/types';

export const useBookingStore = create<BookingStore>((set) => ({
    // Reservation step
    guests: 1,
    selectedBatchId: '',
    selectedMeetingPoint: null,
    selectedAddOn: null,
    selectedAddOnIdx: null,
    selectedTravelOption: null,
    selectedTravelIdx: null,
    foodPreference: null,
    couponCode: '',
    referralCode: '',
    roomSharing: null,
    // Personal step
    personalDetails: null,
    // Pricing
    totalAmount: 0,
    // Setters
    setGuests: (guests) => set({ guests }),
    setSelectedBatchId: (selectedBatchId) => set({ selectedBatchId }),
    setSelectedMeetingPoint: (point, idx) => set({ selectedMeetingPoint: point, roomSharing: idx }),
    setSelectedAddOn: (addOn, idx) => set({ selectedAddOn: addOn, selectedAddOnIdx: idx, roomSharing: idx }),
    setSelectedTravelOption: (option, idx) => set({ selectedTravelOption: option, selectedTravelIdx: idx }),
    setFoodPreference: (foodPreference) => set({ foodPreference }),
    setCouponCode: (couponCode) => set({ couponCode }),
    setReferralCode: (referralCode) => set({ referralCode }),
    setRoomSharing: (roomSharing) => set({ roomSharing }),
    setPersonalDetails: (personalDetails) => set({ personalDetails }),
    setTotalAmount: (totalAmount) => set({ totalAmount }),
}));
