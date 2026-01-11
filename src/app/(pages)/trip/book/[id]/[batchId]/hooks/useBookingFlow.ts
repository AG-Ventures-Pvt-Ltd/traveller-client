import { useState } from 'react';
import useS3Upload from '@/common/hooks/useS3Upload';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { notify } from '@/common/utils/notify';
import { baseAPI } from '@/services/baseApi';
import { usePayment } from './usePayment';
import { BookingFlowParams } from '../components/types';
/**
 * Custom hook to handle the complete booking flow
 * 
 * Flow:
 * 1. User clicks "Complete Booking" button
 * 2. Creates booking order in backend (parallel with step 3)
 * 3. Uploads government ID images to S3 (parallel with step 2)
 * 4. Once booking is created, adds travelers with S3 URLs
 * 5. Initiates Razorpay payment gateway
 * 6. On successful payment, redirects to confirmation page
 */

export const useBookingFlow = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const { uploadImages } = useS3Upload();
    const { openRazorpay } = usePayment();

    const initiateBooking = async ({
        batchId,
        travelers,
        emergencyContact,
        totalAmount,
        numberOfPeople,
    }: BookingFlowParams) => {
        setIsProcessing(true);

        try {
            const [bookingResponse, uploadResults] = await Promise.all([
                baseAPI.post(API_ENDPOINTS.BOOKINGS.START, {
                    batchId,
                    amount : totalAmount,
                    numberOfPeople,
                }),
                (async () => {
                    const filesToUpload = travelers
                        .filter(traveler => traveler.governmentId)
                        .map(traveler => traveler.governmentId!);

                    if (filesToUpload.length > 0) {
                        return await uploadImages(filesToUpload);
                    }
                    return [];
                })(),
            ]);

            const bookingId = bookingResponse?.data?.data?._id;
            
            if (!bookingId) {
                throw new Error('Failed to create booking');
            }

            const failedUploads = uploadResults.filter(result => !result.success);
            if (failedUploads.length > 0) {
                notify.error('Failed to upload some government IDs. Please try again.');
                setIsProcessing(false);
                return;
            }

            const usersWithUrls = travelers.map((traveler) => {
                let governmentIdUrl = null;
                
                if (traveler.governmentId) {
                    const uploadResult = uploadResults.find(
                        result => result.originalFile === traveler.governmentId
                    );
                    governmentIdUrl = uploadResult?.url || null;
                }

                return {
                    fullName: traveler.fullName,
                    gender: traveler.gender,
                    email: traveler.email,
                    phone: traveler.phone,
                    governmentId: governmentIdUrl,
                };
            });

            await baseAPI.post(API_ENDPOINTS.BOOKINGS.ADD_USERS(bookingId), {
                users: usersWithUrls,
                emergencyContact: {
                    name: emergencyContact.name,
                    phone: emergencyContact.phone,
                },
            });

            notify.success('Booking details saved! Proceeding to payment...');
            
            const orderId = bookingResponse?.data?.data?.orderId;
            
            if (!orderId) {
                throw new Error('Failed to get order ID for payment');
            }

            openRazorpay({
                amount: totalAmount,
                orderId: orderId,
            });
            setIsProcessing(false);

        } catch (error: unknown) {
            notify.error(error instanceof Error ? error.message : 'Booking failed. Please try again.');
            setIsProcessing(false);
        }
    };

    return {
        initiateBooking,
        isProcessing,
    };
};
