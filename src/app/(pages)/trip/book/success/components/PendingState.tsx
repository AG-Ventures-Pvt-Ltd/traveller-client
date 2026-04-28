'use client';

import React from 'react';
import { InfoIcon } from '@phosphor-icons/react';
import BookingStatusIcon from './BookingStatusIcon';
import PaymentDetailsCard from './PaymentDetailsCard';
import type { BookingDetails } from '../types';

interface PendingStateProps {
    bookingDetails: BookingDetails | undefined;
    handleViewBookings: () => void;
    handleGoHome: () => void;
}

export default function PendingState({ bookingDetails, handleViewBookings }: PendingStateProps) {
    const paymentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const rows = [
        { label: 'Transaction ID', value: bookingDetails?.bookingId || '—' },
        { label: 'Date', value: paymentDate },
        { label: 'Payment Type', value: 'UPI' },
        { label: 'Total Amount', value: '—' },
        { label: 'Status', value: 'Pending', valueClassName: 'text-[#FF9800]' },
    ];

    return (
        <div className="min-h-screen bg-[#fff9f4] flex flex-col pb-28">
            {/* Main content */}
            <div className="flex flex-col items-center gap-5 px-5 pt-14">
                {/* Status icon */}
                <BookingStatusIcon status="pending" />

                {/* Title + subtitle */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <h1 className="text-[20px] font-semibold text-black tracking-tight">
                        Payment Pending
                    </h1>
                    <p className="text-[14px] text-black leading-5 tracking-tight">
                        Your booking is being processed. This may take a few minutes.
                    </p>
                </div>

                {/* Payment details card */}
                <div className="w-full mt-2">
                    <PaymentDetailsCard rows={rows} />
                </div>

                {/* Info banner */}
                <div className="w-full flex items-start gap-2.5 bg-[#ffc107]/45 rounded-xl px-3 py-3.5">
                    <InfoIcon size={16} weight="fill" className="text-black flex-shrink-0 mt-0.5" />
                    <p className="text-[12px] text-black leading-[1.5] tracking-tight">
                        You&apos;ll receive a confirmation email once your payment is verified. You can also check your booking status in your profile.
                    </p>
                </div>
            </div>

            {/* Fixed bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 px-5 py-6 bg-[#fff9f4]">
                <button
                    onClick={handleViewBookings}
                    className="w-full h-[51px] bg-[#ffc107] rounded-xl text-[14px] font-medium text-black tracking-tight active:opacity-80 transition-opacity"
                >
                    View My Bookings
                </button>
            </div>
        </div>
    );
}
