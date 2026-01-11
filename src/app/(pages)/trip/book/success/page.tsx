'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetData } from '@/services/useGetData';
import { LoadingState, FailedState, PendingState, SuccessState } from './components';

interface BookingResponse {
  bookingStatus: 'success' | 'pending' | 'failed';
  paymentStatus: 'success' | 'pending' | 'failed';
  message?: string;
  bookingDetails: {
    tripTitle: string;
    bookingId: string;
    startDate: string;
    startTime: string;
    numberOfPeople: string;
    meetingPoint: string;
    userEmail: string;
  };
}

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
//   const handleRetry = () => window.location.reload();

  if (!orderId) return null;

  // Determine the state based on bookingStatus and paymentStatus
  const isFailed = error || bookingResponse?.bookingStatus === 'failed' || bookingResponse?.paymentStatus === 'failed';
  const isPending = !isFailed && (bookingResponse?.bookingStatus === 'pending' || bookingResponse?.paymentStatus === 'pending');
//   const isSuccess = bookingResponse?.bookingStatus === 'success' && bookingResponse?.paymentStatus === 'success';

  // Get booking details with fallback values
  const bookingDetails = bookingResponse?.bookingDetails || {
    tripTitle: 'Your Trip',
    bookingId: orderId || '',
    startDate: 'TBD',
    startTime: 'TBD',
    numberOfPeople: '1 Person',
    meetingPoint: 'TBD',
    userEmail: 'your email',
  };

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