'use client';

import { MinusIcon, PlusIcon, UserIcon, EnvelopeSimpleIcon, PhoneIcon } from '@phosphor-icons/react';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import CustomInput from '@/common/ui/CustomInput';
import type { FormErrors } from './types';

interface TravelerDetailsCardProps {
    guests: number;
    onGuestsChange: (guests: number) => void;
    fullName: string;
    email: string;
    phone: string;
    errors: FormErrors;
    touched: Record<string, boolean>;
    onFullNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
    onBlur: (field: keyof FormErrors) => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function TravelerDetailsCard({
    guests,
    onGuestsChange,
    fullName,
    email,
    phone,
    errors,
    touched,
    onFullNameChange,
    onEmailChange,
    onPhoneChange,
    onBlur,
    isOpen,
    onToggle,
}: TravelerDetailsCardProps) {
    return (
        <CollapsibleCard title="Traveler Details" isOpen={isOpen} onToggle={onToggle}>

            {/* Number of Pax */}
            <div className="flex items-center justify-between px-4 pb-4">
                <p className="text-sm text-black">Number of Pax</p>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onGuestsChange(Math.max(1, guests - 1))}
                        className="w-9 h-9 rounded-full bg-[#EEA0FF] flex items-center justify-center active:opacity-70"
                    >
                        <MinusIcon size={18} weight="bold" />
                    </button>
                    <span className="text-2xl font-normal">{String(guests).padStart(2, '0')}</span>
                    <button
                        onClick={() => onGuestsChange(guests + 1)}
                        className="w-9 h-9 rounded-full bg-[#EEA0FF] flex items-center justify-center active:opacity-70"
                    >
                        <PlusIcon size={18} weight="bold" />
                    </button>
                </div>
            </div>

            <div className="mx-4 border-t border-[#D9D9D9] mb-3" />

            {/* Personal Info Fields */}
            <div className="flex flex-col gap-1.5 px-4 pb-5">
                <CustomInput
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => onFullNameChange(e.target.value)}
                    onBlur={() => onBlur('fullName')}
                    icon={UserIcon}
                    error={touched.fullName && !!errors.fullName}
                />
                {touched.fullName && errors.fullName && (
                    <p className="text-xs text-red-500 pl-1">{errors.fullName}</p>
                )}

                <CustomInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    onBlur={() => onBlur('email')}
                    icon={EnvelopeSimpleIcon}
                    error={touched.email && !!errors.email}
                />
                {touched.email && errors.email && (
                    <p className="text-xs text-red-500 pl-1">{errors.email}</p>
                )}

                <CustomInput
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => onPhoneChange(e.target.value)}
                    onBlur={() => onBlur('phone')}
                    icon={PhoneIcon}
                    error={touched.phone && !!errors.phone}
                />
                {touched.phone && errors.phone && (
                    <p className="text-xs text-red-500 pl-1">{errors.phone}</p>
                )}
            </div>
        </CollapsibleCard>
    );
}
