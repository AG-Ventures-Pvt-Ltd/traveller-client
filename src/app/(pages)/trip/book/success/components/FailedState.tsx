import React from 'react';
import { ArrowRight, Home, XCircle, Mail, AlertCircle } from 'lucide-react';
import Button from '@/common/ui/Buttons/Button';
import { NextStep, ContactFooter } from './index';

interface FailedStateProps {
  message?: string;
  handleViewBookings: () => void;
  handleGoHome: () => void;
}

export default function FailedState({ message, handleViewBookings, handleGoHome }: FailedStateProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-9 px-4">
      <div className="max-w-[900px] w-full flex flex-col items-center gap-8">
        <div className="w-20 h-20 md:w-28 md:h-28 bg-red-100 rounded-full flex items-center justify-center">
          <XCircle className="w-10 h-10 md:w-14 md:h-14 text-red-600" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900">Booking Failed</h1>
          <p className="text-lg md:text-xl font-medium text-neutral-700">
            {message || 'We encountered an issue processing your booking'}
          </p>
        </div>
        <div className="w-full bg-white rounded-3xl border-2 border-outline px-6 md:px-10 py-6 md:py-10 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-neutral-900">What Happened?</h2>
          <div className="flex flex-col gap-5">
            <NextStep
              icon={AlertCircle}
              iconBg="bg-primary"
              title="Payment Issue"
              description="Your payment could not be processed. This might be due to insufficient funds or a technical issue."
            />
            <NextStep
              icon={Mail}
              iconBg="bg-primary"
              title="Check Your Email"
              description="We've sent details about this failed transaction to your registered email address."
            />
            <NextStep
              icon={ArrowRight}
              iconBg="bg-primary"
              title="Next Steps"
              description="Please try booking again or contact our support team if the issue persists."
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