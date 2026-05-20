'use client';

import React, { useState } from 'react';
import { PhoneIcon } from '@phosphor-icons/react';
import Button from '@/common/ui/Buttons/Button';
import CustomInput from '@/common/ui/CustomInput';
import { notify } from '@/common/utils/notify';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface PhoneNumberPromptPageProps {
    onDone: () => void; // called after saving or skipping
}

export default function PhoneNumberPromptPage({ onDone }: PhoneNumberPromptPageProps) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const updatePhoneMutation = usePostData({
        url: API_ENDPOINTS.USER.UPDATE_PHONE,
        enableNotifications: false,
    });

    const handleSubmit = async () => {
        if (!phoneNumber.trim()) {
            setError('Please enter your phone number');
            return;
        }
        const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
        if (!phoneRegex.test(phoneNumber.trim())) {
            setError('Please enter a valid phone number');
            return;
        }

        try {
            await updatePhoneMutation.mutateAsync({ phoneNumber: phoneNumber.trim() });
            notify.success('Phone number saved!');
            onDone();
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            setError(axiosError?.response?.data?.message || 'Failed to save phone number');
        }
    };

    return (
        <div className="w-full max-w-sm flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-black text-3xl font-extrabold font-['Rubik']">
                    Add Phone Number
                </h1>
            </div>

            <div className="flex flex-col gap-1.5">
                <CustomInput
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setError('');
                    }}
                    icon={PhoneIcon}
                />
                {error && (
                    <p className="text-xs text-red-500 pl-1">{error}</p>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <Button
                    variant="purple"
                    type="button"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={updatePhoneMutation.isPending}
                >
                    {updatePhoneMutation.isPending ? 'Saving...' : 'Save Phone Number'}
                </Button>
            </div>
        </div>
    );
}
