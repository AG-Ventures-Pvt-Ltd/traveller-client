import { useGetData } from "@/services/useGetData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { useSearchParams, useParams } from 'next/navigation';
import type { BookingCreationData, Coupon } from '../types';
import { useBookingFormStore } from "../hooks/useBookingFormStore";
import { useEffect } from "react";



const LoadExistingBookingDetails = () => {

    const searchParams = useSearchParams();

    const params = useParams();
    
    const tripId = params.id as string;
    const shortTripId = tripId.split('-').pop() || '';

    const bookingIdFromQuery = searchParams.get('bookingId');
    const bookingIdFromStorage = localStorage.getItem(`booking_${shortTripId}`);
    const existingBookingId = bookingIdFromQuery || bookingIdFromStorage;

    const { data: existingBookingData } = useGetData<BookingCreationData>(
        existingBookingId ? API_ENDPOINTS.BOOKINGS.GET_BOOKING_DETAILS_FOR_UPDATE(existingBookingId) : ''
    );

    // Fetch available discounts using email from existing booking so we can auto-apply the coupon
    const { data: availableDiscounts } = useGetData<Coupon[]>(
        existingBookingData?.email
            ? API_ENDPOINTS.DISCOUNTS.GET_AVAILABLE(shortTripId, existingBookingData.email)
            : '',
        { queryKey: ['discounts', shortTripId, existingBookingData?.email ?? ''] }
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
            setFullName,
            setEmail,
            setPhone,
            setAppliedCoupon,
        } = useBookingFormStore();

    useEffect(() => {
        if (existingBookingData && bookingOptions) {
            const bookingData = existingBookingData;

            setGuests(bookingData.numberOfPeople);
            
            if (bookingData.mealPreference) {
                setFoodPreference(bookingData.mealPreference);
            }

            // Set traveler details
            if (bookingData.fullName) {
                setFullName(bookingData.fullName);
            }
            if (bookingData.email) {
                setEmail(bookingData.email);
            }
            if (bookingData.phoneNumber) {
                setPhone(bookingData.phoneNumber.toString());
            }

            if (bookingData.travelOptionId && pricingTiers.length > 0) {
                const travelIdx = pricingTiers.findIndex(tier => tier._id === bookingData.travelOptionId);
                if (travelIdx !== -1) {
                    setSelectedTravelIdx(travelIdx);
                }
            }

            if (bookingData.meetingPointId && bookingOptions.meetingPoints.length > 0) {
                const meetingIdx = bookingOptions.meetingPoints.findIndex(point => point.locationId === bookingData.meetingPointId);
                if (meetingIdx !== -1) {
                    setSelectedMeetingPointIdx(meetingIdx);
                }
            }

            if (bookingData.addOnIds && bookingOptions.addOns.length > 0) {
                bookingData.addOnIds.forEach(addOnId => {
                    const addOnIdx = bookingOptions.addOns.findIndex(a => a._id === addOnId);
                    if (addOnIdx !== -1) {
                        const category = bookingOptions.addOns[addOnIdx].category;
                        if (category === 'room_upgrade') {
                            setSelectedAddOnIdx(addOnIdx);
                        } else if (category === 'bike_upgrade') {
                            setSelectedTransportAddOnIdx(addOnIdx);
                        } else if (category === 'others') {
                            setSelectedExtraAddOnIdx(addOnIdx);
                        } else if (category === 'extra_activity') {
                            setSelectedActivityAddOnIdx(addOnIdx);
                        }
                    }
                });
            }

            if (bookingData.referralCode) {
                setReferralInput(bookingData.referralCode);
            }
        }
    }, [existingBookingData, bookingOptions, pricingTiers, setGuests, setFoodPreference, setFullName, setEmail, setPhone, setSelectedTravelIdx, setSelectedMeetingPointIdx, setSelectedAddOnIdx, setSelectedExtraAddOnIdx, setSelectedTransportAddOnIdx, setSelectedActivityAddOnIdx, setReferralInput]);

    // Separate effect for coupon auto-apply — depends on availableDiscounts being loaded
    useEffect(() => {
        if (existingBookingData?.couponCode && availableDiscounts) {
            const coupon = availableDiscounts.find(
                c => c.code.toLowerCase() === existingBookingData.couponCode!.toLowerCase()
            );
            if (coupon) {
                setCouponInput(coupon.code);
                setAppliedCoupon(coupon);
            }
        }
    }, [existingBookingData?.couponCode, availableDiscounts, setCouponInput, setAppliedCoupon]);


    return <></>
}


export default LoadExistingBookingDetails