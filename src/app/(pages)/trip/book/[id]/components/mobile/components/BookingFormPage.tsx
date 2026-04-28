'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPinLineIcon, InfoIcon } from '@phosphor-icons/react';
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
import FoodPreferenceSection from '../sections/FoodPreferenceSection';
import DiscountsSection from '../sections/DiscountsSection';
import type {
    BookingOptionsResponse,
    BatchDetails,
    FormErrors,
    BookingFormData,
} from '../sections/types';

export type { BookingFormData };

interface BookingFormPageProps {
    tripId: string;
    batchId: string;
    onContinue: (data: BookingFormData) => void;
}

export default function BookingFormPage({ tripId, batchId, onContinue }: BookingFormPageProps) {
    const searchParams = useSearchParams();
    const travelOptionParam = searchParams.get('travelOption');

    const {
        guests: storeGuests,
        selectedBatchId: storeBatchId,
        selectedAddOnIdx: storeAddOnIdx,
        selectedTravelIdx: storeTravelIdx,
        foodPreference: storeFoodPref,
        couponCode: storeCoupon,
        referralCode: storeReferral,
        personalDetails,
        setGuests,
        setSelectedBatchId,
        setSelectedMeetingPoint,
        setSelectedAddOn,
        setSelectedTravelOption,
        setFoodPreference,
        setCouponCode,
        setReferralCode,
        setPersonalDetails,
    } = useBookingStore();

    // Reservation state
    const [guests, setLocalGuests] = useState(storeGuests || 1);
    const [selectedBatchId, setLocalBatchId] = useState(storeBatchId || batchId || '');
    const [selectedMeetingPointIdx, setLocalMeetingPointIdx] = useState(0);
    const [selectedAddOnIdx, setLocalAddOnIdx] = useState<number | null>(storeAddOnIdx ?? null);
    const [selectedTravelIdx, setLocalTravelIdx] = useState<number | null>(storeTravelIdx ?? null);
    const [travelInfoIdx, setTravelInfoIdx] = useState<number | null>(null);
    const [foodPreference, setLocalFoodPref] = useState<'veg' | 'non-veg' | null>(storeFoodPref ?? null);
    const [couponInput, setCouponInput] = useState(storeCoupon || '');
    const [referralInput, setReferralInput] = useState(storeReferral || '');

    // Personal details state
    const [fullName, setFullName] = useState(personalDetails?.fullName || '');
    const [email, setEmail] = useState(personalDetails?.email || '');
    const [phone, setPhone] = useState(personalDetails?.phone || '');
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Open sections state — initialize from store values for returning users
    const [openSections, setOpenSections] = useState<Set<string>>(() => {
        const sections = new Set<string>(['travel']);
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
    const { data: bookingOptions } = useGetData<BookingOptionsResponse>(
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

    // Initialize defaults once data loads
    useEffect(() => {
        if (batches.length === 0) return;
        if (!batches.find(b => b._id === selectedBatchId)) {
            const defaultBatch = batches[0];
            setLocalBatchId(defaultBatch._id);
            setSelectedBatchId(defaultBatch._id);
        }
        if (selectedTravelIdx === null) {
            let idx = 0;
            if (travelOptionParam !== null) {
                const parsed = parseInt(travelOptionParam, 10);
                idx = !isNaN(parsed) && parsed < pricingTiers.length ? parsed : 0;
            }
            setLocalTravelIdx(idx);
            if (pricingTiers[idx]) setSelectedTravelOption(pricingTiers[idx], idx);
        }
    }, [batches.length, pricingTiers.length]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => { setLocalMeetingPointIdx(0); }, [selectedBatchId]);
    useEffect(() => { setGuests(guests); }, [guests, setGuests]);
    useEffect(() => { setSelectedBatchId(selectedBatchId); }, [selectedBatchId, setSelectedBatchId]);
    useEffect(() => {
        if (meetingPoints.length > 0) {
            setSelectedMeetingPoint(meetingPoints[selectedMeetingPointIdx] ?? null, selectedMeetingPointIdx);
        }
    }, [selectedMeetingPointIdx, meetingPoints.length]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setSelectedAddOn(
            selectedAddOnIdx !== null && addOns[selectedAddOnIdx] ? addOns[selectedAddOnIdx] : null,
            selectedAddOnIdx
        );
    }, [selectedAddOnIdx, addOns.length]); // eslint-disable-line react-hooks/exhaustive-deps
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
            roomSharing: selectedAddOnIdx,
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

    return (
        <div className="px-4 pb-4 flex flex-col gap-4">

            {/* Trip Overview */}
            <TripOverviewCard
                batchDetails={batchDetails}
                selectedBatch={selectedBatch}
                nights={batchDetails?.nights}
            />

            {/* Travel Options */}
            {pricingTiers.length > 0 && (
                <CollapsibleCard
                    title="Travel Options"
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
                                const newIdx = selectedTravelIdx === idx ? null : idx;
                                setLocalTravelIdx(newIdx);
                                if (newIdx !== null) openSection('meeting');
                            }}
                            onToggleInfo={(idx) => setTravelInfoIdx(travelInfoIdx === idx ? null : idx)}
                        />
                    </div>
                </CollapsibleCard>
            )}

            {/* Meeting Point */}
            <CollapsibleCard
                title="Meeting Point"
                overflow="visible"
                isOpen={openSections.has('meeting')}
                onToggle={() => toggleSection('meeting')}
            >
                <div className="px-4 pb-4">
                    {meetingPoints.length === 0 ? (
                        <span className="text-xs text-zinc-400 px-1">No meeting points for this batch</span>
                    ) : (
                        <TravelOptionsList
                            items={meetingPoints.map(p => ({
                                label: p?.city || p.locationId,
                                icon: MapPinLineIcon,
                                badgeLabel: p.pickupPrice > 0 ? `+₹${p.pickupPrice.toLocaleString()}` : undefined,
                            }))}
                            selectedIndex={selectedMeetingPointIdx}
                            onSelect={(idx) => {
                                setLocalMeetingPointIdx(idx);
                                if (addOns.length > 0) openSection('stay');
                                else openSection('traveler');
                            }}
                            showCheckOnSelect
                        />
                    )}
                    <div className="flex items-center gap-2 mt-4 px-1">
                        <InfoIcon size={18} className="text-zinc-500 flex-shrink-0" />
                        <span className="text-xs text-zinc-500">Location info will be shared after booking</span>
                    </div>
                </div>
            </CollapsibleCard>

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

            {/* Food Preference */}
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

