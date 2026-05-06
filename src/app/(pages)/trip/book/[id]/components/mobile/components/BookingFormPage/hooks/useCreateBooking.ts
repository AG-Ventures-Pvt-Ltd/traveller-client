import { useBookingFormStore } from './useBookingFormStore';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { validators } from '@/common/utils/formValidators';
import { useRouter, useSearchParams } from "next/navigation";


export function useCreateBooking(tripId: string) {
    const {
        guests,
        selectedBatchId,
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
    } = useBookingFormStore();

    const router = useRouter();
    const searchParams = useSearchParams();

    const params = new URLSearchParams(searchParams.toString());

    const createBookingMutation = usePostData<{ data: { bookingId: string } }>({
        url: API_ENDPOINTS.BOOKINGS.START,
        onSuccess: (data) => {
            const newBookingId: string = data?.data?.bookingId;

            localStorage.setItem(`booking_${tripId}`, newBookingId);

            params.set("bookingId", newBookingId); 
            params.set("step", "review"); 

            router.push(`?${params.toString()}`);
        },
    });

    const handleContinue = async () => {
        const newErrors: Record<string, string> = {
            fullName: validators.fullName(fullName) || '',
            email: validators.email(email) || '',
            phone: validators.phone(phone) || '',
        };
        setErrors(newErrors);
        setTouched({ fullName: true, email: true, phone: true });
        if (Object.values(newErrors).some(Boolean)) return;

        const addOnIds = [
            selectedAddOnIdx !== null && addOns[selectedAddOnIdx] ? addOns[selectedAddOnIdx]._id : null,
            selectedExtraAddOnIdx !== null && addOns[selectedExtraAddOnIdx] ? addOns[selectedExtraAddOnIdx]._id : null,
            selectedTransportAddOnIdx !== null && addOns[selectedTransportAddOnIdx] ? addOns[selectedTransportAddOnIdx]._id : null,
            selectedActivityAddOnIdx !== null && addOns[selectedActivityAddOnIdx] ? addOns[selectedActivityAddOnIdx]._id : null,
        ].filter((id): id is string => !!id);

        createBookingMutation.mutate({
            email,
            fullName,
            phoneNumber: phone,
            batchId: params.get('batchId'),
            numberOfPeople: guests,
            couponCode: appliedCoupon?.code || undefined,
            referralCode: referralInput || undefined,
            travelOptionId: selectedTravelIdx !== null && pricingTiers[selectedTravelIdx] ? pricingTiers[selectedTravelIdx]._id : undefined,
            addOnIds,
            meetingPointId: meetingPoints[selectedMeetingPointIdx]?.locationId,
            mealPreference: foodPreference,
        });

    };

    return { handleContinue, isLoading: createBookingMutation.isPending };
}