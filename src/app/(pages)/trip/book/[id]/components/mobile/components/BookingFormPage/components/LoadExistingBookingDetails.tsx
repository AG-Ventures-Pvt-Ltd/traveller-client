import { useGetData } from "@/services/useGetData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { useSearchParams, useParams } from 'next/navigation';
import type { BookingDetails } from '../types';
import { useBookingFormStore } from "../hooks/useBookingFormStore";
import { useEffect } from "react";



const LoadExistingBookingDetails = () => {

    const searchParams = useSearchParams();

    const params = useParams();
    
    const tripId = params.id as string;

    const bookingIdFromQuery = searchParams.get('bookingId');
    const bookingIdFromStorage = localStorage.getItem(`booking_${tripId.split('-').pop()}`);
    const existingBookingId = bookingIdFromQuery || bookingIdFromStorage;

    const { data: existingBookingData } = useGetData<BookingDetails>(
        existingBookingId ? API_ENDPOINTS.BOOKINGS.DETAILS(existingBookingId) : ''
    );

    const {
            pricingTiers,
            bookingOptions,
            setSelectedTravelIdx,
            setGuests,
            setSelectedMeetingPointIdx,
            setSelectedAddOnIdx,
            setSelectedExtraAddOnIdx,
            setSelectedTransportAddOnIdx,
            setSelectedActivityAddOnIdx,
            setFoodPreference,
            setCouponInput,
            setReferralInput,
            // setFullName,
            // setEmail,
            // setPhone,
        } = useBookingFormStore();

    useEffect(() => {
        if (existingBookingData && bookingOptions) {

            setGuests(existingBookingData.numberOfPeople);
            
            if (existingBookingData.mealPreference) {
                setFoodPreference(existingBookingData.mealPreference);
            }

            if (existingBookingData.travelOption && pricingTiers.length > 0) {
                const travelIdx = pricingTiers.findIndex(tier => tier._id === existingBookingData.travelOption?._id);
                if (travelIdx !== -1) {
                    setSelectedTravelIdx(travelIdx);
                }
            }

            if (existingBookingData.meetingPoint && bookingOptions.meetingPoints.length > 0) {
                const meetingIdx = bookingOptions.meetingPoints.findIndex(point => point.locationId === existingBookingData.meetingPoint?.locationId);
                if (meetingIdx !== -1) {
                    setSelectedMeetingPointIdx(meetingIdx);
                }
            }

            if (existingBookingData.addOns && bookingOptions.addOns.length > 0) {
                existingBookingData.addOns.forEach(addOn => {
                    const addOnIdx = bookingOptions.addOns.findIndex(a => a._id === addOn._id);
                    if (addOnIdx !== -1) {
                        const category = addOn.category.toLowerCase();
                        if (category.includes('extra')) {
                            setSelectedExtraAddOnIdx(addOnIdx);
                        } else if (category.includes('transport')) {
                            setSelectedTransportAddOnIdx(addOnIdx);
                        } else if (category.includes('activity')) {
                            setSelectedActivityAddOnIdx(addOnIdx);
                        } else {
                            setSelectedAddOnIdx(addOnIdx);
                        }
                    }
                });
            }

            if (existingBookingData.couponCode) {
                setCouponInput(existingBookingData.couponCode);
            }
            if (existingBookingData.referralCode) {
                setReferralInput(existingBookingData.referralCode);
            }
        }
    }, [existingBookingData, bookingOptions, pricingTiers, setGuests, setFoodPreference, setSelectedTravelIdx, setSelectedMeetingPointIdx, setSelectedAddOnIdx, setSelectedExtraAddOnIdx, setSelectedTransportAddOnIdx, setSelectedActivityAddOnIdx, setCouponInput, setReferralInput]);


    return <></>
}


export default LoadExistingBookingDetails