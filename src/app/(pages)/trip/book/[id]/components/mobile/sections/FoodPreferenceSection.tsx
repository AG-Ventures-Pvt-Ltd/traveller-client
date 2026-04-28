'use client';

import CollapsibleCard from '@/common/ui/CollapsibleCard';

type FoodPreference = 'veg' | 'non-veg' | null;

const OPTIONS: { id: FoodPreference & string; label: string }[] = [
    { id: 'veg', label: 'Veg' },
    { id: 'non-veg', label: 'Non-Veg' },
];

interface FoodPreferenceSectionProps {
    value: FoodPreference;
    onChange: (value: FoodPreference) => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function FoodPreferenceSection({ value, onChange, isOpen, onToggle }: FoodPreferenceSectionProps) {
    return (
        <CollapsibleCard title="Food preference" isOpen={isOpen} onToggle={onToggle}>
            <div className="flex items-center gap-6 px-4 pb-5">
                {OPTIONS.map((opt) => {
                    const isSelected = value === opt.id;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => onChange(isSelected ? null : opt.id)}
                            className="flex items-center gap-2.5"
                        >
                            {/* Radio circle */}
                            <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${isSelected ? 'border-[#3F51B5] bg-[#3F51B5]' : 'border-[#9E9E9E] bg-white'}`} />
                            <span className="text-[16px] text-black tracking-[-0.48px]">{opt.label}</span>
                        </button>
                    );
                })}
            </div>
        </CollapsibleCard>
    );
}
