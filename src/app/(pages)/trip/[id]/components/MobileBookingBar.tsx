import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TripData } from '../types';
import { ChevronUp, ChevronDown, CalendarIcon, MapPin, Users2, IndianRupee } from 'lucide-react';
import { format } from 'date-fns';
import { formatDurationOnly } from '@/common/utils/dateUtils';
import BookmarkButton from '@/common/components/atoms/BookmarkButton';
import { useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

interface MobileBookingBarProps {
    tripData: TripData;
    tripId: string;
}

const MobileBookingBar: React.FC<MobileBookingBarProps> = ({ tripData, tripId }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const validAvailableDates = Array.isArray(tripData.tripBatches) ? tripData.tripBatches.map(d => ({
        ...d,
        startDate: d.startDate instanceof Date ? d.startDate : new Date(d.startDate)
    })) : [];

    const [selectedBatchId, setSelectedBatchId] = useState<string | undefined>(validAvailableDates[0]?.batchId);

    const selectedDateInfo = validAvailableDates.find(
        (d) => d.batchId === selectedBatchId
    );

    const calculatedDuration = selectedDateInfo?.endDate
        ? formatDurationOnly(
            selectedDateInfo.startDate instanceof Date ? selectedDateInfo.startDate.toISOString() : selectedDateInfo.startDate,
            selectedDateInfo.endDate instanceof Date ? selectedDateInfo.endDate.toISOString() : selectedDateInfo.endDate
        )
        : '4—5 hours';

    const selectedMeetingPoint = selectedDateInfo?.meetingPoint || 'Meeting point TBD';

    const handleBookNow = () => {
        const batchToBook = selectedBatchId || validAvailableDates[0]?.batchId;
        if (batchToBook) {
            router.push(`/trip/book/${tripId}/${batchToBook}`);
        }
    };

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        setIsDragging(true);
        setStartY(e.touches[0].clientY);
        setCurrentY(e.touches[0].clientY);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging) return;
        setCurrentY(e.touches[0].clientY);
    }, [isDragging]);

    const handleTouchEnd = useCallback(() => {
        if (!isDragging) return;

        const deltaY = startY - currentY;
        const threshold = 50; // Minimum drag distance to trigger expand/collapse

        if (Math.abs(deltaY) > threshold) {
            if (deltaY > 0 && !isExpanded) {
                // Dragged up, expand
                setIsExpanded(true);
            } else if (deltaY < 0 && isExpanded) {
                // Dragged down, collapse
                setIsExpanded(false);
            }
        }

        setIsDragging(false);
        setCurrentY(0);
    }, [isDragging, startY, currentY, isExpanded]);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            ref={containerRef}
            className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out border-t-1 border-t-[#474747] rounded-t-3xl bg-white ${isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-5rem)]'
                } `}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Drag Handle */}
            <div
                className="w-full h-6 bg-white flex justify-center items-center cursor-pointer rounded-t-3xl"
                onClick={toggleExpanded}
            >
                {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                )}
            </div>

            {/* Content */}
            <div className="bg-white">
                {isExpanded ? (
                    /* Expanded Content */
                    <div className="p-4 max-h-[70vh] overflow-y-auto">
                        <div className="space-y-4">
                            {/* Trip Details */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <CalendarIcon className="h-4 w-4 text-[#45556C] flex-shrink-0" />
                                    <div className="flex gap-1 flex-wrap">
                                        <span className="text-sm font-bold">Duration:</span>
                                        <span className="text-sm font-medium">{calculatedDuration}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-[#45556C] flex-shrink-0" />
                                    <div className="flex gap-1 flex-wrap">
                                        <span className="text-sm font-bold">Meeting point:</span>
                                        <span className="text-sm font-medium">{selectedMeetingPoint}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users2 className="h-4 w-4 text-[#45556C] flex-shrink-0" />
                                    <div className="flex gap-1 flex-wrap">
                                        <span className="text-sm font-bold">Group Size:</span>
                                        <span className="text-sm font-medium">{selectedDateInfo?.totalSeats}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Category */}
                            <div className="flex gap-1 items-center">
                                <span className="text-sm font-medium">Category:</span>
                                <span className="text-sm font-bold">{tripData.category}</span>
                            </div>

                            {/* Available Dates */}
                            <div className="space-y-2">
                                <span className="text-sm font-bold">Available Dates</span>
                                <div className="grid grid-cols-3 gap-2">
                                    {validAvailableDates.slice(0, 6).map((date, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedBatchId(date.batchId)}
                                            className={`p-2 rounded-lg border transition-all min-h-[50px]
                        ${selectedBatchId === date.batchId
                                                    ? 'border-primary bg-primary text-white bg-opacity-5'
                                                    : 'border-[#E2E8F0] bg-white'
                                                }`}
                                        >
                                            <div className="flex flex-col items-center gap-0.5">
                                                <span className="text-[10px] font-semibold">
                                                    {format(date.startDate, 'EEE')}
                                                </span>
                                                <span className="text-xs font-semibold">
                                                    {format(date.startDate, 'MMM dd')}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="text-sm font-semibold">Seats Available</span>
                                <span className="text-[#ff0202] font-bold">
                                    {selectedDateInfo?.seatsAvailable || 0}
                                </span>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="font-bold text-2xl flex items-center">
                                    <IndianRupee size={18} strokeWidth={3} />{selectedDateInfo?.price || tripData.basePrice || 0}
                                </span>
                                <span className="text-base text-[#45556C]">/ per person</span>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleBookNow}
                                    disabled={!selectedBatchId}
                                    className="flex-1 h-12 bg-primary disabled:bg-[#cccccc] text-white rounded-full text-sm font-semibold transition-colors"
                                >
                                    Book this trip
                                </button>
                                <div className="w-12 h-12 [&>button]:!static [&>button]:!w-full [&>button]:!h-full [&>button]:!bg-neutral-900 [&>button]:!rounded-full [&>button]:!shadow-none [&>button]:hover:!bg-neutral-800">
                                    <BookmarkButton
                                        tripSlug={tripId}
                                        isBookmarked={tripData.isBookmarked || false}
                                        onSuccess={() => {
                                            queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.TRIPS.BASIC_DETAILS(tripId)] });
                                            queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.TRIPS.DETAILED_DETAILS(tripId)] });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full px-6 h-14 flex justify-center">
                        <div className="flex justify-between items-center w-full pb-2">
                            <div className='flex gap-6 items-center'>
                                <div className="flex-1 h-14 flex flex-col justify-center">
                                    <div className="text-neutral-900 text-2xl font-bold leading-5">
                                        ₹{tripData.tripBatches?.[0]?.price || tripData.basePrice || 0}
                                    </div>
                                    <div className="text-neutral-700 text-xs font-medium pl-3">
                                        /per person
                                    </div>
                                </div>
                                <div className="flex flex-col items-center bg-neutral-900 text-white rounded-lg px-3 py-1">
                                    {selectedDateInfo ? (
                                        <>
                                            <span className="text-[10px] font-semibold">
                                                {format(selectedDateInfo.startDate, 'EEE')}
                                            </span>
                                            <span className="text-xs font-semibold">
                                                {format(selectedDateInfo.startDate, 'MMM dd')}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-xs font-medium">Select date</span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={handleBookNow}
                                disabled={!tripData.tripBatches?.[0]?.batchId}
                                className="px-6 h-12 relative bg-neutral-900 rounded-xl text-center justify-start text-white text-base font-bold font-['Satoshi'] leading-6"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileBookingBar;