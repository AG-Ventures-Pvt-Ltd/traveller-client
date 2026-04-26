'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, ChevronDown } from 'lucide-react';
import BackButton from '@/common/ui/BackButton';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { ExistingTravelersResponse } from '../types';
import { validators } from '@/common/utils/formValidators';

export interface PersonalDetailsData {
    fullName: string;
    email: string;
    phone: string;
    travelerId?: string;
}

interface PersonalDetailsProps {
    onContinue: (data: PersonalDetailsData) => void;
    onBack?: () => void;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
}

export default function PersonalDetails({ onContinue, onBack }: PersonalDetailsProps) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [ownerId, setOwnerId] = useState<string | undefined>(undefined);

    const { data: travelersResponse } = useGetData<ExistingTravelersResponse>(
        `${API_ENDPOINTS.GUEST_USERS.GET}?location=booking`
    );

    useEffect(() => {
        const owner = travelersResponse?.owner;
        if (owner) {
            if (owner.fullName) setFullName(owner.fullName);
            if (owner.email) setEmail(owner.email);
            if (owner.phone) setPhone(owner.phone);
            setOwnerId(owner._id);
        }
    }, [travelersResponse]);

    const validateField = (field: keyof FormErrors, value: string): string | undefined => {
        switch (field) {
            case 'fullName':
                return validators.fullName(value);
            case 'email':
                return validators.email(value);
            case 'phone':
                return validators.phone(value);
        }
    };

    const handleBlur = (field: keyof FormErrors) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const value = field === 'fullName' ? fullName : field === 'email' ? email : phone;
        const error = validateField(field, value);
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleSubmit = () => {
        const newErrors: FormErrors = {
            fullName: validateField('fullName', fullName),
            email: validateField('email', email),
            phone: validateField('phone', phone),
        };
        setErrors(newErrors);
        setTouched({ fullName: true, email: true, phone: true });

        if (!newErrors.fullName && !newErrors.email && !newErrors.phone) {
            onContinue({ fullName, email, phone, travelerId: ownerId });
        }
    };

    const inputClass = (field: keyof FormErrors) =>
        `flex-1 bg-transparent text-sm text-black placeholder-black/40 outline-none ${
            touched[field] && errors[field] ? 'placeholder-red-400' : ''
        }`;

    const rowClass = (field: keyof FormErrors) =>
        `flex items-center gap-3 px-3 py-5 rounded-xl border ${
            touched[field] && errors[field]
                ? 'border-red-400'
                : 'border-zinc-300'
        }`;

    return (
        <div className="flex flex-col min-h-screen bg-stone-50">
            {/* Header */}
            <div className="px-5 pt-14 pb-4">
                <BackButton
                    label="Fill personal details"
                    onClick={onBack}
                    className="gap-4"
                />
            </div>

            {/* Traveler Card */}
            <div className="mx-5 rounded-2xl border border-zinc-300 overflow-hidden">
                {/* Card Header */}
                <div className="flex items-center justify-between px-3 pt-5 pb-3">
                    <p className="text-xs text-black">
                        Traveler 1 (Primary Traveler){' '}
                        <span className="text-red-500">*</span>
                    </p>
                    <ChevronDown className="w-4 h-4 text-black" />
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-1.5 px-5 pb-5">
                    {/* Full Name */}
                    <div className={rowClass('fullName')}>
                        <User className="w-5 h-5 text-black flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onBlur={() => handleBlur('fullName')}
                            className={inputClass('fullName')}
                        />
                    </div>
                    {touched.fullName && errors.fullName && (
                        <p className="text-xs text-red-500 pl-1">{errors.fullName}</p>
                    )}

                    {/* Email */}
                    <div className={rowClass('email')}>
                        <Mail className="w-5 h-5 text-black flex-shrink-0" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => handleBlur('email')}
                            className={inputClass('email')}
                        />
                    </div>
                    {touched.email && errors.email && (
                        <p className="text-xs text-red-500 pl-1">{errors.email}</p>
                    )}

                    {/* Phone */}
                    <div className={rowClass('phone')}>
                        <Phone className="w-5 h-5 text-black flex-shrink-0" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => handleBlur('phone')}
                            className={inputClass('phone')}
                        />
                    </div>
                    {touched.phone && errors.phone && (
                        <p className="text-xs text-red-500 pl-1">{errors.phone}</p>
                    )}
                </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Continue Button */}
            <div className="px-5 py-7 bg-stone-50">
                <button
                    onClick={handleSubmit}
                    className="w-full py-4 bg-yellow-400 rounded-xl text-black text-base font-normal text-center active:opacity-80 transition-opacity"
                >
                    Continue to booking Summary
                </button>
            </div>
        </div>
    );
}
