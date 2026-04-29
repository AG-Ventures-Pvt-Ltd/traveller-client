'use client';

import { CheckIcon, CurrencyInrIcon } from '@phosphor-icons/react';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import type { AddOn } from './types';

interface TransportOptionsSectionProps {
    addOns: AddOn[];
    selectedAddOnIdx: number | null;
    onSelect: (idx: number | null) => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function TransportOptionsSection({ addOns, selectedAddOnIdx, onSelect, isOpen, onToggle }: TransportOptionsSectionProps) {
    const filteredAddOns = addOns.filter(addOn => addOn.category === 'bike_upgrade');

    if (filteredAddOns.length === 0) return null;

    return (
        <CollapsibleCard title="Transport Options" overflow="visible" isOpen={isOpen} onToggle={onToggle}>
            <div className="flex flex-col gap-5 px-4 pb-4">
                {filteredAddOns.map((addOn) => {
                    const originalIdx = addOns.findIndex(originalAddOn => originalAddOn === addOn);
                    const isSelected = selectedAddOnIdx === originalIdx;
                    return (
                        <div key={originalIdx} className="relative">
                            <div className="absolute -top-3 right-4 bg-[#FFD976] rounded-xl px-3 py-0.5 z-10 flex items-center gap-0.5">
                                <span className="text-xs font-medium text-black flex items-center">
                                    +<CurrencyInrIcon weight="bold" size={11} />
                                    {addOn.pricePerPerson?.toLocaleString()}
                                </span>
                            </div>
                            <div
                                onClick={() => onSelect(isSelected ? null : originalIdx)}
                                className={`flex items-center gap-3 rounded-xl border border-[#D9D9D9] px-4 py-3 cursor-pointer transition-colors ${isSelected ? 'bg-[#F4BFFF]' : ''}`}
                            >
                                <span className="text-black text-sm flex-1">{addOn.label}</span>
                                {addOn.description && (
                                    <span className="text-xs text-zinc-500 flex-shrink-0">{addOn.description}</span>
                                )}
                                {isSelected && (
                                    <CheckIcon size={20} weight="bold" className="text-black flex-shrink-0" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </CollapsibleCard>
    );
}
