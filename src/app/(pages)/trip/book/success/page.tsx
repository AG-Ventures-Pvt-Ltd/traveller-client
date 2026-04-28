'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetData } from '@/services/useGetData';
import { LoadingState, FailedState, PendingState, SuccessState } from './components';
import type { BookingResponse } from './types';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

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

  const handleGoHome = () => router.push('/');
  const handleViewBookings = () => router.push('/profile?tab=bookings');

  if (!orderId) return null;

  const isFailed = error || bookingResponse?.bookingStatus === 'failed'
  const isPending = !isFailed && bookingResponse?.bookingStatus !== 'success'

  const bookingDetails = bookingResponse?.bookingDetails

  if (isLoading) {
    return <LoadingState />;
  }

  if (isFailed) {
    return <FailedState message={bookingResponse?.message} handleViewBookings={handleViewBookings} handleGoHome={handleGoHome} />;
  }

  if (isPending) {
    return <PendingState bookingDetails={bookingDetails} handleViewBookings={handleViewBookings} handleGoHome={handleGoHome} />;
  }

  return <SuccessState bookingDetails={bookingDetails} handleGoHome={handleGoHome} handleViewBookings={handleViewBookings} />
}