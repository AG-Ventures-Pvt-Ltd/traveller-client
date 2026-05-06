
export interface BookingData {
    user: {
        fullName: string;
        email: string;
        phoneNumber: string;
    };
    trip: {
        title: string;
        hostName?: string;
        tripImage?: string;
        startDateTime: string;
        endDateTime: string;
        duration : string
    };
    booking: {
        numberOfPeople: number;
        mealPreference?: string;
        pricingTierSnapshot: {
            label: string;
            pricePerPerson: number;
        };
        addOns?: Array<{
            _id: string;
            label: string;
            pricePerPerson: number;
            quantity: number;
        }>;
        discounts?: Array<{
            type: string;
            label: string;
            amount: number;
            _id: string;
        }>;
        pricingSnapshot: {
            grandTotal: number;
        };
        meetingPoint : string;
    };
}
