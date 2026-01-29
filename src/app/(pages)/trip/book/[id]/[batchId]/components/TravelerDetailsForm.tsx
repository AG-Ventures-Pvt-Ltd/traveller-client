'use client';

import React, { useState, useEffect } from 'react';
import Accordion from '@/common/components/composites/Accordion';
import ContactInformation from './ContactInformation';
import ReviewAndPay from './ReviewAndPay/ReviewAndPay';
import TravelerDetails from './TravelerDetails/TravelerDetails';
import { useBookingFlow } from '../hooks/useBookingFlow';
import { useBookingStore } from '../store/useBookingStore';
import { EmergencyContact, TravelerDetailsFormProps } from './types';

const TravelerDetailsForm: React.FC<TravelerDetailsFormProps> = ({
    guests,
    onGuestsChange,
    tripId,
    batchId,
}) => {
    const [selectedTravelerIds, setSelectedTravelerIds] = useState<string[]>([]);
    const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>({
        name: '',
        contactNumber: '',
    });
    const [isTravelerFormSubmitted, setIsTravelerFormSubmitted] = useState(false);
    const [isTravelerAccordionOpen, setIsTravelerAccordionOpen] = useState(true);
    const [isContactFormSubmitted, setIsContactFormSubmitted] = useState(false);
    const [isContactAccordionOpen, setIsContactAccordionOpen] = useState(false);
    const [isReviewAccordionOpen, setIsReviewAccordionOpen] = useState(false);

    const { initiateBooking, isProcessing } = useBookingFlow();
    const totalAmount = useBookingStore((state) => state.totalAmount);
    const couponCode = useBookingStore((state) => state.couponCode);

    const totalSelectedTravelers = selectedTravelerIds.length;

    useEffect(() => {
        if (totalSelectedTravelers !== guests) {
            onGuestsChange(totalSelectedTravelers);
        }
    }, [totalSelectedTravelers, guests, onGuestsChange]);

    const handleTravelerNext = () => {
        setIsTravelerFormSubmitted(true);
        setIsTravelerAccordionOpen(false);
        setIsContactAccordionOpen(true);
    };

    const handleTravelerEdit = () => {
        setIsTravelerAccordionOpen(true);
    };

    const handleContactNext = () => {
        setIsContactFormSubmitted(true);
        setIsContactAccordionOpen(false);
        setIsReviewAccordionOpen(true);
    };

    const handleContactEdit = () => {
        setIsContactAccordionOpen(true);
    };

    const handleCompleteBooking = async (referralCode?: string) => {
        await initiateBooking({
            tripId,
            batchId,
            selectedTravelerIds,
            emergencyContact,
            totalAmount: totalAmount,
            numberOfPeople: totalSelectedTravelers,
            couponCode: couponCode || undefined,
            referralCode: referralCode || undefined,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <Accordion
                title="Traveller Details"
                subtitle={`${totalSelectedTravelers} ${totalSelectedTravelers === 1 ? 'traveler' : 'travelers'} selected`}
                number={1}
                defaultOpen={isTravelerAccordionOpen}
                showEdit={isTravelerFormSubmitted && !isTravelerAccordionOpen}
                onEdit={handleTravelerEdit}
                isCompleted={isTravelerFormSubmitted}
                className=""
            >
                <TravelerDetails
                    selectedTravelerIds={selectedTravelerIds}
                    onSelectedTravelersChange={setSelectedTravelerIds}
                    onNext={handleTravelerNext}
                />
            </Accordion>
            <Accordion
                title="Contact Information"
                subtitle="Emergency contact details"
                number={2}
                defaultOpen={isContactAccordionOpen}
                showEdit={isContactFormSubmitted && !isContactAccordionOpen}
                onEdit={handleContactEdit}
                disabled={!isTravelerFormSubmitted}
                isCompleted={isContactFormSubmitted}
                className=""
            >
                <ContactInformation
                    emergencyContact={emergencyContact}
                    onChange={setEmergencyContact}
                    onNext={handleContactNext}
                />
            </Accordion>
            <Accordion
                title="Review and Pay"
                subtitle="Complete your booking"
                number={3}
                defaultOpen={isReviewAccordionOpen}
                disabled={!isContactFormSubmitted}
                isCompleted={isReviewAccordionOpen}
                className=""
            >
                <ReviewAndPay
                    totalAmount={totalAmount}
                    onComplete={handleCompleteBooking}
                    tripId={tripId}
                    isSubmitting={isProcessing}
                />
            </Accordion>
        </div>
    );
};

export default TravelerDetailsForm;
