'use client';

import React, { useState, useRef, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/common/ui/Buttons/Button';
import { notify } from '@/common/utils/notify';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { useGetData } from '@/services/useGetData';
import PhoneNumberPromptPage from '../PhoneNumberPrompt/PhoneNumberPromptPage';
import SideBanner from '../SideBanner';
import { claimSpinReward } from '@/common/utils/claimSpinReward';

interface OtpVerificationPageProps {
    email: string;
    mode: string;
}

export default function OtpVerificationPage({
    email,
    mode,
}: OtpVerificationPageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirectUrl') || '/';
    
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [isResending, setIsResending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showPhonePrompt, setShowPhonePrompt] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { refetch: checkPhoneExists } = useGetData<{ exists: boolean }>(
        API_ENDPOINTS.USER.VALIDATE_PHONE,
        { enabled: false, queryKey: [API_ENDPOINTS.USER.VALIDATE_PHONE] }
    );

    const resendOtpMutation = usePostData({
        url: API_ENDPOINTS.USER.SEND_OTP,
    });
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Handle OTP input change
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('').concat(Array(6).fill(''));
        setOtp(newOtp.slice(0, 6));

        if (pastedData.length === 6) {
            inputRefs.current[5]?.focus();
        }
    };

    // Verify OTP via next-auth signIn
    const handleVerifyOtp = async () => {
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            notify.error('Please enter all 6 digits');
            return;
        }

        setIsVerifying(true);
        try {
            const result = await signIn('credentials', {
                email,
                otp: otpCode,
                provider: 'otp',
                mode,
            });

            if (result?.error) {
                let errorMessage = 'OTP verification failed!';
                try {
                    const parsed = JSON.parse(result.error);
                    errorMessage = parsed.message || errorMessage;
                } catch {
                    errorMessage = result.error;
                }
                notify.error(errorMessage);
                return;
            }

            if (result?.ok) {
                 if (mode === 'signup') {
                     await claimSpinReward();
                     router.push(redirectUrl);
                 } else {
                     // For login, check if user has a phone number
                     try {
                         const { data: phoneData } = await checkPhoneExists();
                         if (!phoneData?.exists) {
                             setShowPhonePrompt(true);
                             return;
                         }
                     } catch {
                         // If check fails, just redirect normally
                     }
                     router.push(redirectUrl);
                 }  
            }
        } catch (error) {
            notify.error((error as Error)?.message || 'OTP verification failed!');
        } finally {
            setIsVerifying(false);
        }
    };

    // Resend OTP
    const handleResendOtp = async () => {
        setIsResending(true);
        try {
            await resendOtpMutation.mutateAsync({
                email,
                mode,
                type: 'user',
            });

            setOtp(['', '', '', '', '', '']);
            setTimeLeft(300);
            notify.success('OTP resent successfully!');
        } catch (error) {
            const axiosError = error as {
                response?: { data?: { message?: string } };
            };
            const errorMessage =
                axiosError?.response?.data?.message ||
                (error as Error)?.message ||
                'Failed to resend OTP!';
            notify.error(errorMessage);
        } finally {
            setIsResending(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (showPhonePrompt) {
        return (
            <div className="flex bg-[#fff9f4] min-h-screen">
                <div className='md:w-1/2'>
                    <SideBanner />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-[10%] sm:px-[14%] md:px-[4%] lg:px-[8%] xl:px-[12%] py-8 bg-[#fff9f4]">
                    <PhoneNumberPromptPage onDone={() => router.push(redirectUrl)} />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-8">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-20 w-full text-center">
                <h1 className="text-black text-3xl font-extrabold font-['Rubik']">
                    Enter OTP
                </h1>
                <p className="text-gray-600 text-sm font-medium font-['Rubik']">
                    We sent an otp to <br />
                    <span className="font-semibold text-black">{email}</span>
                </p>
            </div>

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-3 mb-8">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#5a4eff] focus:outline-none transition-colors"
                        placeholder="-"
                    />
                ))}
            </div>

            {/* Timer and Resend */}
            <div className="text-center mb-6">
                {timeLeft > 0 ? (
                    <p className="text-gray-600 text-sm">
                        Resend code in{' '}
                        <span className="font-semibold text-black">{formatTime(timeLeft)}</span>
                    </p>
                ) : (
                    <button
                        onClick={handleResendOtp}
                        disabled={isResending}
                        className="text-[#5a4eff] underline font-medium text-sm hover:text-[#4a3edd] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isResending ? 'Resending...' : 'Resend Code'}
                    </button>
                )}
            </div>

            {/* Verify Button */}
            <div className='fixed bottom-0 left-0 w-full px-6 pb-8'>
                <Button
                    variant="purple"
                    type="button"
                    fullWidth
                    onClick={handleVerifyOtp}
                    disabled={otp.some((digit) => !digit) || isVerifying}
                    className="mb-4"
                >
                    {isVerifying ? 'Verifying...' : 'Verify OTP'}
                </Button>
            </div>
            {/* Change Email Link */}
            <div className="text-center">
                <p className="text-gray-600 text-sm">
                    Wrong email?{' '}
                    <button
                        onClick={() => window.history.back()}
                        className="text-[#5a4eff] underline font-medium hover:text-[#4a3edd]"
                    >
                        Go back
                    </button>
                </p>
            </div>
        </div>
    );
}
