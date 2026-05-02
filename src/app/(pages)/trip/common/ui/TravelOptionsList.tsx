'use client';

import SelectableItem from '@/common/components/atoms/SelectableItem';
import type { ElementType } from 'react';

export interface TravelOptionItem {
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: ElementType<any>;
    /** Custom badge text (e.g. "+₹500"). Takes precedence over pricePerPerson badge. */
    badgeLabel?: string;
    /** If set (and no badgeLabel), shows a ₹X price badge */
    pricePerPerson?: number;
    description?: string;
}

interface TravelOptionsListProps {
    items: TravelOptionItem[];
    selectedIndex: number | null;
    expandedIndex?: number | null;
    onSelect: (index: number) => void;
    onToggleInfo?: (index: number) => void;
    /** Show a check icon on the right when an item is selected */
    showCheckOnSelect?: boolean;
}

export default function TravelOptionsList({
    items,
    selectedIndex,
    expandedIndex,
    onSelect,
    onToggleInfo,
}: TravelOptionsListProps) {

    const isSingleItem = items.length === 1;
    const effectiveSelectedIndex = isSingleItem ? 0 : selectedIndex;

    return (
        <div className="flex flex-col gap-5">
            {items.map((item, index) => {
                const isSelected = effectiveSelectedIndex === index;
                const hasBadge = item.badgeLabel !== undefined || item.pricePerPerson !== undefined;

                return (
                    <div key={index}>
                        <SelectableItem
                            isSelected={isSelected}
                            onClick={() => !isSingleItem && onSelect(index)}
                            label={item.label}
                            icon={item.icon}
                            price={item.pricePerPerson}
                            badgeLabel={item.badgeLabel}
                            showPriceBadge={hasBadge}
                            showPlusInPrice={false}
                            showCheckIcon={!onToggleInfo || !item.description}
                            autoDetectIcon={!item.icon}
                            expandableText={
                                onToggleInfo && item.description
                                    ? {
                                        label: expandedIndex === index ? 'Collapse' : 'View Details',
                                        onClick: (e) => {
                                            e.stopPropagation();
                                            onToggleInfo(index);
                                        },
                                    }
                                    : undefined
                            }
                            description={expandedIndex === index ? item.description : ""}
                        />
                    </div>
                );
            })}
        </div>
    );
}
