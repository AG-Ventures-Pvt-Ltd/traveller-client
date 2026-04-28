'use client'

import { BookingBarProps } from '../types';
import { getSeatsMessage } from '../utils';
import { CurrencyInrIcon } from '@phosphor-icons/react';

export default function BookingBar({
    selectedBatch,
    batches,
    selectedPricing,
    pricingList,
    basePrice,
    onBookNow,
}: BookingBarProps) {
    const seatsMsg =
        selectedBatch !== null && batches
            ? getSeatsMessage(batches[selectedBatch])
            : 'No seats available';

    const displayPrice =
        selectedPricing !== null && pricingList.length > 0
            ? pricingList[selectedPricing].pricePerPerson.toLocaleString()
            : (basePrice?.toLocaleString() || 0);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#EEA0FF] pl-8 pr-4 py-4 flex items-center justify-between shadow-lg rounded-t-3xl z-20">
            <div>
                <p className="text-sm font-medium text-black">{seatsMsg}</p>
                <p className="text-xl font-bold text-black flex items-center">
                    <CurrencyInrIcon weight='bold'/> {displayPrice}/ <span className="text-sm font-medium"> person</span>
                </p>
                <p className='font-medium'>+5% GST</p>
            </div>
            <button
                onClick={onBookNow}
                className="bg-black text-white px-4 py-2 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
                Book Now
            </button>
        </div>
    );
}
