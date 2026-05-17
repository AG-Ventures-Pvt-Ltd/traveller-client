import { create } from 'zustand';

interface BookingNavState {
    headerLabel: string;
    backAction: (() => void) | null;
    setHeaderLabel: (label: string) => void;
    setBackAction: (fn: (() => void) | null) => void;
}

export const useBookingNavStore = create<BookingNavState>((set) => ({
    headerLabel: 'Reserve your seat',
    backAction: null,
    setHeaderLabel: (label) => set({ headerLabel: label }),
    setBackAction: (fn) => set({ backAction: fn }),
}));
