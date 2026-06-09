'use client';

import { useEffect, useRef, useMemo } from 'react';
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
// import FoodPreferenceSection from './components/FoodPreferenceSection';
import DiscountsSection from './components/DiscountsSection';
import { ReservationSkeleton } from '../../BookingStepSkeletons';
import { useBookingFormStore } from './hooks/useBookingFormStore';
import type { BookingFormData, BookingOptionsResponse, Coupon } from './types';
import LoadExistingBookingDetails from './components/LoadExistingBookingDetails'
import { useSearchParams } from 'next/navigation';
import { useCreateBooking } from './hooks/useCreateBooking';
import { useUpdateBooking } from './hooks/useUpdateBooking';
import BookingBar from '@/app/(pages)/trip/common/ui/BookingBar';
import { useDevice } from '@/common/hooks/useDevice';
import { CurrencyInrIcon } from '@phosphor-icons/react';


export type { BookingFormData };

interface BookingFormPageProps {
    tripId: string;
    batchId: string;
    onContinue: (data: BookingFormData) => void;
    onViewCoupons?: (coupons: Coupon[]) => void;
}

export default function BookingFormPage({ tripId, batchId, onViewCoupons }: BookingFormPageProps) {

    const searchParams = useSearchParams();
    const { isMobile } = useDevice();


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
        guests,
        addOns,
        selectedAddOnIdx,
        selectedExtraAddOnIdx,
        selectedTransportAddOnIdx,
        selectedActivityAddOnIdx,
        appliedCoupon,
    } = useBookingFormStore();

    const { data: bookingOptionsData, isLoading: isBookingOptionsLoadingData } = useGetData<BookingOptionsResponse>(
        tripId ? API_ENDPOINTS.TRIPS.BOOKING_OPTIONS(tripId, batchId) : '',
        {
            queryKey: [tripId ? API_ENDPOINTS.TRIPS.BOOKING_OPTIONS(tripId, batchId) : ''],
            staleTime: 5 * 60 * 1000,
        }
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
    }, [bookingOptionsData, isBookingOptionsLoadingData, setBookingOptions, setIsBookingOptionsLoading]);

    // Default-select the first package option (single option already locked in the store)
    useEffect(() => {
        if (pricingTiers.length > 0 && selectedTravelIdx === null) {
            setSelectedTravelIdx(0);
        }
    }, [pricingTiers, selectedTravelIdx, setSelectedTravelIdx]);

    // Calculate total price based on all selected options
    const displayPrice = useMemo(() => {
        let totalPerPerson = 0;

        // Add base pricing tier price
        if (selectedTravelIdx !== null && pricingTiers[selectedTravelIdx]) {
            totalPerPerson += pricingTiers[selectedTravelIdx].pricePerPerson;
        }

        // Add selected add-ons
        if (selectedAddOnIdx !== null && addOns[selectedAddOnIdx]) {
            totalPerPerson += addOns[selectedAddOnIdx].pricePerPerson;
        }
        if (selectedExtraAddOnIdx !== null && addOns[selectedExtraAddOnIdx]) {
            totalPerPerson += addOns[selectedExtraAddOnIdx].pricePerPerson;
        }
        if (selectedTransportAddOnIdx !== null && addOns[selectedTransportAddOnIdx]) {
            totalPerPerson += addOns[selectedTransportAddOnIdx].pricePerPerson;
        }
        if (selectedActivityAddOnIdx !== null && addOns[selectedActivityAddOnIdx]) {
            totalPerPerson += addOns[selectedActivityAddOnIdx].pricePerPerson;
        }

        // Calculate total for all guests
        let total = totalPerPerson * guests;

        // Apply coupon discount
        if (appliedCoupon) {
            if (appliedCoupon.discountType === 'percentage') {
                const discountAmount = Math.min(
                    (total * appliedCoupon.discountValue) / 100,
                    appliedCoupon.maxDiscountAmount || Infinity
                );
                total -= discountAmount;
            } else {
                total -= appliedCoupon.discountValue;
            }
        }

        return Math.max(0, total);
    }, [selectedTravelIdx, pricingTiers, guests, addOns, selectedAddOnIdx, selectedExtraAddOnIdx, selectedTransportAddOnIdx, selectedActivityAddOnIdx, appliedCoupon]);

    const handleButtonClick = () => {
        if (existingBookingId) {
            handleUpdateRef.current();
        } else {
            handleContinueRef.current();
        }
    };

    if (isBookingOptionsLoading && !bookingOptions) {
        return <ReservationSkeleton />;
    }

    if (!isMobile) {
        return (
            <div className="flex gap-6 items-start pb-10">
                {/* Left: trip details & options */}
                <div className="flex-1 min-w-0 flex flex-col gap-4 mt-4">
                    <LoadExistingBookingDetails />
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
                    {/* <FoodPreferenceSection /> */}

                    <DiscountsSection
                        coupons={bookingOptions?.coupons}
                        onViewCoupons={onViewCoupons ? () => onViewCoupons(bookingOptions?.coupons ?? []) : undefined}
                    />
                </div>

                {/* Right: floating sticky trip overview + pricing */}
                <div className="w-[360px] shrink-0 sticky top-24">
                    <div className="flex flex-col gap-4">
                        <TripOverviewCard displayPrice={displayPrice} handleBookNowClick={() => handleButtonClick()}/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 pb-20 flex flex-col gap-4">
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
            {/* <FoodPreferenceSection /> */}

            <DiscountsSection
                coupons={bookingOptions?.coupons}
                onViewCoupons={onViewCoupons ? () => onViewCoupons(bookingOptions?.coupons ?? []) : undefined}
            />
            <BookingBar displayPrice={displayPrice} onBookNow={handleButtonClick} />
        </div>
    );
}

