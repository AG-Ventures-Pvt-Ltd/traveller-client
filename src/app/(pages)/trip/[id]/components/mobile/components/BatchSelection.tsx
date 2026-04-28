'use client'

import { AvailableDate } from '../../../types';
import { BatchSelectionProps } from '../types';
import { formatDate } from '../utils';
import DepartureDatesList from '@/app/(pages)/trip/common/ui/DepartureDatesList';

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

    return (
        <div className="border border-[#d9d9d9] rounded-[16px] p-4">
            <p className="text-md font-medium text-black mb-3">Available Departure Dates</p>
            <DepartureDatesList
                items={items}
                selectedId={selectedId}
                onSelect={handleSelect}
                className="-mx-4 px-4"
            />
            {bestTimeToVisit && (
                <h2 className='text-center font-normal pt-6'>Best Time To Visit <span className='text-red-500 font-medium'>{bestTimeToVisit}</span></h2>
            )}
        </div>
    );
}
