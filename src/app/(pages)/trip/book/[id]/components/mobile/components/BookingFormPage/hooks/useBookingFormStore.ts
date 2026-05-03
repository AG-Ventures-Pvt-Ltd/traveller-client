import { create } from 'zustand';
import type { BookingOptionsResponse, BatchDetails } from '../types';

interface BookingFormState {
    // Reservation state
    guests: number;
    selectedBatchId: string;
    selectedMeetingPointIdx: number;
    selectedAddOnIdx: number | null;
    selectedExtraAddOnIdx: number | null;
    selectedTransportAddOnIdx: number | null;
    selectedActivityAddOnIdx: number | null;
    selectedTravelIdx: number | null;
    travelInfoIdx: number | null;
    foodPreference: 'veg' | 'non-veg' | null;
    couponInput: string;
    referralInput: string;

    // Personal details state
    fullName: string;
    email: string;
    phone: string;
    errors: Record<string, string>;
    touched: Record<string, boolean>;

    // Data
    bookingOptions: BookingOptionsResponse | undefined;
    batchDetails: BatchDetails | undefined;
    isBookingOptionsLoading: boolean;

    // Derived data
    batches: any[];
    pricingTiers: any[];
    addOns: any[];
    selectedBatch: any;
    meetingPoints: any[];

    // Setters
    setGuests: (guests: number) => void;
    setSelectedBatchId: (id: string) => void;
    setSelectedMeetingPointIdx: (idx: number) => void;
    setSelectedAddOnIdx: (idx: number | null) => void;
    setSelectedExtraAddOnIdx: (idx: number | null) => void;
    setSelectedTransportAddOnIdx: (idx: number | null) => void;
    setSelectedActivityAddOnIdx: (idx: number | null) => void;
    setSelectedTravelIdx: (idx: number | null) => void;
    setTravelInfoIdx: (idx: number | null) => void;
    setFoodPreference: (pref: 'veg' | 'non-veg' | null) => void;
    setCouponInput: (code: string) => void;
    setReferralInput: (code: string) => void;
    setFullName: (name: string) => void;
    setEmail: (email: string) => void;
    setPhone: (phone: string) => void;
    setErrors: (errors: Record<string, string>) => void;
    setTouched: (touched: Record<string, boolean>) => void;
    setBookingOptions: (options: BookingOptionsResponse | undefined) => void;
    setIsBookingOptionsLoading: (loading: boolean) => void;
    reset: () => void;
}

const initialState = {
    guests: 1,
    selectedBatchId: '',
    selectedMeetingPointIdx: 0,
    selectedAddOnIdx: null,
    selectedExtraAddOnIdx: null,
    selectedTransportAddOnIdx: null,
    selectedActivityAddOnIdx: null,
    selectedTravelIdx: null,
    travelInfoIdx: null,
    foodPreference: null,
    couponInput: '',
    referralInput: '',
    fullName: '',
    email: '',
    phone: '',
    errors: {},
    touched: {},
    bookingOptions: undefined,
    batchDetails: undefined,
    isBookingOptionsLoading: true,
    batches: [],
    pricingTiers: [],
    addOns: [],
    selectedBatch: null,
    meetingPoints: [],
};

export const useBookingFormStore = create<BookingFormState>((set, get) => ({
    ...initialState,

    setGuests: (guests) => set({ guests }),
    setSelectedBatchId: (selectedBatchId) => set({ selectedBatchId }),
    setSelectedMeetingPointIdx: (selectedMeetingPointIdx) => set({ selectedMeetingPointIdx }),
    setSelectedAddOnIdx: (selectedAddOnIdx) => set({ selectedAddOnIdx }),
    setSelectedExtraAddOnIdx: (selectedExtraAddOnIdx) => set({ selectedExtraAddOnIdx }),
    setSelectedTransportAddOnIdx: (selectedTransportAddOnIdx) => set({ selectedTransportAddOnIdx }),
    setSelectedActivityAddOnIdx: (selectedActivityAddOnIdx) => set({ selectedActivityAddOnIdx }),
    setSelectedTravelIdx: (selectedTravelIdx) => set({ selectedTravelIdx }),
    setTravelInfoIdx: (travelInfoIdx) => set({ travelInfoIdx }),
    setFoodPreference: (foodPreference) => set({ foodPreference }),
    setCouponInput: (couponInput) => set({ couponInput }),
    setReferralInput: (referralInput) => set({ referralInput }),
    setFullName: (fullName) => set({ fullName }),
    setEmail: (email) => set({ email }),
    setPhone: (phone) => set({ phone }),
    setErrors: (errors) => set({ errors }),
    setTouched: (touched) => set({ touched }),
    setBookingOptions: (bookingOptions) => set((state) => {
        const pricingTiers = bookingOptions?.pricingTiers || [];
        return {
            bookingOptions,
            batches: bookingOptions?.batches || [],
            pricingTiers,
            addOns: bookingOptions?.addOns || [],
            selectedBatch: (bookingOptions?.batches || []).find(b => b._id === state.selectedBatchId) || (bookingOptions?.batches || [])[0],
            meetingPoints: bookingOptions?.meetingPoints || [],
            batchDetails: bookingOptions?.batchDetails,
            selectedTravelIdx: pricingTiers.length === 1 ? 0 : state.selectedTravelIdx,
        };
    }),
    setIsBookingOptionsLoading: (isBookingOptionsLoading) => set({ isBookingOptionsLoading }),
    reset: () => set(initialState),
}));