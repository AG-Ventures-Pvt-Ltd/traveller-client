'use client'

import type { Order, PaymentType, OnPaymentComplete } from './types';

export const openRazorpay = (
  order: Order,
  paymentType: PaymentType,
  razorpayKeyId: string,
  onComplete: OnPaymentComplete,
) => {
  const options = {
    key: razorpayKeyId,
    amount: order.amount * 100,
    currency: "INR",
    order_id: order.orderId,
    name: "Wondrr Trips",
    description: paymentType === 'wallet' ? 'Add Wondrr Cash' : 'Trip Booking Payment',
    theme: {
      color: '#121212',
    },
    handler: () => onComplete(paymentType, order.orderId),
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};
