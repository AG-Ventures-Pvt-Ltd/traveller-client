'use client'

import { CaretDownIcon } from '@phosphor-icons/react';
import { ItineraryDay } from '../../../types';
import { ItinerarySectionProps } from '../types';
import { formatDate } from '../utils';
import CollapsibleCard from '@/common/ui/CollapsibleCard';


export default function ItinerarySection({
    itinerary,
    selectedDay,
    expandedDays,
    dayRefs,
    batchStartDate,
    onDaySelect,
    onDayToggle,
    isLoading = false,
}: ItinerarySectionProps) {
    if (isLoading) {
        return (
            <CollapsibleCard overflow="visible" className="bg-[#e2f4a6] border border-[#d9d9d9] rounded-[16px] scroll-mt-24 mt-6" title='Trip Itinerary'>
                <div className="bg-[#e2f4a6] sticky top-16 z-15 px-3 py-2">
                    <div className="flex gap-3 overflow-x-auto bg-white p-3 rounded-xl scrollbar-hide">
                        <div className="flex gap-3 pr-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-14 w-20 bg-gray-300 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-[#e2f4a6] p-4 pt-4 rounded-[16px] space-y-4 relative">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="relative">
                            <div className="bg-gray-300 h-12 rounded-lg animate-pulse mb-4"></div>
                            <div className="bg-gray-300 h-16 rounded-lg animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </CollapsibleCard>
        );
    }
    const getDayDate = (dayIndex: number): string => {
        if (!batchStartDate) return '';
        try {
            // Get IST date components to avoid UTC-to-local shift on the start date
            const istDateStr = new Date(batchStartDate).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
            const [y, m, d] = istDateStr.split('-').map(Number);
            const dayDate = new Date(y, m - 1, d + dayIndex);
            return formatDate(dayDate);
        } catch {
            return '';
        }
    };
    return (
        <CollapsibleCard overflow="visible" className="bg-[#e2f4a6] border border-[#d9d9d9] rounded-[16px] scroll-mt-24 mt-6" title='Trip Itinerary'>
            <div className="bg-[#e2f4a6] sticky top-16 z-15 px-3 py-2">
                <div className="flex gap-3 overflow-x-auto bg-white p-3 rounded-xl scrollbar-hide">
                    {/* Fixes trailing padding clip in overflow scroll */}
                    <div className="flex gap-3 pr-3">
                        {itinerary.map((_, dayIndex: number) => {
                            const dayDate = getDayDate(dayIndex);
                            const isSelected = selectedDay === dayIndex;
                            return (
                                <button
                                    key={dayIndex}
                                    className={`h-14 rounded-xl text-md font-medium whitespace-nowrap transition-all flex overflow-hidden ${isSelected
                                        ? 'bg-[#EEA0FF] text-black border-0'
                                        : 'border border-black text-black hover:bg-gray-100'
                                        }`}
                                    onClick={() => onDaySelect(dayIndex)}
                                >
                                    <span className={`text-[13px] font-medium transform rotate-180 whitespace-nowrap [writing-mode:vertical-lr] h-full min-w-[22px] flex items-center justify-center rounded-tr-xl rounded-br-xl py-1 px-[3px] ${isSelected ? "bg-black text-white" : "border-l border-black"
                                        }`}>
                                        {dayDate}
                                    </span>
                                    <span className='px-2 flex items-center text-lg'>Day {dayIndex + 1}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="bg-[#e2f4a6] p-4 pt-4 rounded-[16px] space-y-4 relative">
                {itinerary.map((day: ItineraryDay, dayIndex: number) => (
                    <div
                        key={dayIndex}
                        className="relative scroll-mt-40"
                        ref={(el) => { dayRefs.current[dayIndex] = el; }}
                    >
                        <span className="absolute left-9.5 top-11 -bottom-4 border-l-1 z-0" style={{
                            borderLeftStyle: 'dashed',
                            borderImage: 'repeating-linear-gradient(transparent, transparent 4px, black 4px, black 10px) 1',
                        }} />
                        <button
                            onClick={() => onDayToggle(dayIndex)}
                            className="w-full flex items-center justify-between gap-3 hover:opacity-80 transition-opacity relative z-10 my-2 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <span className="bg-yellow-400 text-black rounded-full px-4 py-2 font-medium flex-shrink-0">
                                    Day {day.day}
                                </span>
                                <p className="font-bold text-black text-left">{day.title}</p>
                            </div>
                            <CaretDownIcon
                                size={20}
                                weight="thin"
                                className={`text-black flex-shrink-0 transition-transform ${expandedDays[dayIndex] ? 'transform rotate-180' : ''
                                    }`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedDays[dayIndex] ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="pl-20 pt-3">
                                <p className="text-sm text-gray-700 pb-3 border-b border-[#d9d9d9] last:border-b-0">
                                    {day.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* End marker */}
                <div className="flex items-center gap-3">
                    <span className="bg-yellow-400 text-black rounded-full px-6 py-2 text-lg font-medium flex-shrink-0">
                        End
                    </span>
                    <span className='font-black'>
                        ---------
                    </span>
                </div>
            </div>
        </CollapsibleCard>
    );
}
