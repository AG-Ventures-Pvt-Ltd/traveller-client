'use client'

import React, { useState } from 'react'
import BackButton from '@/common/ui/BackButton';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { BOOKING_CONSTANTS } from './constants';
import OrderSummary from './components/OrderSummary/OrderSummary';
import TravelerDetailsForm from './components/TravelerDetailsForm';


const Page = () => {

    const searchParams = useSearchParams();
    const { id, batchId } = useParams();
    const guestsParam = searchParams.get('guests');
    const initialGuests = guestsParam ? parseInt(guestsParam) : BOOKING_CONSTANTS.DEFAULT_GUESTS;
    const [guests, setGuests] = useState(initialGuests);

    const router = useRouter();

    const handleBackToTrip = () => {
        router.push(`/trip/${id}`);
    };

    return (
        <div className='sm:px-[4%] lg:px-[6%] px-[10%]'>
            <BackButton
                onClick={handleBackToTrip}
                className="flex items-center gap-3 my-4"
                label='Back to Trip Details'
            />
            <div className='flex gap-6'>
                <div className='flex-[2]'>
                    <TravelerDetailsForm 
                        guests={guests}
                        onGuestsChange={setGuests}
                        tripId={(typeof id === 'string' ? id.split('-').at(-1) : id?.[0]?.split('-').at(-1)) as string}
                        batchId={batchId as string}
                    />
                </div>
                <div className="flex-1 sticky top-28 h-fit">
                    <OrderSummary
                        tripId={id as string}
                        batchId={batchId as string}
                        guests={guests}
                    />
                </div>
            </div>
        </div>
    )
}

export default Page