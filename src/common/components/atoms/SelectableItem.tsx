'use client';

import type { ElementType } from 'react';
import { CheckIcon, CurrencyInrIcon } from '@phosphor-icons/react';
import { ICON_CONFIG } from '@/common/constants/iconConfig';


export function detectIconFromLabel(label: string): ElementType | undefined {
    const words = label.toLowerCase().split(/\s+/);

    for (const [, config] of Object.entries(ICON_CONFIG)) {
        for (const word of words) {
            if (config.words.includes(word)) {
                return config.icon;
            }
        }
    }

    return undefined;
}

interface SelectableItemProps {
    isSelected: boolean;
    onClick: () => void;
    label: string;
    description?: string;
    price?: number;
    showPriceBadge?: boolean;
    showPlusInPrice?: boolean;
    icon?: ElementType;
    badgeLabel?: string;
    showCheckIcon?: boolean;
    expandableText?: {
        label: string;
        onClick: (e: React.MouseEvent) => void;
    };
    autoDetectIcon?: boolean;
}

export default function SelectableItem({
    isSelected,
    onClick,
    label,
    description,
    price,
    showPriceBadge = true,
    showPlusInPrice = true,
    icon: Icon,
    badgeLabel,
    showCheckIcon = true,
    expandableText,
    autoDetectIcon = false,
}: SelectableItemProps) {
    const shouldShowBadge = showPriceBadge && (badgeLabel !== undefined || (price !== undefined && price > 0));

    // Determine which icon to use
    const detectedIcon = autoDetectIcon ? detectIconFromLabel(label) : undefined;
    const IconComponent = Icon || detectedIcon;

    return (
        <div className="relative">
            {shouldShowBadge && (
                <div className="absolute -top-3 right-4 bg-[#FFD976] rounded-xl px-3 py-0.5 z-10 flex items-center gap-0.5">
                    <span className="text-xs font-medium text-black flex items-center">
                        {badgeLabel !== undefined ? (
                            badgeLabel
                        ) : (
                            <>
                                {showPlusInPrice && '+'}
                                <CurrencyInrIcon weight="bold" size={11} />
                                {price!.toLocaleString()}
                            </>
                        )}
                    </span>
                </div>
            )}
            <div
                onClick={onClick}
                className={`flex flex-col rounded-xl border border-[#D9D9D9] px-4 py-3 cursor-pointer transition-colors ${isSelected ? 'bg-[#F4BFFF]' : ''
                    }`}
            >
                <div className='flex items-center gap-3'>
                    {IconComponent && <IconComponent size={22} weight="thin" className="flex-shrink-0" />}
                    <span className="text-black text-sm flex-1">{label}</span>
                    {isSelected && showCheckIcon && (
                        <CheckIcon size={20} weight="bold" className="text-black flex-shrink-0" />
                    )}
                    {isSelected && !showCheckIcon && expandableText && (
                        <button
                            onClick={expandableText.onClick}
                            className="text-sm underline flex-shrink-0 text-indigo-500"
                        >
                            {expandableText.label}
                        </button>
                    )}
                </div>
                <div>
                    {description && (
                        <span className="text-xs flex-shrink-0">{description}</span>
                    )}
                </div>
            </div>
        </div>
    );
}