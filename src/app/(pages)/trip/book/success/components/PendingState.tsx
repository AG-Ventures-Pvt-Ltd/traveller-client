import React from 'react';
import { ArrowRight, Home, Loader2, Mail, CalendarCheck, AlertCircle } from 'lucide-react';
import Button from '@/common/ui/Buttons/Button';
import { NextStep, ContactFooter } from './index';

interface BookingDetails {
  tripTitle: string;
  bookingId: string;
  startDate: string;
  startTime: string;
  numberOfPeople: string;
  meetingPoint: string;
  userEmail: string;
}

interface PendingStateProps {
  bookingDetails: BookingDetails;
  handleViewBookings: () => void;
  handleGoHome: () => void;
}

export default function PendingState({ bookingDetails, handleViewBookings, handleGoHome }: PendingStateProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-9 px-4">
      <div className="max-w-[900px] w-full flex flex-col items-center gap-8">
        <div className="w-20 h-20 md:w-28 md:h-28 bg-amber-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-10 h-10 md:w-14 md:h-14 text-amber-600" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900">Payment Pending</h1>
          <p className="text-lg md:text-xl font-medium text-neutral-700">
            Your booking is being processed
          </p>
        </div>

        <div className="w-full bg-background rounded-3xl border-2 border-outline px-6 md:px-10 py-6 md:py-10 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5 pb-7 border-b-2 border-outline">
            <h2 className="text-3xl font-bold text-neutral-900">{bookingDetails.tripTitle}</h2>
            <div className="flex gap-2 text-base">
              <span className="font-medium text-neutral-700">Booking ID:</span>
              <span className="font-bold text-neutral-900">{bookingDetails.bookingId}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">What&apos;s Happening?</h3>
          <div className="flex flex-col gap-5">
            <NextStep
              icon={Loader2}
              iconBg="bg-primary"
              title="Payment Verification"
              description="We're verifying your payment with the bank. This usually takes a few minutes."
            />
            <NextStep
              icon={Mail}
              iconBg="bg-primary"
              title="Email Notification"
              description="You'll receive a confirmation email once your payment is verified and booking is confirmed."
            />
            <NextStep
              icon={CalendarCheck}
              iconBg="bg-primary"
              title="Track Your Booking"
              description="You can check the status of your booking anytime from your profile page."
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4">
          <Button variant="contained" color="primary" endIcon={<ArrowRight />} onClick={handleViewBookings} className="h-12 md:h-16 rounded-xl flex-1 text-lg md:text-xl!">
            View My Bookings
          </Button>
          <Button variant="outlined" color="primary" startIcon={<Home />} onClick={handleGoHome} className="h-12 md:h-16 rounded-xl flex-1 text-lg md:text-xl!">
            Back to Home
          </Button>
        </div>

        <ContactFooter />
      </div>
    </div>
  );
}