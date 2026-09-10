'use client'

import { CurrencyInrIcon } from '@phosphor-icons/react';

interface BookingBarProps {
    displayPrice: string | number;
    onBookNow: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export default function BookingBar({
    displayPrice,
    onBookNow,
    isLoading = false,
    disabled = false,
}: BookingBarProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#EEA0FF] pl-8 pr-4 py-5 flex items-center justify-between shadow-lg rounded-t-3xl z-20">
            <div>
                <p className="text-xl font-bold text-black flex items-end">
                    <span className='flex items-center'><CurrencyInrIcon weight='bold' /> {displayPrice}/</span>
                    <span className="text-sm font-medium pl-1"> person</span>
                </p>
                <p className='font-medium'>+5% GST</p>
            </div>
            <button
                onClick={onBookNow}
                disabled={isLoading || disabled}
                className="bg-black text-white px-4 py-2 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {disabled ? 'No dates available' : isLoading ? 'Loading…' : 'Book Now'}
            </button>
        </div>
    );
}
