'use client';

import React, { useState, useEffect } from 'react';
import Accordion from '@/common/components/composites/Accordion';
import ContactInformation from './ContactInformation';
import ReviewAndPay from './ReviewAndPay/ReviewAndPay';
import TravelerDetails from './TravelerDetails/TravelerDetails';
import { useBookingFlow } from '../hooks/useBookingFlow';
import { useBookingStore } from '../store/useBookingStore';
import { TravelerData, EmergencyContact, TravelerDetailsFormProps } from './types';

const TravelerDetailsForm: React.FC<TravelerDetailsFormProps> = ({
    guests,
    onGuestsChange,
    tripId,
    batchId,
}) => {
    const [travelers, setTravelers] = useState<TravelerData[]>(
        Array.from({ length: guests }, () => ({
            fullName: '',
            gender: '',
            email: '',
            phone: '',
            governmentId: null,
        }))
    );
    const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>({
        name: '',
        phone: '',
    });
    const [isTravelerFormSubmitted, setIsTravelerFormSubmitted] = useState(false);
    const [isTravelerAccordionOpen, setIsTravelerAccordionOpen] = useState(true);
    const [isContactFormSubmitted, setIsContactFormSubmitted] = useState(false);
    const [isContactAccordionOpen, setIsContactAccordionOpen] = useState(false);
    const [isReviewAccordionOpen, setIsReviewAccordionOpen] = useState(false);

    const { initiateBooking, isProcessing } = useBookingFlow();
    const totalAmount = useBookingStore((state) => state.totalAmount);

    useEffect(() => {
        setTravelers(prevTravelers => {
            if (guests > prevTravelers.length) {
                const newTravelers = Array.from({ length: guests - prevTravelers.length }, () => ({
                    fullName: '',
                    gender: '',
                    email: '',
                    phone: '',
                    governmentId: null,
                }));
                return [...prevTravelers, ...newTravelers];
            } else if (guests < prevTravelers.length) {
                return prevTravelers.slice(0, guests);
            }
            return prevTravelers;
        });
    }, [guests]);

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

    const handleCompleteBooking = async () => {
        await initiateBooking({
            tripId,
            batchId,
            travelers,
            emergencyContact,
            totalAmount : totalAmount,
            numberOfPeople: guests,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <Accordion
                title="Traveller Details"
                subtitle={`${guests} ${guests === 1 ? 'traveler' : 'travelers'}`}
                number={1}
                defaultOpen={isTravelerAccordionOpen}
                showEdit={isTravelerFormSubmitted && !isTravelerAccordionOpen}
                onEdit={handleTravelerEdit}
                isCompleted={isTravelerFormSubmitted}
                className=""
            >
                <TravelerDetails
                    travelers={travelers}
                    onTravelersChange={setTravelers}
                    guests={guests}
                    onGuestsChange={onGuestsChange}
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
