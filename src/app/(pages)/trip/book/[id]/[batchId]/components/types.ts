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
export interface PriceBreakdownItem {
    _id: string;
    label: string;
    pricePerPerson: number;
    total: number;
    quantity: number;
}

export interface TripDetails {
    title: string;
    tripImages: string;
    basePrice: number;
    serviceFee: number;
    discount: number;
    referralDiscount?: number;
    grandTotalWithoutFee: number;
    grandTotal: number;
    priceBreakdown?: PriceBreakdownItem[];
    selectedDateDetails: {
        startDate: string;
        startTime: string;
    };
    isCouponApplied: boolean;
    couponMessage?: string;
    couponIncompatibleWith?: string[];
    appliedCoupon?: {
        code: string;
        displayText: string;
    };
    isReferralApplied?: boolean;
    referralMessage?: string;
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
    couponCode?: string;
    referralCode?: string;
}

// Add-on item stored in booking
export interface AddOnItem {
    _id?: string;
    label: string;
    category: string;
    pricePerPerson: number;
    description?: string;
}

// Meeting point stored in booking
export interface MeetingPointItem {
    _id?: string;
    locationId: string;
    city: string;
    state: string;
    pickupPrice: number;
}

// Travel option / pricing tier stored in booking
export interface TravelOptionItem {
    _id?: string;
    label: string;
    pricePerPerson: number;
    description?: string;
}

// Personal details stored in booking
export interface PersonalDetailsItem {
    fullName: string;
    email: string;
    phone: string;
    travelerId?: string;
}

// Store interfaces
export interface BookingStore {
    // Booking
    bookingId: string | null;
    setBookingId: (bookingId: string | null) => void;
    // Reservation step
    guests: number;
    selectedBatchId: string;
    selectedMeetingPoint: MeetingPointItem | null;
    selectedAddOn: AddOnItem | null;
    selectedAddOnIdx: number | null;
    selectedExtraAddOn: AddOnItem | null;
    selectedExtraAddOnIdx: number | null;
    selectedTransportAddOn: AddOnItem | null;
    selectedTransportAddOnIdx: number | null;
    selectedActivityAddOn: AddOnItem | null;
    selectedActivityAddOnIdx: number | null;
    selectedTravelOption: TravelOptionItem | null;
    selectedTravelIdx: number | null;
    foodPreference: 'veg' | 'non-veg' | null;
    couponCode: string;
    referralCode: string;
    // Personal step
    personalDetails: PersonalDetailsItem | null;
    // Pricing
    totalAmount: number;
    // Setters
    setGuests: (guests: number) => void;
    setSelectedBatchId: (batchId: string) => void;
    setSelectedMeetingPoint: (point: MeetingPointItem | null, idx: number) => void;
    setSelectedAddOn: (addOn: AddOnItem | null, idx: number | null) => void;
    setSelectedExtraAddOn: (addOn: AddOnItem | null, idx: number | null) => void;
    setSelectedTransportAddOn: (addOn: AddOnItem | null, idx: number | null) => void;
    setSelectedActivityAddOn: (addOn: AddOnItem | null, idx: number | null) => void;
    setSelectedTravelOption: (option: TravelOptionItem | null, idx: number | null) => void;
    setFoodPreference: (pref: 'veg' | 'non-veg' | null) => void;
    setCouponCode: (code: string) => void;
    setReferralCode: (code: string) => void;
    setPersonalDetails: (details: PersonalDetailsItem) => void;
    setTotalAmount: (amount: number) => void;
    // Trip scoping & persistence
    storedTripId: string;
    setStoredTripId: (tripId: string) => void;
    reset: () => void;
    clearPersonalDetails: () => void;
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
    currentReferralCode: string;
    currentEmail: string;
    currentMeetingPointId: string;
    currentAddOnIds: string;
    currentTravelOptionId: string;
    fetchTripDetails: (tripId: string, batchId: string, guests: number, couponCode?: string, referralCode?: string, email?: string, meetingPointId?: string, addOnIds?: string[], travelOptionId?: string) => Promise<void>;
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