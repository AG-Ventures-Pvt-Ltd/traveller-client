'use client'

import { logError } from "@/common/utils/logError";
import usePostData from "@/services/usePostData";
import { getData } from "@/services/baseApi";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { trackEvent, toGaItem, getGaIds } from "@/common/utils/analytics";
import { openRazorpay } from "../services/razorpay";
import { openCashfree } from "../services/cashfree";
import type { Order, PaymentType } from "../services/types";

interface ApiResponse {
  data: Order;
}

interface PaymentConfig {
  gateway: 'razorpay' | 'cashfree';
  razorpayKeyId?: string;
  cashfreeMode?: 'sandbox' | 'production';
}

interface PaymentPayload {
  bookingId: string;
}

interface WalletPaymentPayload {
  amount: number;
}

interface UsePaymentOptions {
  onWalletSuccess?: () => void;
}

export const usePayment = ({ onWalletSuccess }: UsePaymentOptions = {}) => {

  const router = useRouter()
  const params = useParams();
  const inFlight = useRef(false);
  const tripId = params?.id as string | undefined;

  const { mutateAsync: mutateBooking } = usePostData({
    url: API_ENDPOINTS.PAYMENTS.START,
    enableNotifications: false,
  });

  const { mutateAsync: mutateWallet } = usePostData({
    url: API_ENDPOINTS.PAYMENTS.WALLET_START,
    enableNotifications: false,
  });

  const onPaymentComplete = (paymentType: PaymentType, orderId: string) => {
    if (paymentType === 'wallet') {
      onWalletSuccess?.();
    } else {
      if (tripId) localStorage.removeItem(`booking_${tripId.split('-').pop()}`)
      router.push(`/trip/book/success?orderId=${orderId}`)
    }
  };

  const openPayment = async (order: Order, paymentType: PaymentType) => {
    if (paymentType === 'booking') {
      trackEvent('add_payment_info', {
        currency: 'INR',
        value: order.amount,
        payment_type: order.gateway,
        transaction_id: order.orderId,
        items: [toGaItem({ slug: tripId || '', price: order.amount })],
      });
    }

    const config = await getData<PaymentConfig>(API_ENDPOINTS.PAYMENTS.CONFIG);

    if (order.gateway === 'cashfree') {
      await openCashfree(order, paymentType, config.cashfreeMode || 'sandbox', onPaymentComplete);
    } else {
      openRazorpay(order, paymentType, config.razorpayKeyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY!, onPaymentComplete);
    }
  };

  const startPayment = async (payload: PaymentPayload) => {
    // A second click before the order comes back used to create a second order
    // and a second payment_initiated — which is why that event always came in pairs.
    if (inFlight.current) return;
    inFlight.current = true;
    try {
      // GA client/session id travel with the order so the server can attribute
      // the purchase it sends from the payment webhook to this same session.
      const { clientId, sessionId } = await getGaIds();

      const response = await mutateBooking({
        ...payload,
        ...(clientId && { gaClientId: clientId }),
        ...(sessionId && { gaSessionId: sessionId }),
      } as unknown as Record<string, unknown>) as ApiResponse;
      await openPayment(response.data, 'booking');
    } catch (error) {
      logError({
        error: (error as Error).message,
        location: "traveller-client/src/app/trip/book/[id]/hooks/usePayment.ts",
        when: "starting booking payment",
      });
    } finally {
      inFlight.current = false;
    }
  };

  const startWalletPayment = async (payload: WalletPaymentPayload) => {
    try {
      const response = await mutateWallet(payload as unknown as Record<string, unknown>) as ApiResponse;
      await openPayment(response.data, 'wallet');
    } catch (error) {
      logError({
        error: (error as Error).message,
        location: "traveller-client/src/app/trip/book/[id]/hooks/usePayment.ts",
        when: "starting wallet payment",
      });
    }
  };

  return { startPayment, startWalletPayment };
};
