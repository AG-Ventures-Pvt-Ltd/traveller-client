'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import TravelOptionsList from '@/app/(pages)/trip/common/ui/TravelOptionsList';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { useBookingStore } from '../../../[batchId]/store/useBookingStore';
import { useBookingNavStore } from '../../../[batchId]/store/useBookingNavStore';
import { validators } from '@/common/utils/formValidators';
import TripOverviewCard from '../sections/TripOverviewCard';
import TravelerDetailsCard from '../sections/TravelerDetailsCard';
import StayOptionsSection from '../sections/StayOptionsSection';
import ExtraAddOnsSection from '../sections/ExtraAddOnsSection';
import TransportOptionsSection from '../sections/TransportOptionsSection';
import ActivityAddOnsSection from '../sections/ActivityAddOnsSection';
import FoodPreferenceSection from '../sections/FoodPreferenceSection';
import DiscountsSection from '../sections/DiscountsSection';
import { ReservationSkeleton } from '../BookingStepSkeletons';
import type {
    BookingOptionsResponse,
    BatchDetails,
    FormErrors,
    BookingFormData,
    Coupon,
} from '../sections/types';

export type { BookingFormData };

interface BookingFormPageProps {
    tripId: string;
    batchId: string;
    onContinue: (data: BookingFormData) => void;
    onViewCoupons?: (coupons: Coupon[]) => void;
}

export default function BookingFormPage({ tripId, batchId, onContinue, onViewCoupons }: BookingFormPageProps) {
    const searchParams = useSearchParams();
    const travelOptionParam = searchParams.get('travelOption');

    const {
        guests: storeGuests,
        selectedBatchId: storeBatchId,
        selectedMeetingPoint: storeMeetingPoint,
        selectedAddOnIdx: storeAddOnIdx,
        selectedExtraAddOnIdx: storeExtraAddOnIdx,
        selectedTransportAddOnIdx: storeTransportAddOnIdx,
        selectedActivityAddOnIdx: storeActivityAddOnIdx,
        selectedTravelIdx: storeTravelIdx,
        foodPreference: storeFoodPref,
        couponCode: storeCoupon,
        referralCode: storeReferral,
        personalDetails,
        storedTripId,
        setGuests,
        setSelectedBatchId,
        setSelectedMeetingPoint,
        setSelectedAddOn,
        setSelectedExtraAddOn,
        setSelectedTransportAddOn,
        setSelectedActivityAddOn,
        setSelectedTravelOption,
        setFoodPreference,
        setCouponCode,
        setReferralCode,
        setPersonalDetails,
        setStoredTripId,
        reset: resetBookingStore,
    } = useBookingStore();

    // Determine if persisted state belongs to the current trip
    const isSameTrip = !!storedTripId && storedTripId === tripId;

    // Reservation state
    const [guests, setLocalGuests] = useState(isSameTrip ? (storeGuests || 1) : 1);
    const [selectedBatchId, setLocalBatchId] = useState(isSameTrip ? (storeBatchId || batchId || '') : (batchId || ''));
    const [selectedMeetingPointIdx, setLocalMeetingPointIdx] = useState(0);
    const [selectedAddOnIdx, setLocalAddOnIdx] = useState<number | null>(isSameTrip ? (storeAddOnIdx ?? null) : null);
    const [selectedExtraAddOnIdx, setLocalExtraAddOnIdx] = useState<number | null>(isSameTrip ? (storeExtraAddOnIdx ?? null) : null);
    const [selectedTransportAddOnIdx, setLocalTransportAddOnIdx] = useState<number | null>(isSameTrip ? (storeTransportAddOnIdx ?? null) : null);
    const [selectedActivityAddOnIdx, setLocalActivityAddOnIdx] = useState<number | null>(isSameTrip ? (storeActivityAddOnIdx ?? null) : null);
    const [selectedTravelIdx, setLocalTravelIdx] = useState<number | null>(isSameTrip ? (storeTravelIdx ?? null) : null);
    const [travelInfoIdx, setTravelInfoIdx] = useState<number | null>(null);
    const [foodPreference, setLocalFoodPref] = useState<'veg' | 'non-veg' | null>(isSameTrip ? (storeFoodPref ?? null) : null);
    const [couponInput, setCouponInput] = useState(isSameTrip ? (storeCoupon || '') : '');
    const [referralInput, setReferralInput] = useState(isSameTrip ? (storeReferral || '') : '');

    // Personal details state
    const [fullName, setFullName] = useState(isSameTrip ? (personalDetails?.fullName || '') : '');
    const [email, setEmail] = useState(isSameTrip ? (personalDetails?.email || '') : '');
    const [phone, setPhone] = useState(isSameTrip ? (personalDetails?.phone || '') : '');
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Open sections state — initialize from store values for returning users
    const [openSections, setOpenSections] = useState<Set<string>>(() => {
        const sections = new Set<string>(['travel']);
        if (!isSameTrip) return sections;
        if (storeTravelIdx !== null) sections.add('meeting');
        if (storeAddOnIdx !== null) sections.add('stay');
        if (storeAddOnIdx !== null || storeBatchId) sections.add('traveler');
        if (personalDetails?.fullName && personalDetails?.email && personalDetails?.phone) sections.add('food');
        if (storeFoodPref) sections.add('discounts');
        return sections;
    });

    const openSection = (key: string) =>
        setOpenSections(prev => new Set([...prev, key]));

    const toggleSection = (key: string) =>
        setOpenSections(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key); else next.add(key);
            return next;
        });

    // Data fetching
    const { data: bookingOptions, isLoading: isBookingOptionsLoading } = useGetData<BookingOptionsResponse>(
        tripId ? API_ENDPOINTS.TRIPS.BOOKING_OPTIONS(tripId) : ''
    );

    const resolvedBatchId = selectedBatchId || batchId;
    const { data: batchDetails } = useGetData<BatchDetails>(
        resolvedBatchId ? API_ENDPOINTS.TRIPS.BATCH_DETAILS(resolvedBatchId) : ''
    );

    const batches = bookingOptions?.batches || [];
    const pricingTiers = bookingOptions?.pricingTiers || [];
    const addOns = bookingOptions?.addOns || [];
    const selectedBatch = batches.find(b => b._id === selectedBatchId) || batches[0];
    const meetingPoints = selectedBatch?.meetingPoints || [];

    // On mount: scope persisted state to the current trip; reset store if visiting a different trip
    const hasRegisteredTrip = useRef(false);
    useEffect(() => {
        if (hasRegisteredTrip.current) return;
        hasRegisteredTrip.current = true;
        if (!isSameTrip) {
            resetBookingStore();
            setLocalGuests(1);
            setLocalBatchId(batchId || '');
            setLocalMeetingPointIdx(0);
            setLocalAddOnIdx(null);
            setLocalExtraAddOnIdx(null);
            setLocalTransportAddOnIdx(null);
            setLocalActivityAddOnIdx(null);
            setLocalTravelIdx(null);
            setLocalFoodPref(null);
            setCouponInput('');
            setReferralInput('');
            setFullName('');
            setEmail('');
            setPhone('');
        }
        setStoredTripId(tripId);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Restore selectedMeetingPointIdx from persisted selectedMeetingPoint (runs once after data loads)
    const hasRestoredMeetingPoint = useRef(false);
    useEffect(() => {
        if (hasRestoredMeetingPoint.current || meetingPoints.length === 0) return;
        if (isSameTrip && storeMeetingPoint) {
            const idx = meetingPoints.findIndex(p => p.locationId === storeMeetingPoint.locationId);
            if (idx !== -1) setLocalMeetingPointIdx(idx);
        }
        hasRestoredMeetingPoint.current = true;
    }, [meetingPoints.length]); // eslint-disable-line react-hooks/exhaustive-deps

    // Initialize defaults once data loads
    useEffect(() => {
        if (batches.length === 0) return;
        if (!batches.find(b => b._id === selectedBatchId)) {
            const defaultBatch = batches[0];
            setLocalBatchId(defaultBatch._id);
            setSelectedBatchId(defaultBatch._id);
        }
        if (selectedTravelIdx === null) {
            let idx: number | null = null;
            if (pricingTiers.length === 1) {
                // Auto-select the single option
                idx = 0;
            } else if (travelOptionParam !== null) {
                const parsed = parseInt(travelOptionParam, 10);
                idx = !isNaN(parsed) && parsed < pricingTiers.length ? parsed : 0;
            } else {
                idx = 0;
            }
            setLocalTravelIdx(idx);
            if (idx !== null && pricingTiers[idx]) setSelectedTravelOption(pricingTiers[idx], idx);
        }
    }, [batches.length, pricingTiers.length]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => { setLocalMeetingPointIdx(0); }, [selectedBatchId]);
    useEffect(() => { setGuests(guests); }, [guests, setGuests]);
    useEffect(() => { setSelectedBatchId(selectedBatchId); }, [selectedBatchId, setSelectedBatchId]);
    useEffect(() => {
        if (meetingPoints.length > 0) {
            setSelectedMeetingPoint(meetingPoints[selectedMeetingPointIdx] ?? null, selectedMeetingPointIdx);
        }
    }, [selectedMeetingPointIdx, meetingPoints.length, selectedBatchId]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setSelectedAddOn(
            selectedAddOnIdx !== null && addOns[selectedAddOnIdx] ? addOns[selectedAddOnIdx] : null,
            selectedAddOnIdx
        );
    }, [selectedAddOnIdx, addOns.length]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setSelectedExtraAddOn(
            selectedExtraAddOnIdx !== null && addOns[selectedExtraAddOnIdx] ? addOns[selectedExtraAddOnIdx] : null,
            selectedExtraAddOnIdx
        );
    }, [selectedExtraAddOnIdx, addOns.length]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setSelectedTransportAddOn(
            selectedTransportAddOnIdx !== null && addOns[selectedTransportAddOnIdx] ? addOns[selectedTransportAddOnIdx] : null,
            selectedTransportAddOnIdx
        );
    }, [selectedTransportAddOnIdx, addOns.length]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setSelectedActivityAddOn(
            selectedActivityAddOnIdx !== null && addOns[selectedActivityAddOnIdx] ? addOns[selectedActivityAddOnIdx] : null,
            selectedActivityAddOnIdx
        );
    }, [selectedActivityAddOnIdx, addOns.length]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (selectedTravelIdx !== null && pricingTiers[selectedTravelIdx]) {
            setSelectedTravelOption(pricingTiers[selectedTravelIdx], selectedTravelIdx);
        }
    }, [selectedTravelIdx, pricingTiers.length]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => { setFoodPreference(foodPreference); }, [foodPreference, setFoodPreference]);

    // Open food section when all traveler fields are filled
    useEffect(() => {
        if (fullName && email && phone && !validateField('fullName', fullName) && !validateField('email', email) && !validateField('phone', phone)) {
            openSection('food');
        }
    }, [fullName, email, phone]);

    // Validation
    const validateField = (field: keyof FormErrors, value: string): string | undefined => {
        switch (field) {
            case 'fullName': return validators.fullName(value);
            case 'email': return validators.email(value);
            case 'phone': return validators.phone(value);
        }
    };

    const handleBlur = (field: keyof FormErrors) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const value = field === 'fullName' ? fullName : field === 'email' ? email : phone;
        setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    };

    const { setContinueAction } = useBookingNavStore();

    const handleContinue = () => {
        const newErrors: FormErrors = {
            fullName: validateField('fullName', fullName),
            email: validateField('email', email),
            phone: validateField('phone', phone),
        };
        setErrors(newErrors);
        setTouched({ fullName: true, email: true, phone: true });
        if (newErrors.fullName || newErrors.email || newErrors.phone) return;

        setPersonalDetails({ fullName, email, phone });
        setCouponCode(couponInput);
        setReferralCode(referralInput);

        onContinue({
            guests,
            selectedBatchId: selectedBatchId || batchId,
            travelOptionIndex: selectedTravelIdx,
            foodPreference,
            fullName,
            email,
            phone,
        });
    };

    const submitRef = useRef(handleContinue);
    submitRef.current = handleContinue;
    useEffect(() => {
        setContinueAction(() => submitRef.current());
    }, [setContinueAction]);

    if (isBookingOptionsLoading && !bookingOptions) {
        return <ReservationSkeleton />;
    }

    return (
        <div className="px-4 pb-4 flex flex-col gap-4">

            {/* Trip Overview */}
            <TripOverviewCard
                batchDetails={batchDetails}
                selectedBatch={selectedBatch}
                guests={guests}
                onGuestsChange={setLocalGuests}
                meetingPoints={meetingPoints}
                selectedMeetingPointIdx={selectedMeetingPointIdx}
                onMeetingPointChange={(idx) => {
                    setLocalMeetingPointIdx(idx);
                    if (addOns.length > 0) openSection('stay');
                    else openSection('traveler');
                }}
            />

            {/* Traveler Details (pax + personal info) */}
            <TravelerDetailsCard
                guests={guests}
                onGuestsChange={setLocalGuests}
                fullName={fullName}
                email={email}
                phone={phone}
                errors={errors}
                touched={touched}
                onFullNameChange={setFullName}
                onEmailChange={setEmail}
                onPhoneChange={setPhone}
                onBlur={handleBlur}
                isOpen={openSections.has('traveler')}
                onToggle={() => toggleSection('traveler')}
            />

            {/* Travel Options */}
            {pricingTiers.length > 0 && (
                <CollapsibleCard
                    title="Package Options"
                    overflow="visible"
                    isOpen={openSections.has('travel')}
                    onToggle={() => toggleSection('travel')}
                >
                    <div className="px-4 pb-4">
                        <TravelOptionsList
                            items={pricingTiers}
                            selectedIndex={selectedTravelIdx}
                            expandedIndex={travelInfoIdx}
                            onSelect={(idx) => {
                                if (pricingTiers.length === 1) {
                                    // Don't allow deselection for single item
                                    return;
                                }
                                const newIdx = selectedTravelIdx === idx ? null : idx;
                                setLocalTravelIdx(newIdx);
                                if (newIdx !== null) openSection('meeting');
                            }}
                            onToggleInfo={(idx) => setTravelInfoIdx(travelInfoIdx === idx ? null : idx)}
                        />
                    </div>
                </CollapsibleCard>
            )}

            {/* Stay Options */}
            <StayOptionsSection
                addOns={addOns}
                selectedAddOnIdx={selectedAddOnIdx}
                isOpen={openSections.has('stay')}
                onToggle={() => toggleSection('stay')}
                onSelect={(idx) => {
                    setLocalAddOnIdx(idx);
                    openSection('traveler');
                }}
            />

            {/* Extra Add Ons */}

            {/* Transport Options */}
            <TransportOptionsSection
                addOns={addOns}
                selectedAddOnIdx={selectedTransportAddOnIdx}
                isOpen={openSections.has('transport')}
                onToggle={() => toggleSection('transport')}
                onSelect={(idx) => {
                    setLocalTransportAddOnIdx(idx);
                    openSection('traveler');
                }}
            />

            {/* Activity Add Ons */}
            <ActivityAddOnsSection
                addOns={addOns}
                selectedAddOnIdx={selectedActivityAddOnIdx}
                isOpen={openSections.has('activity')}
                onToggle={() => toggleSection('activity')}
                onSelect={(idx) => {
                    setLocalActivityAddOnIdx(idx);
                    openSection('traveler');
                }}
            />

            {/* Food Preference */}
            <ExtraAddOnsSection
                addOns={addOns}
                selectedAddOnIdx={selectedExtraAddOnIdx}
                isOpen={openSections.has('extraAddOns')}
                onToggle={() => toggleSection('extraAddOns')}
                onSelect={(idx) => {
                    setLocalExtraAddOnIdx(idx);
                    openSection('traveler');
                }}
            />
            <FoodPreferenceSection
                value={foodPreference}
                isOpen={openSections.has('food')}
                onToggle={() => toggleSection('food')}
                onChange={(v) => {
                    setLocalFoodPref(v);
                    if (v !== null) openSection('discounts');
                }}
            />

            {/* Discounts */}
            <DiscountsSection
                couponInput={couponInput}
                referralInput={referralInput}
                coupons={bookingOptions?.coupons}
                onCouponChange={setCouponInput}
                onReferralChange={setReferralInput}
                onViewCoupons={onViewCoupons ? () => onViewCoupons(bookingOptions?.coupons ?? []) : undefined}
                isOpen={openSections.has('discounts')}
                onToggle={() => toggleSection('discounts')}
                onApply={() => {
                    setCouponCode(couponInput);
                    setReferralCode(referralInput);
                }}
            />
        </div>
    );
}

