'use client'

import { AvailableDate } from '../../../types';
import { BatchSelectionProps } from '../types';
import { formatDate } from '../utils';

export default function BatchSelection({ batches, selectedBatch, onSelect, bestTimeToVisit }: BatchSelectionProps) {
    return (
        <div className="border border-[#d9d9d9] rounded-[16px] p-4">
            <p className="text-md font-medium text-black mb-3">Available Departure Dates</p>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
                {batches.map((batch: AvailableDate, index: number) => {
                    const startDate = formatDate(batch.startDate || batch.startDateTime);
                    const [day, month] = startDate.split(' ');

                    return (
                        <div
                            key={index}
                            onClick={() => onSelect(index)}
                            className={`flex-shrink-0 border rounded-[14px] py-3 px-5 text-center transition-colors cursor-pointer ${
                                selectedBatch === index
                                    ? 'border-[#EEA0FF] bg-[#EEA0FF]'
                                    : 'border-black hover:bg-yellow-50'
                            }`}
                        >
                            <p className="text-sm">{month}</p>
                            <p className="text-sm font-medium">{day}</p>
                        </div>
                    );
                })}
            </div>
            {bestTimeToVisit && (
                <h2 className='text-center font-normal pt-6'>Best Time To Visit <span className='text-red-500 font-medium'>{bestTimeToVisit}</span></h2>
            )}
        </div>
    );
}
