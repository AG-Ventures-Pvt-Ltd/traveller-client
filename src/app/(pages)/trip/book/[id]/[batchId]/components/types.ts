// Core data types
export interface TravelerData {
    fullName: string;
    gender: string;
    email: string;
    phone: string;
    governmentIdType?: string;
    governmentIdNumber?: string;
}

export interface ExistingTraveler {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    governmentIdType?: string;
    governmentIdNumber?: string;
}

export interface ExistingTravelersResponse {
    guestUsers: ExistingTraveler[];
    owner: ExistingTraveler;
}

export interface EmergencyContact {
    name: string;
    contactNumber: string;
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
    isCouponApplied: boolean;
    couponMessage?: string;
    appliedCoupon?: {
        code: string;
        displayText: string;
    };
    sharingPrice?: { additionalPricePerPerson: number; people: number }[];
    roomSharingCost?: number;
    roomSharingCostTotal?: number;
}

export interface BookingFlowParams {
    tripId: string;
    batchId: string;
    selectedTravelerIds: string[];
    emergencyContact: EmergencyContact;
    totalAmount: number;
    numberOfPeople: number;
}

// Store interfaces
export interface BookingStore {
    totalAmount: number;
    couponCode: string;
    roomSharing: number | null;
    setTotalAmount: (amount: number) => void;
    setCouponCode: (code: string) => void;
    setRoomSharing: (sharing: number | null) => void;
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
    currentRoomSharing: number | null;
    fetchTripDetails: (tripId: string, batchId: string, guests: number, couponCode?: string, roomSharing?: number | null) => Promise<void>;
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
    selectedTravelerIds: string[];
    onSelectedTravelersChange: (ids: string[]) => void;
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