'use client';

import React from 'react';
import { InfoIcon } from '@phosphor-icons/react';
import BookingStatusIcon from './BookingStatusIcon';
import PaymentDetailsCard from './PaymentDetailsCard';
import type { BookingDetails } from '../types';

interface SuccessStateProps {
    bookingDetails: BookingDetails | undefined;
    handleGoHome: () => void;
    handleViewBookings: () => void;
}

export default function SuccessState({ bookingDetails, handleViewBookings }: SuccessStateProps) {
    const isFree = !!bookingDetails && Number(bookingDetails.grandTotal) === 0;
    const isEvent = !!bookingDetails?.isEvent;
    const person = isEvent ? 'participant' : 'passenger';

    // Free bookings have no payment: show the booking date and drop method/amount.
    const dateSource = isFree && bookingDetails?.bookingDate ? new Date(bookingDetails.bookingDate) : new Date();
    const date = bookingDetails?.bookingDate
        ? dateSource.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })
        : '—';

    const rows = [
        { label: 'Transaction ID', value: bookingDetails?.transactionId || '—' },
        { label: isFree ? 'Booking Date' : 'Payment Date', value: date },
        ...(isFree ? [] : [
            { label: 'Payment Method', value: bookingDetails?.method || '—' },
            { label: 'Total Amount', value: bookingDetails?.grandTotal || '—' },
        ]),
        { label: 'Status', value: 'Successful', valueClassName: 'text-[#43a047]' },
    ];

    return (
        <div className="min-h-screen bg-[#fff9f4] flex flex-col pb-28">
            {/* Main content */}
            <div className="flex flex-col items-center gap-5 px-5 pt-14">
                {/* Status icon */}
                <BookingStatusIcon status="success" />

                {/* Title + subtitle */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <h1 className="text-[20px] font-semibold text-black tracking-tight">
                        {isFree ? 'Booking Successful' : 'Payment Successful'}
                    </h1>
                    <p className="text-[14px] text-black leading-5 tracking-tight">
                        Thank you for booking {isEvent ? 'an event' : 'a trip'} with wondrr! Delighted to see you there.
                    </p>
                </div>

                {/* Payment details card */}
                <div className="w-full mt-2">
                    <PaymentDetailsCard rows={rows} title={isFree ? 'Booking Details' : undefined} />
                </div>

                {/* Info banner */}
                <div className="w-full flex items-start gap-2.5 bg-[#ffc107] rounded-xl px-3 py-3.5">
                    <InfoIcon size={16} weight="fill" className="text-black flex-shrink-0 mt-0.5" />
                    <p className="text-[12px] text-black leading-[1.5] tracking-tight">
                        Please fill out the {person} information or else you won&apos;t be able to verify yourself at the {isEvent ? 'event venue' : 'trip meeting point'}
                    </p>
                </div>
            </div>

            {/* Fixed bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 px-5 py-6 bg-[#fff9f4]">
                <button
                    onClick={handleViewBookings}
                    className="w-full h-[51px] bg-[#ffc107] rounded-xl text-[14px] font-medium text-black tracking-tight active:opacity-80 transition-opacity"
                >
                    Complete {isEvent ? 'Participant' : 'Passenger'} Details
                </button>
            </div>
        </div>
    );
}
