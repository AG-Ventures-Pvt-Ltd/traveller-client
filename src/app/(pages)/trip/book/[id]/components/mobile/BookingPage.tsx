'use client';

import { useEffect, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useBookingNavStore } from '../../[batchId]/store/useBookingNavStore';
import BookingFormPage, { BookingFormData } from './components/BookingFormPage';
import ReviewInfo from './components/ReviewInfo';

type Step = 'reservation' | 'review';

const STEP_CONFIG: Record<Step, { headerLabel: string; buttonLabel: string }> = {
    reservation: { headerLabel: 'Book your trip', buttonLabel: 'Continue to Review' },
    review: { headerLabel: 'Review information', buttonLabel: 'Confirm & Pay' },
};

export default function BookingPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const tripId = params.id as string;
    const batchId = params.batchId as string;
    const step = (searchParams.get('step') || 'reservation') as Step;

    const { setHeaderLabel, setButtonLabel, setBackAction } = useBookingNavStore();

    const bookingDataRef = useRef<BookingFormData | null>(null);

    const goToStep = (nextStep: Step) => {
        const p = new URLSearchParams(searchParams.toString());
        p.set('step', nextStep);
        router.push(`?${p.toString()}`);
    };

    useEffect(() => {
        const config = STEP_CONFIG[step] ?? STEP_CONFIG.reservation;
        setHeaderLabel(config.headerLabel);
        setButtonLabel(config.buttonLabel);
    }, [step, setHeaderLabel, setButtonLabel]);

    useEffect(() => {
        if (step === 'reservation') {
            setBackAction(() => router.push(`/trip/${tripId}`));
        } else if (step === 'review') {
            setBackAction(() => goToStep('reservation'));
        }
    }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleBookingContinue = (data: BookingFormData) => {
        bookingDataRef.current = data;
        goToStep('review');
    };

    const handlePayment = () => {
        // TODO: initiate payment flow
        void 0;
    };

    if (step === 'reservation') {
        return (
            <BookingFormPage
                tripId={tripId.split('-').pop() || ''}
                batchId={batchId}
                onContinue={handleBookingContinue}
            />
        );
    }

    if (step === 'review') {
        return (
            <ReviewInfo
                tripId={tripId}
                batchId={batchId}
                onContinue={handlePayment}
            />
        );
    }

    // if (step == 'discount_coupons') {
    //     return (
    //         <
    //     )
    // }

    return null;
}
