'use client';

import React, { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LockSimpleIcon } from '@phosphor-icons/react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import BackButton from '@/common/ui/BackButton';
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

  // UI-only lock — backend still accepts edits, this just stops travelers from
  // changing traveler/emergency-contact details once the trip has started.
  const isDetailsLocked = !!bookingData && new Date() >= new Date(bookingData.trip.startDateTime);

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


  const actionButton = (
    <Button
      variant="yellow"
      fullWidth
      onClick={handleButtonClick}
      disabled={isUpdating}
    >
      {isUpdating ? 'Updating...' : hasAnyChanges ? 'Update Details' : 'Done'}
    </Button>
  );

  return (
    <div className='pb-32 md:pb-12 bg-[#FFF9F4]'>
      <div className='mx-auto max-w-6xl flex flex-col gap-6'>
        <div className='md:hidden'>
          <BackButton label='Booking Summary' className='mt-4' />
        </div>

        <div className='flex flex-col gap-6 md:flex-row md:items-start'>
          {/* Left: booking details — sticky, back button travels with it on desktop.
              top-24 clears the sticky navbar (sticky top-0, py-5), same offset
              used by TripFilters/BookingFormPage's sticky sidebars. */}
          <div className='flex flex-col gap-6 md:w-1/2 md:sticky md:top-24 md:self-start'>
            <div className='hidden md:block'>
              <BackButton label='Booking Summary' />
            </div>
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
              isEvent={bookingData.trip.isEvent}
            />
            <TripSummaryCard trip={bookingData.trip} booking={bookingData.booking} />
          </div>

          {/* Right: traveler + emergency contact. Invisible spacer matches the left
              column's back-button height so this column's first real box lines up
              with the left column's first box (TripOverviewCard), not the button. */}
          <div className='flex flex-col gap-6 md:w-1/2'>
            <div className='hidden md:block invisible' aria-hidden='true'>
              <BackButton label='Booking Summary' />
            </div>
            {isDetailsLocked && (
              <div className='flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm'>
                <LockSimpleIcon className='w-4 h-4 flex-shrink-0' weight='bold' />
                {bookingData.trip.isEvent ? 'Attendee' : 'Traveler'} and emergency contact details are locked now that the {bookingData.trip.isEvent ? 'event' : 'trip'} has started.
              </div>
            )}
            <TravelerSection
              bookingId={bookingId}
              onDataChange={handleTravelerDataChange}
              onReset={handleReset}
              locked={isDetailsLocked}
              isEvent={bookingData.trip.isEvent}
            />
            <ContactSection
              onDataChange={handleContactDataChange}
              onReset={handleReset}
              locked={isDetailsLocked}
            />
            <div className='hidden md:block'>{actionButton}</div>
          </div>
        </div>
      </div>

      {/* Mobile: sticky action bar */}
      <div className="fixed md:hidden bottom-0 left-0 right-0 px-5 py-5 bg-[#FFF9F4] z-50">
        {actionButton}
      </div>
    </div>
  );
};

export default BookingDetails;