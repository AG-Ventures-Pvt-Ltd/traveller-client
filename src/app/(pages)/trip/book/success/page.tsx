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
  const successFiredRef = useRef(false);

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

  // `purchase` is sent by the server from the payment webhook, not here: this page
  // is reachable without a confirmed payment (and reloadable), so a client-side
  // purchase both missed real payments and double-counted the ones it caught.
  useEffect(() => {
    if (bookingResponse?.bookingStatus === 'success' && bookingDetails && !successFiredRef.current) {
      successFiredRef.current = true;
      trackEvent('booking_success_view', { transaction_id: bookingDetails.transactionId });
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