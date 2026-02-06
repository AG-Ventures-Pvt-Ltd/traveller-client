'use client'

import React, { useState } from 'react'
import BackButton from '@/common/ui/BackButton';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import OrderSummary from './components/OrderSummary/OrderSummary';
import TravelerDetailsForm from './components/TravelerDetailsForm';


const Page = () => {

    const searchParams = useSearchParams();
    const { id, batchId } = useParams();
    const guestsParam = searchParams.get('guests');
    const initialGuests = guestsParam ? Math.max(1, parseInt(guestsParam)) : 1;
    const [guests, setGuests] = useState(initialGuests);

    const router = useRouter();

    const handleBackToTrip = () => {
        router.push(`/trip/${id}`);
    };

    return (
        <div className='px-[4%] sm:px-[5%] lg:px-[2%] xl:px-[8%]'>
            <BackButton
                onClick={handleBackToTrip}
                className="flex items-center gap-3 my-4"
                label='Back to Trip Details'
            />
            <div className='flex flex-col-reverse mt-5 lg:flex-row gap-4 lg:gap-6 mb-8'>
                <div className='flex-[2]'>
                    <TravelerDetailsForm 
                        guests={guests}
                        onGuestsChange={setGuests}
                        tripId={(typeof id === 'string' ? id.split('-').at(-1) : id?.[0]?.split('-').at(-1)) as string}
                        batchId={batchId as string}
                    />
                </div>
                <div className="flex-1 lg:sticky lg:top-28 h-fit">
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