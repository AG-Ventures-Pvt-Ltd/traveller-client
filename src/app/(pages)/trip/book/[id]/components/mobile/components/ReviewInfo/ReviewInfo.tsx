'use client';

import { useEffect } from 'react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { useBookingNavStore } from '../../../../[batchId]/store/useBookingNavStore';
import { ReviewSkeleton } from '../../BookingStepSkeletons';
import { usePayment } from '../../../../[batchId]/hooks/usePayment';
import { useParams, useSearchParams } from 'next/navigation';
import UserDetailsCard from './components/UserDetailsCard';
import TripSummaryCard from './components/TripSummaryCard';
import { BookingData } from '../../type';



export default function ReviewInfo({}) {

    const { setContinueAction } = useBookingNavStore();

    useEffect(() => {
        setContinueAction(() => { });
    }, [setContinueAction]);


    const searchParams = useSearchParams();

    const params = useParams()

    const existingBookingId = searchParams.get('bookingId') || params.id as string;

    const { data: bookingData, isLoading: isbookingDataLoading } = useGetData<BookingData>(existingBookingId ? API_ENDPOINTS.BOOKINGS.DETAILS(existingBookingId) : "", {
        queryKey: [existingBookingId ? API_ENDPOINTS.BOOKINGS.DETAILS(existingBookingId) : ""],
        refetchOnMount: true,
        staleTime: 0,
    })

    const { startPayment } = usePayment()

    useEffect(() => {

        if (existingBookingId) {
            setContinueAction(() => startPayment({ bookingId: existingBookingId }))
        }
    }, [])

    if (isbookingDataLoading || !bookingData) {
        return <ReviewSkeleton />;
    }

    return (
        <div className="px-4 pb-4 flex flex-col gap-4">
            <UserDetailsCard user={bookingData.user} />
            <TripSummaryCard trip={bookingData.trip} booking={bookingData.booking} />
        </div>
    );
}
