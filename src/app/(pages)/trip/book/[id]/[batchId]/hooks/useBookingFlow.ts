import { useState, useRef } from 'react';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { notify } from '@/common/utils/notify';
import { usePayment } from './usePayment';
import { BookingFlowParams } from '../components/types';
import { useSession } from 'next-auth/react';
import usePostData from '@/services/usePostData';


export const useBookingFlow = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const { openRazorpay } = usePayment();
    const { data: session } = useSession();

    const bookingContextRef = useRef<{
        batchId: string;
        numberOfPeople: number;
        couponCode?: string;
        referralCode?: string;
    } | null>(null);

    const { mutate: createPaymentOrder } = usePostData({
        url: API_ENDPOINTS.PAYMENTS.START,
        onSuccess: (response: { data: { orderId: string, totalAmount: number } }) => {
            const orderId = response?.data?.orderId;

            if (!orderId) {
                notify.error('Failed to get order ID for payment');
                setIsProcessing(false);
                return;
            }
            openRazorpay({
                amount: response?.data?.totalAmount,
                orderId: orderId,
            });
            setIsProcessing(false);
        },
        onError: () => {
            setIsProcessing(false);
        },
    });

    const { mutate: startBooking } = usePostData({
        url: API_ENDPOINTS.BOOKINGS.START,
        onSuccess: (response: { data: { _id: string } }) => {
            const bookingId = response?.data?._id;

            if (!bookingId) {
                notify.error('Failed to create booking');
                setIsProcessing(false);
                return;
            }

            notify.success('Booking details saved! Proceeding to payment...');

            const context = bookingContextRef.current;
            if (!context) {
                notify.error('Booking context lost');
                setIsProcessing(false);
                return;
            }

            const paymentPayload: {
                batchId: string;
                numberOfPeople: number;
                bookingId: string;
                couponCode?: string;
                referralCode?: string;
            } = {
                batchId: context.batchId,
                numberOfPeople: context.numberOfPeople,
                bookingId,
                ...(context.couponCode && { couponCode: context.couponCode }),
                ...(context.referralCode && { referralCode: context.referralCode }),
            };

            createPaymentOrder(paymentPayload);
        },
        onError: () => {
            setIsProcessing(false);
        },
    });

    const initiateBooking = async ({
        batchId,
        selectedTravelerIds,
        numberOfPeople,
        couponCode,
        referralCode,
    }: BookingFlowParams) => {
        setIsProcessing(true);

        bookingContextRef.current = {
            batchId,
            numberOfPeople,
            couponCode,
            referralCode,
        };

        const userId = session?.user?.id;
        const hasSelf = userId && selectedTravelerIds.includes(userId);

        const additionalGuests = hasSelf
            ? selectedTravelerIds.filter(id => id !== userId)
            : selectedTravelerIds;

        startBooking({
            batchId,
            numberOfPeople,
            additionalGuests,
            hasSelf,
            ...(couponCode && { couponCode }),
            ...(referralCode && { referralCode }),
        });
    };

    return {
        initiateBooking,
        isProcessing,
    };
};
