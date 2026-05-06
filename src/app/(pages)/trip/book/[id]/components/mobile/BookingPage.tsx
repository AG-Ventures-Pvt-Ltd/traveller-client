'use client';

import { useEffect, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useBookingNavStore } from '../../[batchId]/store/useBookingNavStore';
import BookingFormPage, { BookingFormData } from './components/BookingFormPage/BookingFormPage';
import ReviewInfo from './components/ReviewInfo/ReviewInfo';
import AllCouponsPage from './components/AllCouponsPage';
import type { Coupon } from './components/BookingFormPage/types';


type Step = 'reservation' | 'review' | 'coupons';

const STEP_CONFIG: Record<Step, { headerLabel: string; buttonLabel: string }> = {
    reservation: { headerLabel: 'Book your trip', buttonLabel: 'Continue to Review' },
    review: { headerLabel: 'Review information', buttonLabel: 'Confirm & Pay' },
    coupons: { headerLabel: 'All coupons', buttonLabel: 'Done' },
};

export default function BookingPage() {

    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const tripId = params.id as string;
    const batchId = searchParams.get('batchId') || '';
    const step = (searchParams.get('step') || 'reservation') as Step;

    const { setHeaderLabel, setButtonLabel, setBackAction, setContinueAction } = useBookingNavStore();

    const bookingDataRef = useRef<BookingFormData | null>(null);
    const couponsRef = useRef<Coupon[]>([]);

    const goToStep = (nextStep: Step) => {
        const p = new URLSearchParams(searchParams.toString());
        p.set('step', nextStep);
        router.push(`?${p.toString()}`);
    };

    useEffect(() => {
        const config = STEP_CONFIG[step] ?? STEP_CONFIG.reservation;
        setHeaderLabel(config.headerLabel);
        
        if (step !== 'review' && step !== 'reservation') {
            setContinueAction(null);
        }
    }, [step, setHeaderLabel, setButtonLabel, setContinueAction]);

    useEffect(() => {
        if (step === 'reservation') {
            setBackAction(() => router.push(`/trip/${tripId}`));
        } else if (step === 'review') {
            setBackAction(() => goToStep('reservation'));
        } else if (step === 'coupons') {
            setBackAction(() => goToStep('reservation'));
        }
    }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

    // Check localStorage for bookingId and add to query params if not present
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const existingBookingId = searchParams.get('bookingId');
            if (!existingBookingId) {
                const storedBookingId = localStorage.getItem(`booking_${tripId.split('-').pop()}`);
                if (storedBookingId) {
                    const p = new URLSearchParams(searchParams.toString());
                    p.set('bookingId', storedBookingId);
                    router.replace(`?${p.toString()}`);
                }
            }
        }
    }, [tripId, searchParams, router]);

    const handleBookingContinue = (data: BookingFormData) => {
        bookingDataRef.current = data;
        goToStep('review');
    };

    const handleViewCoupons = (coupons: Coupon[]) => {
        couponsRef.current = coupons;
        goToStep('coupons');
    };

    if (step === 'reservation') {
        return (
            <BookingFormPage
                tripId={tripId.split('-').pop() || ''}
                batchId={batchId}
                onContinue={handleBookingContinue}
                onViewCoupons={handleViewCoupons}
            />
        );
    }

    if (step === 'coupons') {
        return (
            <AllCouponsPage
                tripId={tripId.split('-').pop() || ''}
                onDone={() => goToStep('reservation')}
            />
        );
    }

    if (step === 'review') {
        return (
            <ReviewInfo/>
        );
    }

    return null;
}
