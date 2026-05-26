'use client'

import { useDevice } from '@/common/hooks/useDevice';
import BookingPage from './components/mobile/BookingPage';
import { ReservationSkeleton } from './components/mobile/BookingStepSkeletons';
import { redirect } from 'next/navigation';

const Page = () => {
    const { isMobile, isHydrated } = useDevice();

    if (!isHydrated) {
        return <ReservationSkeleton />;
    }

    if (isMobile) {
        return <BookingPage />;
    }

    redirect('/');
}

export default Page