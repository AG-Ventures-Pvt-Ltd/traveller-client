'use client'

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDevice } from '@/common/hooks/useDevice';
import BookingPage from './components/mobile/BookingPage';
import DesktopBookingPage from './components/desktop/BookingPage';
import { ReservationSkeleton } from './components/mobile/BookingStepSkeletons';
import { trackEvent, getFunnelSource } from '@/common/utils/analytics';
import { useTripBasicDetails } from '../../api';
import { useTimedModal } from '@/common/hooks/useTimedModal';
import WhatsAppHelpModal from '@/common/components/composites/WhatsAppHelpModal';

const Page = () => {
    const { isMobile, isHydrated } = useDevice();
    const params = useParams();
    const tripId = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const slugId = tripId.split('-').pop() || tripId;

    const { data: tripData } = useTripBasicDetails(slugId);
    const { show: showHelpModal, dismiss: dismissHelpModal } = useTimedModal(60_000, !!tripData?.title);

    useEffect(() => {
        trackEvent('booking_page_view', { trip_id: tripId, funnel_source: getFunnelSource() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isHydrated) {
        return <ReservationSkeleton />;
    }

    return (
        <>
            {isMobile ? <BookingPage /> : <DesktopBookingPage />}
            {tripData?.title && (
                <WhatsAppHelpModal
                    open={showHelpModal}
                    onClose={dismissHelpModal}
                    tripTitle={tripData.title}
                    tripSlug={slugId}
                />
            )}
        </>
    );
}

export default Page