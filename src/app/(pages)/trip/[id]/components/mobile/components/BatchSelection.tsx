'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AvailableDate } from '../../../types';
import { BatchSelectionProps } from '../types';
import DepartureDatesList from '@/app/(pages)/trip/common/ui/DepartureDatesList';
import MobileModal from '@/common/ui/MobileModal';
const TripCalendar = dynamic(() => import('@/common/ui/TripCalendar'), { ssr: false });
import { CalendarDotsIcon } from '@phosphor-icons/react';

export default function BatchSelection({ batches, selectedBatch, onSelect, bestTimeToVisit }: BatchSelectionProps) {
    const items = batches.map((batch: AvailableDate) => ({
        id: batch.batchId,
        date: batch.startDate || batch.startDateTime,
    }));

    const selectedId = selectedBatch !== null && selectedBatch !== undefined
        ? (batches[selectedBatch]?.batchId ?? null)
        : null;

    const handleSelect = (id: string) => {
        const index = batches.findIndex((b: AvailableDate) => b.batchId === id);
        if (index !== -1) onSelect(index);
    };

    const [showCalendarModal, setShowCalendarModal] = useState(false)

    return (
        <div className="border border-[#d9d9d9] rounded-[16px] p-4">
            <div className='flex justify-between items-start mb-4'>
                <p className="text-xs font-medium text-black mb-3">Choose your Departure Dates</p>
                <div className='flex items-center gap-1 border border-[#D9D9D9] px-2 py-1 rounded-lg text-xs' onClick={() => setShowCalendarModal(true)}>
                    <CalendarDotsIcon size={16} /> Later Month
                </div>
            </div>
            <DepartureDatesList
                items={items}
                selectedId={selectedId}
                onSelect={handleSelect}
                className="-mx-4 px-4"
            />
            {bestTimeToVisit && (
                <h2 className='text-center font-normal pt-2'>Best Time To Visit <span className='text-red-500 font-medium'>{bestTimeToVisit}</span></h2>
            )}

            <MobileModal
                isOpen={showCalendarModal}
                onClose={() => setShowCalendarModal(false)}
                title="Select Departure Date"
            >
                <TripCalendar
                    batches={batches}
                    selectedBatchId={selectedId}
                    onSelectBatch={(batchId) => {
                        handleSelect(batchId);
                        setShowCalendarModal(false);
                    }}
                />
            </MobileModal>
        </div>
    );
}
