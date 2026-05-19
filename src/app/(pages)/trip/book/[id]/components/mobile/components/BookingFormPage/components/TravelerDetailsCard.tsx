'use client';

import { useState, useEffect, useRef } from 'react';
import { UserIcon, EnvelopeSimpleIcon, PhoneIcon, InfoIcon } from '@phosphor-icons/react';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import CustomInput from '@/common/ui/CustomInput';
import { useQuery } from '@tanstack/react-query';
import { getData } from '@/services/baseApi';
import { email } from '@/common/utils/formValidators';
import type { FormErrors } from '../types';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { useBookingFormStore } from '../hooks/useBookingFormStore';
import { useSession } from 'next-auth/react';
import { useGetData } from '@/services/useGetData';

interface TravelerDetailsCardProps {
    isOpen?: boolean;
    onToggle?: () => void;
}

interface EmailValidationResponse {
    exists: boolean;
}

interface UserData {
    email?: string;
    fullName?: string;
    phone?: string;
}

export default function TravelerDetailsCard({
    isOpen,
    onToggle,
}: TravelerDetailsCardProps) {
    const {
        fullName,
        email: emailValue,
        phone,
        errors,
        touched,
        setFullName,
        setEmail,
        setPhone,
        setErrors,
        setTouched,
    } = useBookingFormStore();

    const [emailExists, setEmailExists] = useState<boolean | null>(null);
    const [emailLocked, setEmailLocked] = useState(false);
    const preFillDone = useRef(false);

    const { data: session, status } = useSession();
    
    const { data: userData } = useGetData<UserData>(API_ENDPOINTS.USER.ME('booking'), { queryKey: ['user', 'booking'], retry : false })

    // Pre-fill form with userData only if authenticated
    useEffect(() => {
        if (!preFillDone.current && status === 'authenticated' && session?.user && userData) {
            if (session.user.email) {
                setEmail(session.user.email);
                setEmailLocked(true);
            }
            if (session.user.fullName) {
                setFullName(session.user.fullName);
            }
            if (userData.phone) {
                setPhone(userData.phone);
            }
            preFillDone.current = true;
        }
    }, [status, session, userData, setEmail, setFullName, setPhone]);

    // Check if email is valid - trim whitespace and validate format
    const trimmedEmail = emailValue.trim();
    const emailValidationError = email()(trimmedEmail);
    const isEmailValid = !emailValidationError && trimmedEmail.length > 0;

    // API call to validate email existence - only when email is valid
    const { data: emailValidationData } = useQuery<EmailValidationResponse>({
        queryKey: ['email-validation', trimmedEmail],
        queryFn: () => getData<EmailValidationResponse>(API_ENDPOINTS.BOOKINGS.VALIDATE_EMAIL_REGISTRATION(trimmedEmail)),
        enabled: isEmailValid,
        staleTime: 5 * 60 * 1000, 
    });

    // Update email exists state when API response changes
    useEffect(() => {
        if (emailValidationData) {
            setEmailExists(emailValidationData.exists);
        }
    }, [emailValidationData]);

    // Reset email exists state when email changes
    useEffect(() => {
        setEmailExists(null);
    }, [trimmedEmail]);

    const handleBlur = (field: keyof FormErrors) => {
        setTouched({ ...touched, [field]: true });
        const error = field === 'fullName' ? '' : field === 'email' ? (emailValidationError || '') : '';
        setErrors({ ...errors, [field]: error });
    };

    return (
        <CollapsibleCard title="Traveler Details" isOpen={isOpen} onToggle={onToggle}>

            <div className="flex flex-col gap-1.5 px-4 pb-5">
                <CustomInput
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    icon={UserIcon}
                    error={touched.fullName && !!errors.fullName}
                />
                {touched.fullName && errors.fullName && (
                    <p className="text-xs text-red-500 pl-1">{errors.fullName}</p>
                )}

                <CustomInput
                    type="email"
                    placeholder="Email"
                    value={emailValue}
                    onChange={(e) => !emailLocked && setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    icon={EnvelopeSimpleIcon}
                    error={touched.email && !!errors.email}
                    readOnly={emailLocked}
                />
                {touched.email && errors.email && (
                    <p className="text-xs text-red-500 pl-1">{errors.email}</p>
                )}

                <CustomInput
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    icon={PhoneIcon}
                    error={touched.phone && !!errors.phone}
                />
                {touched.phone && errors.phone && (
                    <p className="text-xs text-red-500 pl-1">{errors.phone}</p>
                )}

                <div className='flex items-center gap-2 text-xs'>
                    <InfoIcon weight='thin' size={20}/>
                    you can fill other passenger details later
                </div>

                {emailExists === true && (
                    <p className="text-xs pl-1 mt-2">
                        You&apos;ve booked with us before! Log in to get your details pre-filled.
                    </p>
                )}
            </div>
        </CollapsibleCard>
    );
}
