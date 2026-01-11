'use client'

import { logError } from "@/common/utils/logError";
import usePostData from "@/services/usePostData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { useRouter } from "next/navigation";

interface Order {
  amount: number;
  orderId: string;
}

interface ApiResponse {
  data: Order;
}

interface PaymentPayload {
  userId: string;
  batchId: string;
  numberOfPeople: number;
  amount: number;
}

export const usePayment = () => {

  const router = useRouter()

  const { mutateAsync } = usePostData({ url: API_ENDPOINTS.BOOKINGS.START });

  const openRazorpay = (order: Order) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      amount: order.amount * 100,
      currency: "INR",
      order_id: order.orderId,
      name: "Wondrr Trips",
      description: 'Trip Booking Payment',
      theme: {
        color: '#121212',
      },
      handler: () => {
        router.push(`/trip/book/success?orderId=${order.orderId}`)
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const startPayment = async (payload: PaymentPayload) => {
    try {
      const response = await mutateAsync(payload as unknown as Record<string, unknown>) as ApiResponse;
      openRazorpay(response.data);
    } catch (error) {
      logError({
        error: (error as Error).message,
        location: "traveller-client/src/app/trip/book/[id]/hooks/usePayment.ts",
        when: "starting payment",
      });
    }
  };

  return { startPayment, openRazorpay };
};