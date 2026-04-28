'use client';

import React from 'react';
import BookingStatusIcon from './BookingStatusIcon';
import PaymentDetailsCard from './PaymentDetailsCard';

interface FailedStateProps {
    message?: string;
    handleViewBookings: () => void;
    handleGoHome: () => void;
}

export default function FailedState({ message, handleGoHome }: FailedStateProps) {
    const paymentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const rows = [
        { label: 'Transaction ID', value: '—' },
        { label: 'Date', value: paymentDate },
        { label: 'Payment Type', value: 'UPI' },
        { label: 'Total Amount', value: '—' },
        { label: 'Status', value: 'Failed', valueClassName: 'text-[#f44336]' },
    ];

    return (
        <div className="min-h-screen bg-[#fff9f4] flex flex-col pb-28">
            {/* Main content */}
            <div className="flex flex-col items-center gap-5 px-5 pt-14">
                {/* Status icon */}
                <BookingStatusIcon status="failed" />

                {/* Title + subtitle */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <h1 className="text-[20px] font-semibold text-black tracking-tight">
                        Payment Failed
                    </h1>
                    <p className="text-[14px] text-black leading-5 tracking-tight">
                        {message || 'There was a problem occurred. Please recheck your payment!'}
                    </p>
                </div>

                {/* Payment details card */}
                <div className="w-full mt-2">
                    <PaymentDetailsCard rows={rows} />
                </div>

                {/* Contact support button */}
                <button
                    onClick={handleGoHome}
                    className="w-full h-[51px] bg-[#ffc107]/45 rounded-xl text-[14px] font-medium text-black tracking-tight active:opacity-80 transition-opacity"
                >
                    Contact Support
                </button>
            </div>

            {/* Fixed bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 px-5 py-6 bg-[#fff9f4]">
                <button
                    onClick={handleGoHome}
                    className="w-full h-[51px] bg-[#ffc107] rounded-xl text-[14px] font-medium text-black tracking-tight active:opacity-80 transition-opacity"
                >
                    Retry Payment
                </button>
            </div>
        </div>
    );
}
