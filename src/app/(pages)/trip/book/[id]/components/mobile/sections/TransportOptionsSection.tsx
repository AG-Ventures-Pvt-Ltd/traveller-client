'use client';

import CollapsibleCard from '@/common/ui/CollapsibleCard';
import SelectableItem from '@/common/components/atoms/SelectableItem';
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
