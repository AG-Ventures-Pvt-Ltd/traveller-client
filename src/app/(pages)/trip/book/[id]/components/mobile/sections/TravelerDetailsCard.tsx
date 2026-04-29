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
