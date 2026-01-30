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

const REFERRAL_TARGET = 8;

const ReferralPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [showShareModal, setShowShareModal] = useState(false);
    const [countdown, setCountdown] = useState('');

    // Redirect if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth');
        }
    }, [status, router]);

    // Countdown to midnight (12 AM tonight)
    useEffect(() => {
        const calculateCountdown = () => {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0); // Set to midnight tonight

            const diff = midnight.getTime() - now.getTime();

            if (diff <= 0) {
                setCountdown('00:00:00');
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdown(
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            );
        };

        calculateCountdown();
        const interval = setInterval(calculateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    // Mock data - Backend disconnected temporarily
    const referralData = {
        referralCode: countdown, // Using countdown instead of referral code
        successfulReferrals: 0 // Set to 0 by default
    };

    const isLoading = false;

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
