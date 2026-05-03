'use client';

import { useEffect, useRef } from 'react';
import TravelOptionsList from '@/app/(pages)/trip/common/ui/TravelOptionsList';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import TripOverviewCard from './components/TripOverviewCard';
import TravelerDetailsCard from './components/TravelerDetailsCard';
import StayOptionsSection from './components/StayOptionsSection';
import ExtraAddOnsSection from './components/ExtraAddOnsSection';
import TransportOptionsSection from './components/TransportOptionsSection';
import ActivityAddOnsSection from './components/ActivityAddOnsSection';
import FoodPreferenceSection from './components/FoodPreferenceSection';
import DiscountsSection from './components/DiscountsSection';
import { ReservationSkeleton } from '../../BookingStepSkeletons';
import { useBookingFormStore } from './hooks/useBookingFormStore';
import type { BookingFormData, BookingOptionsResponse, Coupon } from './types';
import LoadExistingBookingDetails from './components/LoadExistingBookingDetails'
import { useBookingNavStore } from '../../../../[batchId]/store/useBookingNavStore';
import { useSearchParams } from 'next/navigation';
import { useCreateBooking } from './hooks/useCreateBooking';
import { useUpdateBooking } from './hooks/useUpdateBooking';


export type { BookingFormData };

interface BookingFormPageProps {
    tripId: string;
    batchId: string;
    onContinue: (data: BookingFormData) => void;
    onViewCoupons?: (coupons: Coupon[]) => void;
}

export default function BookingFormPage({ tripId, batchId, onViewCoupons }: BookingFormPageProps) {

    const searchParams = useSearchParams();
    

    const bookingIdFromQuery = searchParams.get('bookingId');
    const bookingIdFromStorage = typeof window !== 'undefined' ? localStorage.getItem(`booking_${tripId.split('-').pop()}`) : null;
    const existingBookingId = bookingIdFromQuery || bookingIdFromStorage;

    const {
        isBookingOptionsLoading,
        pricingTiers,
        bookingOptions,
        selectedTravelIdx,
        setBookingOptions,
        setIsBookingOptionsLoading,
        setSelectedTravelIdx,
    } = useBookingFormStore();

    const { setContinueAction } = useBookingNavStore()

    const { data: bookingOptionsData, isLoading: isBookingOptionsLoadingData } = useGetData<BookingOptionsResponse>(
        tripId ? API_ENDPOINTS.TRIPS.BOOKING_OPTIONS(tripId, batchId) : ''
    );

    const { handleContinue } = useCreateBooking(tripId)
    const { handleUpdate } = useUpdateBooking(existingBookingId || '')

    // Keep a ref to always call the latest handleContinue without it being a useEffect dependency
    const handleContinueRef = useRef(handleContinue);
    handleContinueRef.current = handleContinue;

    const handleUpdateRef = useRef(handleUpdate);
    handleUpdateRef.current = handleUpdate;

    useEffect(() => {
        setBookingOptions(bookingOptionsData);
        setIsBookingOptionsLoading(isBookingOptionsLoadingData);
    }, [bookingOptionsData, isBookingOptionsLoadingData]);

    useEffect(() => {
        if (existingBookingId) {
            setContinueAction(() => handleUpdateRef.current());
        } else {
            setContinueAction(() => handleContinueRef.current());
        }
    }, [existingBookingId, setContinueAction]);

    if (isBookingOptionsLoading && !bookingOptions) {
        return <ReservationSkeleton />;
    }

    return (
        <div className="px-4 pb-4 flex flex-col gap-4">
            <LoadExistingBookingDetails />
            <TripOverviewCard />
            <TravelerDetailsCard />

            {pricingTiers.length > 0 && (
                <CollapsibleCard
                    title="Package Options"
                    overflow="visible"
                >
                    <div className="px-4 pb-4">
                        <TravelOptionsList
                            items={pricingTiers}
                            selectedIndex={selectedTravelIdx}
                            onSelect={(idx) => {
                                setSelectedTravelIdx(idx);
                            }}
                        />
                    </div>
                </CollapsibleCard>
            )}
            <StayOptionsSection />
            <TransportOptionsSection />
            <ActivityAddOnsSection />
            <ExtraAddOnsSection />
            <FoodPreferenceSection />

            <DiscountsSection
                coupons={bookingOptions?.coupons}
                onViewCoupons={onViewCoupons ? () => onViewCoupons(bookingOptions?.coupons ?? []) : undefined}
            />
        </div>
    );
}

