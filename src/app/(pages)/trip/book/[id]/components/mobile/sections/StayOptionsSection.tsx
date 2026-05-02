'use client';

import CollapsibleCard from '@/common/ui/CollapsibleCard';
import SelectableItem from '@/common/components/atoms/SelectableItem';
import type { AddOn } from './types';

interface StayOptionsSectionProps {
    addOns: AddOn[];
    selectedAddOnIdx: number | null;
    onSelect: (idx: number | null) => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function StayOptionsSection({ addOns, selectedAddOnIdx, onSelect, isOpen, onToggle }: StayOptionsSectionProps) {
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
                            onClick={() => onSelect(isSelected ? null : originalIdx)}
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
