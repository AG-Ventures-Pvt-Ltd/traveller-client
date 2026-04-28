'use client';

import type { ElementType } from 'react';
import { CheckIcon, CurrencyInrIcon } from '@phosphor-icons/react';

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
    showCheckOnSelect,
}: TravelOptionsListProps) {
    return (
        <div className="flex flex-col gap-5">
            {items.map((item, index) => {
                const Icon = item.icon;
                const isSelected = selectedIndex === index;
                const hasBadge = item.badgeLabel !== undefined || item.pricePerPerson !== undefined;
                return (
                    <div key={index} className="relative">
                        {hasBadge && (
                            <div className="absolute -top-3 right-4 bg-[#FFD976] rounded-xl px-3 py-0.5 text-xs text-black z-10 whitespace-nowrap flex items-center font-medium">
                                {item.badgeLabel !== undefined ? (
                                    item.badgeLabel
                                ) : (
                                    <><CurrencyInrIcon weight="bold" />{item.pricePerPerson!.toLocaleString()}</>
                                )}
                            </div>
                        )}
                        <div
                            onClick={() => onSelect(index)}
                            className={`flex flex-col justify-center rounded-xl border border-[#D9D9D9] px-4 py-3 cursor-pointer transition-colors ${isSelected ? 'bg-[#F4BFFF]' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                {Icon && <Icon size={22} weight="regular" className="flex-shrink-0" />}
                                <span className="text-black text-sm flex-1">{item.label}</span>
                                {onToggleInfo && item.description && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onToggleInfo(index); }}
                                        className={`text-sm underline flex-shrink-0 ${isSelected ? 'text-indigo-500' : 'text-blue-500'}`}
                                    >
                                        View Details
                                    </button>
                                )}
                                {showCheckOnSelect && isSelected && (
                                    <CheckIcon size={20} weight="bold" className="text-black flex-shrink-0" />
                                )}
                            </div>
                            {expandedIndex === index && item.description && (
                                <p className="text-xs text-gray-700 mt-1">{item.description}</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
