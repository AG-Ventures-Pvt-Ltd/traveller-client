'use client'

import { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useDevice } from '@/common/hooks/useDevice';
import BookingPage from './components/mobile/BookingPage';
import DesktopBookingPage from './components/desktop/BookingPage';
import { ReservationSkeleton } from './components/mobile/BookingStepSkeletons';
import { trackEventOnce, toGaItem } from '@/common/utils/analytics';
import { useTripBasicDetails } from '../../api';
import { useOnceEverModal } from '@/common/hooks/useOnceEverModal';
import WhatsAppHelpModal, { WHATSAPP_HELP_MAX_SHOWS, WHATSAPP_HELP_STORAGE_KEY } from '@/common/components/composites/WhatsAppHelpModal';

const Page = () => {
    const { isMobile, isHydrated } = useDevice();
    const params = useParams();
    const tripId = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const slugId = tripId.split('-').pop() || tripId;
    const searchParams = useSearchParams();
    const batchId = searchParams.get('batchId');
    // Not on the review/pay step: a help nudge there pulls people out of payment.
    const onPaymentStep = searchParams.get('step') === 'review';

    const { data: tripData } = useTripBasicDetails(slugId);
    const { show: showHelpModal, dismiss: dismissHelpModal } = useOnceEverModal(60_000, WHATSAPP_HELP_STORAGE_KEY, !!tripData?.title && !onPaymentStep, WHATSAPP_HELP_MAX_SHOWS);

    // Once per trip per tab. The booking page re-mounts on the auth redirect and
    // again when the user comes back from the payment page — those are the same
    // checkout, not two, which is what used to inflate this event 2–5x.
    useEffect(() => {
        if (!tripData?.title) return;
        trackEventOnce(`begin_checkout:${slugId}`, 'begin_checkout', {
            currency: 'INR',
            value: tripData.pricing?.pricings?.[0]?.pricePerPerson,
            items: [toGaItem({
                slug: slugId,
                title: tripData.title,
                hostUsername: tripData.host?.username,
                category: tripData.category,
                city: tripData.location,
                price: tripData.pricing?.pricings?.[0]?.pricePerPerson,
                batchId: batchId || undefined,
            })],
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slugId, tripData?.title]);

    if (!isHydrated) {
        return <ReservationSkeleton />;
    }

    return (
        <>
            {isMobile ? <BookingPage /> : <DesktopBookingPage />}
            {tripData?.title && (
                <WhatsAppHelpModal
                    open={showHelpModal && !onPaymentStep}
                    onClose={dismissHelpModal}
                    tripTitle={tripData.title}
                    tripSlug={slugId}
                />
            )}
        </>
    );
}

export default Page