export interface BatchMeetingPoint {
    _id?: string;
    locationId: string;
    city: string;
    state: string;
    pickupPrice: number;
}

export interface Batch {
    _id: string;
    startDateTime: string;
    meetingPoints: BatchMeetingPoint[];
    availableSeats: number;
}

export interface PricingTier {
    _id?: string;
    label: string;
    pricePerPerson: number;
    description?: string;
}

export interface AddOn {
    _id?: string;
    label: string;
    category: string;
    pricePerPerson: number;
    description?: string;
}

export interface Coupon {
    code: string;
    discountType: string;
    discountValue: number;
}

export interface BookingOptionsResponse {
    batches: Batch[];
    pricingTiers: PricingTier[];
    addOns: AddOn[];
    currency: string;
    coupons: Coupon[];
}

export interface BatchDetails {
    tripImage: string;
    title: string;
    tripLocation: string;
    hostName?: string;
    availableSeats: number;
    startDateTime: string;
    endDateTime?: string;
    duration?: number;
}

export interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
}

export interface BookingFormData {
    guests: number;
    selectedBatchId: string;
    travelOptionIndex: number | null;
    foodPreference: 'veg' | 'non-veg' | null;
    fullName: string;
    email: string;
    phone: string;
}
