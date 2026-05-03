'use client';

import CollapsibleCard from '@/common/ui/CollapsibleCard';
import SelectableItem from '@/common/components/atoms/SelectableItem';
import { useBookingFormStore } from '../hooks/useBookingFormStore';
import type { AddOn } from '../types';

interface StayOptionsSectionProps {
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function StayOptionsSection({ isOpen, onToggle }: StayOptionsSectionProps) {
    const { addOns, selectedAddOnIdx, setSelectedAddOnIdx } = useBookingFormStore();

    const roomUpgradeAddOns = addOns.filter(addOn => addOn.category === 'room_upgrade');

    if (roomUpgradeAddOns.length === 0) return null;

    return (
        <CollapsibleCard title="Stay Options" overflow="visible" isOpen={isOpen} onToggle={onToggle}>
            <div className="flex flex-col gap-5 px-4 pb-4">
                {roomUpgradeAddOns.map((addOn) => {
                    // Find the original index in the full addOns array
                    const originalIdx = addOns.findIndex(originalAddOn => originalAddOn === addOn);
                    const isSelected = selectedAddOnIdx === originalIdx;
                    return (
                        <SelectableItem
                            key={originalIdx}
                            isSelected={isSelected}
                            onClick={() => {
                                const newIdx = isSelected ? null : originalIdx;
                                setSelectedAddOnIdx(newIdx);
                            }}
                            label={addOn.label}
                            // description={addOn.description}
                            price={addOn.pricePerPerson}
                            autoDetectIcon={true}
                        />
                    );
                })}
            </div>
        </CollapsibleCard>
    );
}
