'use client';

import { useEffect } from 'react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { ReviewSkeleton } from '../../BookingStepSkeletons';
import { usePayment } from '../../../../[batchId]/hooks/usePayment';
import { useParams, useSearchParams } from 'next/navigation';
import UserDetailsCard from './components/UserDetailsCard';
import TripSummaryCard from './components/TripSummaryCard';
import { BookingData } from '../../type';
import Button from '@/common/ui/Buttons/Button';



export default function ReviewInfo({}) {

    const searchParams = useSearchParams();
    const params = useParams()
    const existingBookingId = searchParams.get('bookingId') || params.id as string;

    const { data: bookingData, isLoading: isbookingDataLoading } = useGetData<BookingData>(existingBookingId ? API_ENDPOINTS.BOOKINGS.DETAILS(existingBookingId) : "", {
        queryKey: [existingBookingId ? API_ENDPOINTS.BOOKINGS.DETAILS(existingBookingId) : ""],
        refetchOnMount: true,
        staleTime: 0,
    })

    const { startPayment } = usePayment()

    if (isbookingDataLoading || !bookingData) {
        return <ReviewSkeleton />;
    }

    return (
        <div className="px-4 pb-20 flex flex-col gap-4">
            <UserDetailsCard user={bookingData.user} />
            <TripSummaryCard trip={bookingData.trip} booking={bookingData.booking} />
            <div className="fixed bottom-0 left-0 right-0 px-5 py-5 bg-[#FFF9F4] z-50">
                <Button
                    variant="yellow"
                    fullWidth
                    onClick={() => startPayment({ bookingId: existingBookingId })}
                >
                    Confirm & Pay
                </Button>
            </div>
        </div>
    );
}
