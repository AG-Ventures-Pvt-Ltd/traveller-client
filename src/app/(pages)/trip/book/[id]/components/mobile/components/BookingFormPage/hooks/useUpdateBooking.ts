import { useBookingFormStore } from './useBookingFormStore';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { validators } from '@/common/utils/formValidators';
import { useRouter, useSearchParams } from "next/navigation";


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
        couponInput,
        referralInput,
        fullName,
        email,
        phone,
        setErrors,
        setTouched,
        pricingTiers,
        addOns,
        meetingPoints,
    } = useBookingFormStore();

    const router = useRouter();
    const searchParams = useSearchParams();

    const updateBookingMutation = usePostData({
        url: existingBookingId ? API_ENDPOINTS.BOOKINGS.UPDATE_IN_BOOKING_FLOW(existingBookingId) : '',
        onSuccess: () => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("step", "review");
            router.push(`?${params.toString()}`);
        },
    });

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

        updateBookingMutation.mutate({
            email,
            fullName,
            phoneNumber: phone,
            batchId: params.get('batchId'),
            numberOfPeople: guests,
            couponCode: couponInput || undefined,
            referralCode: referralInput || undefined,
            travelOptionId: selectedTravelIdx !== null && pricingTiers[selectedTravelIdx] ? pricingTiers[selectedTravelIdx]._id : undefined,
            addOnIds,
            meetingPointId: meetingPoints[selectedMeetingPointIdx]?.locationId,
            mealPreference: foodPreference,
        });
    };

    return { handleUpdate, isLoading: updateBookingMutation.isPending };
}
