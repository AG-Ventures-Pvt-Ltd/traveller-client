'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import TripDetailsCard from './components/TripDetailsCard';
import TravelerCard from './components/TravelerCard';
import ContactSection from './components/ContactSection';
import SectionHeader from './components/SectionHeader';
import PaymentSummary from './components/PaymentSummary';
import BackButton from '@/common/ui/BackButton';
import { usePayment } from '@/app/(pages)/trip/book/[id]/[batchId]/hooks/usePayment';

interface BookingDetails {
  bookingId: string;
  status: string;
  trip: {
    title: string;
    image: string;
    location: string;
    date: string;
    duration: string;
    travelers: string;
    createdAt: string;
  };
  travelers: Array<{
    fullName: string;
    email: string;
    phone: string;
  }>;
  payment: {
    tripPrice: number;
    status: string;
    paymentMethod: string;
    gatewayOrderId: string;
  };
}

export interface EmergencyContact {
  name: string;
  contactNumber: string;
}

const BookingDetails = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: bookingData, isLoading, error } = useGetData<BookingDetails>(API_ENDPOINTS.BOOKINGS.GET_BY_ID(id));
  const { data: emergencyContact } = useGetData<EmergencyContact>(API_ENDPOINTS.USER.GET_EMERGENCY_CONTACT);

  // const { openRazorpay } = usePayment();

  const getStatusConfig = () => {
    if (bookingData?.status === 'cancelled' && bookingData?.payment?.status === 'cancelled') {
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        iconColor: 'text-red-700',
        showRetryButton: false
      };
    } else if (bookingData?.status === 'pending' && bookingData?.payment?.status === 'pending') {
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700',
        iconColor: 'text-yellow-700',
        showRetryButton: true
      };
    } else {
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        iconColor: 'text-green-700',
        showRetryButton: false
      };
    }
  };

  const statusConfig = getStatusConfig();

  const handleRetry = () => {
    if (bookingData?.payment?.gatewayOrderId) {
      // openRazorpay({
      //   orderId: bookingData.payment.gatewayOrderId,
      //   amount: bookingData.payment.tripPrice
      // });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-32 py-8 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-lg font-['Satoshi'] text-gray-500">Loading booking details...</div>
        </div>
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-32 py-8 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-lg font-['Satoshi'] text-red-500">
            Error loading booking details. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-32 py-8 sm:py-4">
      <div className="max-w-7xl mx-auto">
        <BackButton className='mb-3'/>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-neutral-900 text-3xl sm:text-4xl lg:text-5xl font-bold font-['Satoshi']">
              Booking Details
            </h1>
            <p className="text-neutral-700 text-base font-medium font-['Satoshi']">
              Booking ID: {bookingData.bookingId}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 ${statusConfig.bgColor} rounded-xl flex items-center gap-2`}>
              <CheckCircle2 className={`w-4 h-4 ${statusConfig.iconColor}`} />
              <span className={`text-sm font-bold font-['Satoshi'] ${statusConfig.textColor}`}>
                {bookingData.status}
              </span>
            </div>
            {statusConfig.showRetryButton && (
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-xl text-sm font-bold font-['Satoshi'] transition-colors"
              >
                Retry Payment
              </button>
            )}
          </div>
        </div>
        <div className="mb-6">
          <TripDetailsCard trip={bookingData.trip} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 flex flex-col gap-6">
              <SectionHeader number="1" title="Traveler Information" />
              <div className="flex flex-col gap-6">
                {bookingData?.travelers?.map((traveler, index) => (
                  <TravelerCard
                    key={index}
                    traveler={traveler}
                    isPrimary={index === 0}
                    travelerNumber={index + 1}
                  />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 flex flex-col gap-6">
              <SectionHeader number="2" title="Contact Information" />
              <ContactSection contact={{ emergencyName: emergencyContact?.name || '', emergencyPhone: emergencyContact?.contactNumber || '' }} />
            </div>
            {/* <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 flex flex-col gap-4">
              <SectionHeader
                icon={FileText}
                title="Cancellation Policy"
                useNumberBadge={false}
              />
              <p className="text-neutral-700 text-sm font-medium font-['Satoshi'] leading-relaxed">
                Free cancellation up to 24 hours before the tour starts. After that, 50% refund until 12 hours before. No refund for cancellations within 12 hours of tour start time.
              </p>
            </div> */}
          </div>
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-26">
              <PaymentSummary payment={bookingData.payment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;