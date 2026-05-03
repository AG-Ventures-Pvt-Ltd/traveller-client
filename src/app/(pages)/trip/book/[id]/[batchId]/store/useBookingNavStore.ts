import { create } from 'zustand';

interface BookingNavState {
    headerLabel: string;
    buttonLabel: string;
    continueAction: (() => void) | null;
    backAction: (() => void) | null;
    setHeaderLabel: (label: string) => void;
    setButtonLabel: (label: string) => void;
    setContinueAction: (fn: (() => void) | null) => void;
    setBackAction: (fn: (() => void) | null) => void;
}

export const useBookingNavStore = create<BookingNavState>((set) => ({
    headerLabel: 'Reserve your seat',
    buttonLabel: 'Continue',
    continueAction: null,
    backAction: null,
    setHeaderLabel: (label) => set({ headerLabel: label }),
    setButtonLabel: (label) => set({ buttonLabel: label }),
    setContinueAction: (fn) => set({ continueAction: fn }),
    setBackAction: (fn) => set({ backAction: fn }),
}));
