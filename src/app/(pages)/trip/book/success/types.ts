export interface BookingDetails {
    tripTitle: string;
    bookingId: string;
    transactionId: string;
    startDate: string;
    startTime: string;
    numberOfPeople: string;
    meetingPoint: string;
    userEmail: string;
    grandTotal: string;
    bookingDate: string;
    method: string;
}

export interface BookingResponse {
    bookingStatus: 'success' | 'pending' | 'failed';
    paymentStatus: 'success' | 'pending' | 'failed';
    message?: string;
    bookingDetails: BookingDetails;
    
}

export type StatusType = 'success' | 'failed' | 'pending';

export interface PaymentDetailRow {
    label: string;
    value: string;
    valueClassName?: string;
}
