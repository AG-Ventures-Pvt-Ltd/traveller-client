'use client'

import { load as loadCashfree } from "@cashfreepayments/cashfree-js";
import type { Order, PaymentType, OnPaymentComplete } from './types';

// Cashfree's checkout() promise resolves once the popup closes, regardless
// of outcome — same as Razorpay's `handler`, the real status is confirmed
// server-side via the webhook-driven /bookings/confirm on the success page.
export const openCashfree = async (
  order: Order,
  paymentType: PaymentType,
  cashfreeMode: 'sandbox' | 'production',
  onComplete: OnPaymentComplete,
) => {
  const cashfree = await loadCashfree({ mode: cashfreeMode });

  await cashfree.checkout({
    paymentSessionId: order.paymentSessionId!,
    redirectTarget: '_modal',
  });

  onComplete(paymentType, order.orderId);
};
