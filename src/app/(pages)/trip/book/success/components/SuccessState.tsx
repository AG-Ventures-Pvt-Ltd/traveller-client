import React from 'react';
import { CheckCircle2, Calendar, Users, MapPin, Home, ArrowRight, Mail, Download, CalendarCheck } from 'lucide-react';
import Button from '@/common/ui/Buttons/Button';
import { InfoBox, NextStep, ContactFooter } from './index';
import { formatDate } from '@/common/utils/dateUtils';

interface BookingDetails {
  tripTitle: string;
  bookingId: string;
  startDate: string;
  startTime: string;
  numberOfPeople: string;
  meetingPoint: string;
  userEmail: string;
}

interface SuccessStateProps {
  bookingDetails: BookingDetails;
  handleGoHome: () => void;
  handleViewBookings: () => void;
}

export default function SuccessState({ bookingDetails, handleGoHome, handleViewBookings }: SuccessStateProps) {
  return (
    <div className="min-h-screen bg-white py-9 px-4">
      <div className="max-w-[900px] mx-auto flex flex-col items-center gap-8">
        <div className="w-20 h-20 md:w-28 md:h-28 bg-green-700 rounded-full shadow-lg flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 md:w-14 md:h-14 text-white" strokeWidth={2.5} />
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900">
            Booking Confirmed! 🎉
          </h1>
          <div className="flex flex-col items-center gap-1">
            <p className="text-lg md:text-xl font-medium text-neutral-700">
              Your trip is all set! We&apos;ve sent the confirmation details to
            </p>
            <p className="text-lg md:text-xl font-bold text-neutral-900">{bookingDetails.userEmail}</p>
          </div>
        </div>
        <div className="w-full bg-neutral-50 rounded-3xl border-2 border-gray-200 px-6 md:px-10 py-6 md:py-10 flex flex-col gap-7">
          <div className="flex flex-col gap-1.5 pb-7 border-b-2 border-gray-200">
            <h2 className="text-3xl font-bold text-neutral-900">
              {bookingDetails.tripTitle}
            </h2>
            <div className="flex gap-2 text-base">
              <span className="font-medium text-neutral-700">Booking ID:</span>
              <span className="font-bold text-neutral-900">{bookingDetails.bookingId}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoBox icon={Calendar} label="Tour Date & Time" value={`${formatDate(bookingDetails.startDate)}`} />
            <InfoBox icon={Users} label="Travelers" value={bookingDetails.numberOfPeople} />
            <InfoBox icon={MapPin} label="Meeting Point" value={bookingDetails.meetingPoint} />
          </div>
        </div>

        <div className="w-full bg-white rounded-3xl border-2 border-gray-200 px-6 md:px-9 py-6 md:py-9 flex flex-col gap-6">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900">What&apos;s Next?</h2>
          <div className="flex flex-col gap-5">
            <NextStep
              icon={Mail}
              title="Check your email"
              description="We've sent a confirmation email with your booking details, tour itinerary, and meeting point instructions."
            />
            <NextStep
              icon={Download}
              title="Download your ticket"
              description="Your mobile ticket is attached in the confirmation email. You can also access it from your profile."
            />
            <NextStep
              icon={CalendarCheck}
              title="Prepare for your adventure"
              description="Remember to bring comfortable walking shoes, sunscreen, and a camera. We'll contact you 24 hours before the tour."
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4">
          <Button variant="contained" color="primary" startIcon={<Home />} onClick={handleGoHome} className="h-12 md:h-16 rounded-xl flex-1 text-lg md:text-xl!">
            Back to Home
          </Button>
          <Button variant="outlined" color="primary" endIcon={<ArrowRight />} onClick={handleViewBookings} className="h-12 md:h-16 rounded-xl flex-1 text-lg md:text-xl!">
            View My Bookings
          </Button>
        </div>

        <ContactFooter />
      </div>
    </div>
  );
}