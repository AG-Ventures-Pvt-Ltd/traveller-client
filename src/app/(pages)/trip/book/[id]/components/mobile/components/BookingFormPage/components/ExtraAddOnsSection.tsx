'use client';

import CollapsibleCard from '@/common/ui/CollapsibleCard';
import SelectableItem from '@/common/components/atoms/SelectableItem';
import { useBookingFormStore } from '../hooks/useBookingFormStore';
import type { AddOn } from '../types';

interface ExtraAddOnsSectionProps {
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function ExtraAddOnsSection({ isOpen, onToggle }: ExtraAddOnsSectionProps) {
    const { addOns, selectedExtraAddOnIdx, setSelectedExtraAddOnIdx } = useBookingFormStore();

    const filteredAddOns = addOns.filter(addOn => addOn.category === 'others');

    if (filteredAddOns.length === 0) return null;

    return (
        <CollapsibleCard title="Extra Add Ons" overflow="visible" isOpen={isOpen} onToggle={onToggle}>
            <div className="flex flex-col gap-5 px-4 pb-4">
                {filteredAddOns.map((addOn) => {
                    const originalIdx = addOns.findIndex(originalAddOn => originalAddOn === addOn);
                    const isSelected = selectedExtraAddOnIdx === originalIdx;
                    return (
                        <SelectableItem
                            key={originalIdx}
                            isSelected={isSelected}
                            onClick={() => {
                                const newIdx = isSelected ? null : originalIdx;
                                setSelectedExtraAddOnIdx(newIdx);
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
