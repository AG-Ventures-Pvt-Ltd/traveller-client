'use client';

import React, { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import BackButton from '@/common/ui/BackButton';
import { usePayment } from '@/app/(pages)/trip/book/[id]/[batchId]/hooks/usePayment';
import TripSummaryCard from '@/app/(pages)/trip/book/[id]/components/mobile/components/ReviewInfo/components/TripSummaryCard';
import { BookingData } from '@/app/(pages)/trip/book/[id]/components/mobile/type';
import TripOverviewCard from '@/app/(pages)/trip/book/[id]/components/mobile/components/BookingFormPage/components/TripOverviewCard';
import ContactSection, { EmergencyContact } from './components/ContactSection';
import TravelerSection from './components/TravelerCard';
import Button from '@/common/ui/Buttons/Button';
import usePostData from '@/services/usePostData';




const BookingDetails = () => {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;

  const { data: bookingData, isLoading, error } = useGetData<BookingData>(API_ENDPOINTS.BOOKINGS.DETAILS(bookingId));

  const [hasContactChanges, setHasContactChanges] = useState(false);
  const [contactData, setContactData] = useState<EmergencyContact | null>(null);
  const [hasTravelerChanges, setHasTravelerChanges] = useState(false);
  const [travelerData, setTravelerData] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutate: updateEmergencyContact } = usePostData({
    url: API_ENDPOINTS.USER.ADD_EMERGENCY_CONTACT,
    enableNotifications: true,
    onSuccess: () => {
      setHasContactChanges(false);
    }
  });

  const { mutate: updateTravelers } = usePostData({
    url: API_ENDPOINTS.BOOKINGS.UPDATE_TRVELERS_DATA(bookingId),
    enableNotifications: true,
    onSuccess: () => {
      setHasTravelerChanges(false);
    }
  });

  const handleContactDataChange = useCallback((hasChanges: boolean, data: EmergencyContact | null) => {
    setHasContactChanges(hasChanges);
    setContactData(data);
  }, []);

  const handleTravelerDataChange = useCallback((hasChanges: boolean, data: any) => {
    setHasTravelerChanges(hasChanges);
    setTravelerData(data);
  }, []);

  const handleReset = useCallback(() => {
    setHasContactChanges(false);
    setHasTravelerChanges(false);
  }, []);

  const hasAnyChanges = hasContactChanges || hasTravelerChanges;

  const handleButtonClick = async () => {
    if (hasAnyChanges) {
      setIsUpdating(true);
      
      if (hasContactChanges && contactData) {
        updateEmergencyContact(contactData as unknown as Record<string, unknown>);
      }
      
      if (hasTravelerChanges && travelerData) {
        updateTravelers(travelerData as Record<string, unknown>);
      }
      
      setIsUpdating(false);
    } else {
      // No changes, redirect back
      router.back();
    }
  };



  if (isLoading) {
    return (
      <>

      </>
    )
  }


  if (error || !bookingData) {
    return (
      <></>
    );
  }


  return (
    <div className='flex flex-col gap-4 pb-32 bg-[#FFF9F4]'>
      <BackButton label='Booking Summary' className='mt-4' />
      <TripOverviewCard
        guests={bookingData.booking.numberOfPeople}
        selectedMeetingPoint={bookingData.booking.meetingPoint}
        batchDetails={{
          startDateTime: bookingData.trip.startDateTime,
          endDateTime: bookingData.trip.endDateTime,
          meetingPoint: bookingData.booking.meetingPoint,
          duration: bookingData.trip.duration
        }}
        gap={'3'}
      />
      <TripSummaryCard trip={bookingData.trip} booking={bookingData.booking} />
      <TravelerSection 
        bookingId={bookingId}
        onDataChange={handleTravelerDataChange}
        onReset={handleReset}
      />
      <ContactSection 
        onDataChange={handleContactDataChange}
        onReset={handleReset}
      />
      <div className="fixed bottom-0 left-0 right-0 px-5 py-5 bg-[#FFF9F4] z-50">
        <Button
          variant="yellow"
          fullWidth
          onClick={handleButtonClick}
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : hasAnyChanges ? 'Update Details' : 'Done'}
        </Button>
      </div>
    </div>
  );
};

export default BookingDetails;