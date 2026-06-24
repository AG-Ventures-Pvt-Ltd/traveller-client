'use client'

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDevice } from '@/common/hooks/useDevice';
import BookingPage from './components/mobile/BookingPage';
import DesktopBookingPage from './components/desktop/BookingPage';
import { ReservationSkeleton } from './components/mobile/BookingStepSkeletons';
import { trackEvent, getFunnelSource } from '@/common/utils/analytics';

const Page = () => {
    const { isMobile, isHydrated } = useDevice();
    const params = useParams();
    const tripId = Array.isArray(params.id) ? params.id[0] : (params.id || '');

    useEffect(() => {
        trackEvent('booking_page_view', { trip_id: tripId, funnel_source: getFunnelSource() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isHydrated) {
        return <ReservationSkeleton />;
    }

    if (isMobile) {
        return <BookingPage />;
    }

    return <DesktopBookingPage />;
}

export default Page