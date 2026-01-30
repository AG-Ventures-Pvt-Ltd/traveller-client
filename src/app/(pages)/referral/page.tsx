'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

import HeroSection from './components/HeroSection';
import ReferralCodeCard from './components/ReferralCodeCard';
import ProgressTracker from './components/ProgressTracker';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import ShareModal from './components/ShareModal';

const REFERRAL_TARGET = 8;

// Type for the API response data
interface ReferralData {
    referralCode: string;
    successfulReferrals: number;
}

// Type for the API response structure
interface ReferralApiResponse {
    success: boolean;
    data: ReferralData;
    message: string;
}

const ReferralPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [showShareModal, setShowShareModal] = useState(false);

    // Redirect if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth');
        }
    }, [status, router]);

    // Use the custom hook to fetch referral data
    const { data: referralData, isLoading, error, refetch } = useGetData<ReferralData>(
        API_ENDPOINTS.REFERRAL.GET_MY_REFERRAL_DATA
    );

    // Loading state
    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
                    <p className="text-neutral-700 text-base font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !referralData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 max-w-md text-center">
                    <p className="text-neutral-900 text-xl font-bold">
                        {error?.message || 'Unable to load referral data'}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-neutral-900 text-white rounded-xl px-6 py-3 font-bold hover:bg-neutral-800 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white flex flex-col">
            <HeroSection target={REFERRAL_TARGET} />

            <ReferralCodeCard referralCode={referralData.referralCode} />

            <ProgressTracker
                progress={referralData.successfulReferrals}
                target={REFERRAL_TARGET}
            />

            <HowItWorks target={REFERRAL_TARGET} />

            <CTASection onShareClick={() => setShowShareModal(true)} />

            <ShareModal
                referralCode={referralData.referralCode}
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
            />
        </div>
    );
};

export default ReferralPage;
