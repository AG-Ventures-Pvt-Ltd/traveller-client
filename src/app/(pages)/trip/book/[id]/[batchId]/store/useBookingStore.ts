import { create } from 'zustand';
import { BookingStore } from '../components/types';

export const useBookingStore = create<BookingStore>((set) => ({
    totalAmount: 0,
    couponCode: '',
    roomSharing: null,
    referralCode: '',
    setTotalAmount: (amount) => set({ totalAmount: amount }),
    setCouponCode: (code) => set({ couponCode: code }),
    setRoomSharing: (sharing) => set({ roomSharing: sharing }),
    setReferralCode: (code) => set({ referralCode: code }),
}));
