'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import HeroSection from './components/HeroSection';
import ReferralCodeCard from './components/ReferralCodeCard';
import ProgressTracker from './components/ProgressTracker';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import ShareModal from './components/ShareModal';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import Loader from '@/common/ui/Loader/Loader';


const REFERRAL_TARGET = 8;

interface ReferralData {
    referralCode: string;
    totalReferralsCount: number;
}

const ReferralPage = () => {
    const { status } = useSession();
    const router = useRouter();
    const [showShareModal, setShowShareModal] = useState(false);

    const { data: referralData, isLoading } = useGetData<ReferralData>(API_ENDPOINTS.REFERRAL.GET_MY_REFERRAL_DATA);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth');
        }
    }, [status, router]);

    if (status === 'loading' || isLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <div className="bg-white flex flex-col">
            <HeroSection target={REFERRAL_TARGET} />

            <ReferralCodeCard referralCode={referralData?.referralCode || ''} />

            <ProgressTracker
                progress={referralData?.totalReferralsCount || 0}
                target={REFERRAL_TARGET}
            />

            <HowItWorks target={REFERRAL_TARGET} />

            <CTASection onShareClick={() => setShowShareModal(true)} />

            <ShareModal
                referralCode={referralData?.referralCode || ''}
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
            />
        </div>
    );
};

export default ReferralPage;