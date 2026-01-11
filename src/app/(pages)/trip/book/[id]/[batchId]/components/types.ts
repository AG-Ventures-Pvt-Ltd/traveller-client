// Core data types
export interface TravelerData {
    fullName: string;
    gender: string;
    email: string;
    phone: string;
    governmentId?: File | null;
}

export interface EmergencyContact {
    name: string;
    phone: string;
}

// Trip and booking data types
export interface TripDetails {
    title: string;
    tripImages: string;
    basePrice: number;
    serviceFee: number;
    discount: number;
    grandTotalWithoutFee: number;
    grandTotal: number;
    selectedDateDetails: {
        startDate: string;
        startTime: string;
    };
}

export interface BookingFlowParams {
    tripId: string;
    batchId: string;
    travelers: TravelerData[];
    emergencyContact: EmergencyContact;
    totalAmount: number;
    numberOfPeople: number;
}

// Store interfaces
export interface BookingStore {
    totalAmount: number;
    couponCode: string;
    setTotalAmount: (amount: number) => void;
    setCouponCode: (code: string) => void;
}

export interface TripDetailsState {
    tripDetails: TripDetails | null;
    isLoading: boolean;
    isRefetching: boolean;
    error: Error | null;
    currentTripId: string;
    currentBatchId: string;
    currentGuests: number;
    currentCouponCode: string;
    fetchTripDetails: (tripId: string, batchId: string, guests: number, couponCode?: string) => Promise<void>;
    refetch: () => Promise<void>;
    reset: () => void;
}

// Component prop interfaces
export interface TravelerDetailsFormProps {
    guests: number;
    onGuestsChange: (guests: number) => void;
    tripId: string;
    batchId: string;
}

export interface TravelerDetailsProps {
    travelers: TravelerData[];
    onTravelersChange: (updater: TravelerData[] | ((prev: TravelerData[]) => TravelerData[])) => void;
    guests: number;
    onGuestsChange: (guests: number) => void;
    onNext: () => void;
}

export interface ContactDetailsProps {
    travelerIndex: number;
    isPrimary?: boolean;
    data: TravelerData;
    onChange: (data: TravelerData) => void;
}

export interface ContactInformationProps {
    emergencyContact: EmergencyContact;
    onChange: (data: EmergencyContact) => void;
    onNext: () => void;
}

export interface ReviewAndPayProps {
    totalAmount: number;
    onComplete: () => void;
    tripId: string;
    isSubmitting?: boolean;
}

export interface OrderSummaryProps {
    tripId: string;
    batchId: string;
    guests?: number;
}