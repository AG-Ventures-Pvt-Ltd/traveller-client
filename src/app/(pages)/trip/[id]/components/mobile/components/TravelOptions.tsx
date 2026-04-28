'use client'

import { TravelOptionsProps } from '../types';
import TravelOptionsList from '@/app/(pages)/trip/common/ui/TravelOptionsList';

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
            <TravelOptionsList
                items={pricingList}
                selectedIndex={selectedPricing}
                expandedIndex={pricingInfoIndex}
                onSelect={onSelect}
                onToggleInfo={onToggleInfo}
            />
        </div>
    );
}
