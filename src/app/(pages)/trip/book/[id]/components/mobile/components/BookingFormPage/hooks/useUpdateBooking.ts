import { useBookingFormStore } from './useBookingFormStore';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { validators } from '@/common/utils/formValidators';
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from '@/common/utils/notify';


export function useUpdateBooking(existingBookingId: string) {
    const {
        guests,
        selectedMeetingPointIdx,
        selectedAddOnIdx,
        selectedExtraAddOnIdx,
        selectedTransportAddOnIdx,
        selectedActivityAddOnIdx,
        selectedTravelIdx,
        foodPreference,
        appliedCoupon,
        referralInput,
        fullName,
        email,
        phone,
        setErrors,
        setTouched,
        pricingTiers,
        addOns,
        meetingPoints,
        serverSnapshot,
    } = useBookingFormStore();

    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const updateBookingMutation = usePostData({
        url: existingBookingId ? API_ENDPOINTS.BOOKINGS.UPDATE_IN_BOOKING_FLOW(existingBookingId) : '',
        enableNotifications : false, 
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.BOOKINGS.DETAILS(existingBookingId)] });

            queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.BOOKINGS.GET_BOOKING_DETAILS_FOR_UPDATE(existingBookingId)] });

            await queryClient.refetchQueries({
                queryKey: [API_ENDPOINTS.BOOKINGS.DETAILS(existingBookingId)],
            });
            
            const params = new URLSearchParams(searchParams.toString());
            params.set("step", "review");
            router.push(`?${params.toString()}`);
        },
    });

    const navigateToReview = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", "review");
        router.push(`?${params.toString()}`);
    };

    const handleUpdate = async () => {
        const newErrors: Record<string, string> = {
            fullName: validators.fullName(fullName) || '',
            email: validators.email(email) || '',
            phone: validators.phone(phone) || '',
        };
        setErrors(newErrors);
        setTouched({ fullName: true, email: true, phone: true });
        if (Object.values(newErrors).some(Boolean)) return;

        const params = new URLSearchParams(searchParams.toString());

        const addOnIds = [
            selectedAddOnIdx !== null && addOns[selectedAddOnIdx] ? addOns[selectedAddOnIdx]._id : null,
            selectedExtraAddOnIdx !== null && addOns[selectedExtraAddOnIdx] ? addOns[selectedExtraAddOnIdx]._id : null,
            selectedTransportAddOnIdx !== null && addOns[selectedTransportAddOnIdx] ? addOns[selectedTransportAddOnIdx]._id : null,
            selectedActivityAddOnIdx !== null && addOns[selectedActivityAddOnIdx] ? addOns[selectedActivityAddOnIdx]._id : null,
        ].filter((id): id is string => !!id);

        const travelOptionId = selectedTravelIdx !== null && pricingTiers[selectedTravelIdx]
            ? pricingTiers[selectedTravelIdx]._id
            : undefined;
        const meetingPointId = meetingPoints[selectedMeetingPointIdx]?.locationId;
        const couponCode = appliedCoupon?.code || null;

        // Skip API call if nothing changed since last server load
        if (serverSnapshot) {
            const snapshotAddOnIds = [...(serverSnapshot.addOnIds ?? [])].sort();
            const currentAddOnIds = [...addOnIds].sort();
            const addOnsUnchanged = snapshotAddOnIds.length === currentAddOnIds.length
                && snapshotAddOnIds.every((id, i) => id === currentAddOnIds[i]);

            const unchanged =
                serverSnapshot.numberOfPeople === guests &&
                serverSnapshot.fullName === fullName &&
                serverSnapshot.email === email &&
                String(serverSnapshot.phoneNumber) === phone &&
                serverSnapshot.batchId === (params.get('batchId') || '') &&
                (serverSnapshot.travelOptionId ?? '') === (travelOptionId ?? '') &&
                (serverSnapshot.meetingPointId ?? '') === (meetingPointId ?? '') &&
                (serverSnapshot.mealPreference ?? '') === (foodPreference ?? '') &&
                (serverSnapshot.couponCode ?? '') === (couponCode ?? '') &&
                (serverSnapshot.referralCode ?? '') === (referralInput ?? '') &&
                addOnsUnchanged;

            if (unchanged) {
                navigateToReview();
                return;
            }
        }

        updateBookingMutation.mutate({
            email,
            fullName,
            phoneNumber: phone,
            batchId: params.get('batchId'),
            numberOfPeople: guests,
            couponCode: couponCode || undefined,
            referralCode: referralInput || undefined,
            travelOptionId,
            addOnIds,
            meetingPointId,
            mealPreference: foodPreference,
        });
    };

    return { handleUpdate, isLoading: updateBookingMutation.isPending };
}
