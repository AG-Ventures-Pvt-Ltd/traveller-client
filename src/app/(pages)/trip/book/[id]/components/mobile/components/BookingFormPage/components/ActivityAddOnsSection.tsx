'use client';

import CollapsibleCard from '@/common/ui/CollapsibleCard';
import SelectableItem from '@/common/components/atoms/SelectableItem';
import { useBookingFormStore } from '../hooks/useBookingFormStore';

interface ActivityAddOnsSectionProps {
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function ActivityAddOnsSection({ isOpen, onToggle }: ActivityAddOnsSectionProps) {
    const { addOns, selectedActivityAddOnIdx, setSelectedActivityAddOnIdx } = useBookingFormStore();

    const filteredAddOns = addOns.filter(addOn => addOn.category === 'extra_activity');

    if (filteredAddOns.length === 0) return null;

    return (
        <CollapsibleCard title="Activity Add Ons" overflow="visible" isOpen={isOpen} onToggle={onToggle}>
            <div className="flex flex-col gap-5 px-4 pb-4">
                {filteredAddOns.map((addOn) => {
                    const originalIdx = addOns.findIndex(originalAddOn => originalAddOn === addOn);
                    const isSelected = selectedActivityAddOnIdx === originalIdx;
                    return (
                        <SelectableItem
                            key={originalIdx}
                            isSelected={isSelected}
                            onClick={() => {
                                const newIdx = isSelected ? null : originalIdx;
                                setSelectedActivityAddOnIdx(newIdx);
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
