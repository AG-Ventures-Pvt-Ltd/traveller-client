'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetData } from '@/services/useGetData';
import { LoadingState, FailedState, PendingState, SuccessState } from './components';
import DesktopBookingSuccess from './components/DesktopBookingSuccess';
import { useDevice } from '@/common/hooks/useDevice';
import type { BookingResponse } from './types';
import { trackEvent } from '@/common/utils/analytics';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isMobile, isHydrated } = useDevice();
  const orderId = searchParams.get('orderId');
  const purchaseFiredRef = useRef(false);

  useEffect(() => {
    if (!orderId) {
      router.push('/');
    }
  }, [orderId, router]);

  const { data: bookingResponse, isLoading, error } = useGetData<BookingResponse>(
    `api/client/v1/bookings/confirm?orderId=${orderId}`,
    {
      queryKey : orderId ? [`booking_confirmation_${orderId}`] : ['booking_confirmation'] ,
      enabled: !!orderId,
    }
  );

  
  const bookingDetails = bookingResponse?.bookingDetails;

  useEffect(() => {
    if (bookingResponse?.bookingStatus === 'success' && bookingDetails && !purchaseFiredRef.current) {
      purchaseFiredRef.current = true;
      trackEvent('purchase', {
        transaction_id: bookingDetails.transactionId,
        value: parseFloat(bookingDetails.grandTotal) || 0,
        currency: 'INR',
        items: [{ item_name: bookingDetails.tripTitle, quantity: parseInt(bookingDetails.numberOfPeople) || 1 }],
      });
    }
  }, [bookingResponse?.bookingStatus, bookingDetails]);

  if (!orderId) return null;

  const isFailed = error || bookingResponse?.bookingStatus === 'failed'
  const isPending = !isFailed && bookingResponse?.bookingStatus !== 'success'

  const handleGoHome = () => router.push('/');
  const handleViewBookings = () => router.push(`/profile/mytrips/${bookingDetails?.bookingId}`);

  const content = isLoading
    ? <LoadingState />
    : isFailed
      ? <FailedState message={bookingResponse?.message} handleViewBookings={handleViewBookings} handleGoHome={handleGoHome} />
      : isPending
        ? <PendingState bookingDetails={bookingDetails} handleViewBookings={handleViewBookings} handleGoHome={handleGoHome} />
        : <SuccessState bookingDetails={bookingDetails} handleGoHome={handleGoHome} handleViewBookings={handleViewBookings} />;

  if (!isHydrated || isMobile) {
    return content;
  }

  // On desktop, passenger-detail completion is mobile-only — show the notice on success/pending.
  const showMobileNotice = !isLoading && !isFailed;

  return (
    <DesktopBookingSuccess showMobileNotice={showMobileNotice}>
      {content}
    </DesktopBookingSuccess>
  );
}