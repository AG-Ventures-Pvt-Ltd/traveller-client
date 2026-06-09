'use client'

import { useDevice } from '@/common/hooks/useDevice';
import BookingPage from './components/mobile/BookingPage';
import DesktopBookingPage from './components/desktop/BookingPage';
import { ReservationSkeleton } from './components/mobile/BookingStepSkeletons';

const Page = () => {
    const { isMobile, isHydrated } = useDevice();

    if (!isHydrated) {
        return <ReservationSkeleton />;
    }

    if (isMobile) {
        return <BookingPage />;
    }

    return <DesktopBookingPage />;
}

export default Page