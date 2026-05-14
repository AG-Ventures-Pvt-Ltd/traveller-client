'use client'

import { logError } from "@/common/utils/logError";
import usePostData from "@/services/usePostData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface Order {
  amount: number;
  orderId: string;
}

interface ApiResponse {
  data: Order;
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
  const tripId = params?.id as string | undefined;

  const { mutateAsync: mutateBooking } = usePostData({
    url: API_ENDPOINTS.PAYMENTS.START,
    enableNotifications: false,
  });

  const { mutateAsync: mutateWallet } = usePostData({
    url: API_ENDPOINTS.PAYMENTS.WALLET_START,
    enableNotifications: false,
  });

  const openRazorpay = (order: Order, paymentType: 'booking' | 'wallet') => {
    const isWallet = paymentType === 'wallet';
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      amount: order.amount * 100,
      currency: "INR",
      order_id: order.orderId,
      name: "Wondrr Trips",
      description: isWallet ? 'Add Wondrr Cash' : 'Trip Booking Payment',
      theme: {
        color: '#121212',
      },
      handler: () => {
        if (isWallet) {
          onWalletSuccess?.()
        } else {
          if (tripId) localStorage.removeItem(`booking_${tripId.split('-').pop()}`)
          router.push(`/trip/book/success?orderId=${order.orderId}`)
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const startPayment = async (payload: PaymentPayload) => {
    try {
      const response = await mutateBooking(payload as unknown as Record<string, unknown>) as ApiResponse;
      openRazorpay(response.data, 'booking');
    } catch (error) {
      logError({
        error: (error as Error).message,
        location: "traveller-client/src/app/trip/book/[id]/hooks/usePayment.ts",
        when: "starting booking payment",
      });
    }
  };

  const startWalletPayment = async (payload: WalletPaymentPayload) => {
    try {
      const response = await mutateWallet(payload as unknown as Record<string, unknown>) as ApiResponse;
      openRazorpay(response.data, 'wallet');
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