'use client';

import type { ElementType } from 'react';
import { CheckIcon, CurrencyInrIcon, NumberCircleFourIcon, NumberCircleThreeIcon, NumberCircleTwoIcon, NumberCircleOneIcon } from '@phosphor-icons/react';

// Icon mapping for auto-detection based on label words
export const ICON_WORD_MAPPING: Record<string, string[]> = {
    'quad_sharing_room' : ['quad','four'],
    'triple_sharing_room' : ['triple','three'],
    'double_sharing_room' : ['double','two'],
    'single_room' : ['single'],
};

// Icon component mapping
const ICON_COMPONENTS: Record<string, ElementType> = {
    quad_sharing_room : NumberCircleFourIcon,
    triple_sharing_room : NumberCircleThreeIcon,
    double_sharing_room : NumberCircleTwoIcon,
    single_room : NumberCircleOneIcon
};

// Function to detect icon from label words
export function detectIconFromLabel(label: string): ElementType | undefined {
    const words = label.toLowerCase().split(/\s+/);
    
    for (const [iconName, keywords] of Object.entries(ICON_WORD_MAPPING)) {
        for (const word of words) {
            if (keywords.includes(word)) {
                return ICON_COMPONENTS[iconName];
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
    /** Custom badge text that takes precedence over price badge */
    badgeLabel?: string;
    /** Show check icon when selected (default: true). If false, expandable text can be shown instead */
    showCheckIcon?: boolean;
    /** Expandable text to show instead of check icon when selected */
    expandableText?: {
        label: string;
        onClick: (e: React.MouseEvent) => void;
    };
    /** Auto-detect icon from label words (default: false) */
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