import { useState } from 'react';
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

    const { mutate: startBooking } = usePostData({
        url: API_ENDPOINTS.BOOKINGS.START,
        onSuccess: (response : { data : { _id : string , orderId : string, amount : number }}) => {
            const bookingId = response?.data?._id;
            const orderId = response?.data?.orderId;

            if (!bookingId) {
                notify.error('Failed to create booking');
                setIsProcessing(false);
                return;
            }
            notify.success('Booking details saved! Proceeding to payment...');
            if (!orderId) {
                notify.error('Failed to get order ID for payment');
                setIsProcessing(false);
                return;
            }
            openRazorpay({
                amount: response?.data?.amount * 100,
                orderId: orderId,
            });
            setIsProcessing(false);
        },
        onError: () => {
            setIsProcessing(false);
        },
    });

    const initiateBooking = async ({
        batchId,
        selectedTravelerIds,
        totalAmount,
        numberOfPeople,
    }: BookingFlowParams) => {
        setIsProcessing(true);

        const userId = session?.user?.id;
        const hasSelf = userId && selectedTravelerIds.includes(userId);
        
        const additionalGuests = hasSelf 
            ? selectedTravelerIds.filter(id => id !== userId)
            : selectedTravelerIds;

        startBooking({
            batchId,
            amount: totalAmount,
            numberOfPeople,
            additionalGuests,
            hasSelf,
        });
    };

    return {
        initiateBooking,
        isProcessing,
    };
};
