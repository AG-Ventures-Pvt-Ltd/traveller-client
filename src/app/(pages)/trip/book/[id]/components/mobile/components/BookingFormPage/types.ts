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
    meetingPoints: BatchMeetingPoint[];
    batchDetails: BatchDetails;
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

export interface BookingDetails {
    _id: string;
    numberOfPeople: number;
    mealPreference?: 'veg' | 'non-veg';
    travelOption?: { _id: string; label: string; pricePerPerson: number };
    meetingPoint?: BatchMeetingPoint;
    addOns?: Array<{ _id: string; category: string; label: string; pricePerPerson: number }>;
    couponCode?: string;
    referralCode?: string;
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
    bookingId?: string;
}
