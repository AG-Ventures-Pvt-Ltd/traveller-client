'use client'

import { TravelOptionsProps } from '../types';
import { CurrencyInrIcon } from '@phosphor-icons/react';

export default function TravelOptions({
    pricingList,
    selectedPricing,
    pricingInfoIndex,
    onSelect,
    onToggleInfo,
}: TravelOptionsProps) {
    return (
        <div className="border border-[#D9D9D9] rounded-2xl overflow-visible p-4">
            <div className="flex items-center justify-between">
                <span className="text-md font-medium text-black mb-3">Travel Options</span>
            </div>
            <div className="flex flex-col gap-5">
                {pricingList.map((pricing, index) => (
                    <div key={index} className="relative">
                        <div className="absolute -top-3 right-4 bg-[#FFD976] rounded-xl px-3 py-0.5 text-xs text-black z-10 whitespace-nowrap flex items-center font-medium">
                            <CurrencyInrIcon weight='bold'/>{pricing.pricePerPerson.toLocaleString()}
                        </div>
                        <div
                            onClick={() => onSelect(index)}
                            className={`flex flex-col justify-center rounded-xl border border-[#D9D9D9] px-4 py-3 cursor-pointer transition-colors ${selectedPricing === index ? 'bg-[#F4BFFF]' : ''
                                }`}
                        >
                            <div className='flex'>
                                <span className="text-black text-sm flex-1">{pricing.label}</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onToggleInfo(index); }}
                                    className={`text-sm underline flex-shrink-0 ${selectedPricing === index ? 'text-indigo-500' : 'text-blue-500'
                                        }`}
                                >
                                    View Details
                                </button>
                            </div>
                            {pricingInfoIndex === index && (
                                <p className="text-xs text-gray-700">{pricing.description}</p>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
