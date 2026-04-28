import type { Batch, BatchDetails } from './types';

interface TripOverviewCardProps {
    batchDetails: BatchDetails | undefined;
    selectedBatch: Batch | undefined;
    nights: number | undefined;
}

function formatDate(date: Date) {
    return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDay(date: Date) {
    return date.toLocaleDateString('en-GB', { weekday: 'long' });
}

export default function TripOverviewCard({ batchDetails, selectedBatch, nights }: TripOverviewCardProps) {
    const startDate = selectedBatch?.startDateTime
        ? new Date(selectedBatch.startDateTime)
        : batchDetails?.startDateTime
            ? new Date(batchDetails.startDateTime)
            : null;
    const endDate = batchDetails?.endDateTime ? new Date(batchDetails.endDateTime) : null;

    return (
        <div className="border border-[#D9D9D9] rounded-2xl px-[18px] pt-5 pb-4">
            <p className="text-[16px] font-semibold text-black tracking-[-0.48px] leading-snug mb-4">
                {batchDetails?.title || '—'}
            </p>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-medium text-black tracking-[-0.36px]">
                        {startDate ? formatDate(startDate) : '—'}
                    </p>
                    <p className="text-xs text-black tracking-[-0.36px]">
                        {startDate ? formatDay(startDate) : ''}
                    </p>
                </div>
                <div className={`bg-[#FFD976] rounded-full px-2.5 py-1 ${nights == null ? 'opacity-0 pointer-events-none' : ''}`}>
                    <p className="text-xs text-black tracking-[-0.36px]">
                        {nights != null ? `${nights}N/${nights + 1}D` : '—'}
                    </p>
                </div>
                <div className="flex flex-col gap-0.5 items-end">
                    <p className="text-xs font-medium text-black tracking-[-0.36px]">
                        {endDate ? formatDate(endDate) : '—'}
                    </p>
                    <p className="text-xs text-black tracking-[-0.36px]">
                        {endDate ? formatDay(endDate) : ''}
                    </p>
                </div>
            </div>
        </div>
    );
}
