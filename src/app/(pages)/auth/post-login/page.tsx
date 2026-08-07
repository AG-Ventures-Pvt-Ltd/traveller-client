'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import SideBanner from '../components/SideBanner';
import PhoneNumberPromptPage from '../components/PhoneNumberPrompt/PhoneNumberPromptPage';
import { claimSpinReward } from '@/common/utils/claimSpinReward';

export default function PostLoginPage() {
    const { status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirectUrl') || '/';

    const { data: phoneData, isLoading: phoneLoading } = useGetData<{ exists: boolean }>(
        API_ENDPOINTS.USER.VALIDATE_PHONE,
        { enabled: status === 'authenticated', queryKey: [API_ENDPOINTS.USER.VALIDATE_PHONE] }
    );

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/auth?mode=login&method=otp');
        }
    }, [status, router]);

    useEffect(() => {
        if (status === 'authenticated') {
            claimSpinReward();
        }
    }, [status]);

    useEffect(() => {
        if (phoneData?.exists) {
            router.replace(redirectUrl);
        }
    }, [phoneData, redirectUrl, router]);

    if (status === 'loading' || phoneLoading || phoneData?.exists) {
        return null;
    }

    if (status === 'authenticated' && phoneData && !phoneData.exists) {
        return (
            <div className="flex bg-[#fff9f4] min-h-screen">
                <div className='md:w-1/2'>
                    <SideBanner />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-[10%] sm:px-[14%] md:px-[4%] lg:px-[8%] xl:px-[12%] py-8 bg-[#fff9f4]">
                    <PhoneNumberPromptPage onDone={() => router.replace(redirectUrl)} />
                </div>
            </div>
        );
    }

    return null;
}
