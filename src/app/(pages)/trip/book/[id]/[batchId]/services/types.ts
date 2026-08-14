export type PaymentType = 'booking' | 'wallet';

export interface Order {
  amount: number;
  orderId: string;
  gateway?: 'razorpay' | 'cashfree';
  paymentSessionId?: string;
}

export type OnPaymentComplete = (paymentType: PaymentType, orderId: string) => void;
