import { useState } from "react";
import Card from "@/common/ui/Card";
import { CalendarIcon, MapPin, Users2, Bookmark, IndianRupee } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useParams } from "next/navigation";
import { TripBookingCardProps } from '../types';
import { formatDurationOnly } from "@/common/utils/dateUtils";

export function TripBookingCard({
  availableDates,
  basePrice,
  duration = "4—5 hours",
  meetingPoint = "Desert Gate Café",
  category = "Walking / Jeep",
}: TripBookingCardProps) {
  const validAvailableDates = Array.isArray(availableDates) ? availableDates.map(d => ({
    ...d,
    startDate: d.startDate instanceof Date ? d.startDate : new Date(d.startDate)
  })) : [];
  const validBasePrice = typeof basePrice === 'number' ? basePrice : 0;

  const [selectedBatchId, setSelectedBatchId] = useState<string | undefined>(validAvailableDates[0]?.batchId);
  const router = useRouter();
  const params = useParams();
  const tripId = params.id as string;

  const selectedDateInfo = validAvailableDates.find(
    (d) => d.batchId === selectedBatchId
  );

  const calculatedDuration = selectedDateInfo?.endDate
    ? formatDurationOnly(
      selectedDateInfo.startDate instanceof Date ? selectedDateInfo.startDate.toISOString() : selectedDateInfo.startDate,
      selectedDateInfo.endDate instanceof Date ? selectedDateInfo.endDate.toISOString() : selectedDateInfo.endDate
    )
    : duration;

  const selectedMeetingPoint = selectedDateInfo?.meetingPoint || meetingPoint;

  return (
    <Card variant="fill" className="lg:sticky border-0! lg:top-26 p-4 sm:p-5 md:p-6 lg:p-7">
      <Card className="max-w-full lg:max-w-[448px]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 sm:gap-3 pb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#45556C] flex-shrink-0" />
              <div className="flex gap-1 sm:gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-bold">Duration:</span>
                <span className="text-xs sm:text-sm font-medium">{calculatedDuration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#45556C] flex-shrink-0" />
              <div className="flex gap-1 sm:gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-bold">Meeting point:</span>
                <span className="text-xs sm:text-sm font-medium">{selectedMeetingPoint}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Users2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#45556C] flex-shrink-0" />
              <div className="flex gap-1 sm:gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-bold">Group Size:</span>
                <span className="text-xs sm:text-sm font-medium">{selectedDateInfo?.totalSeats}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 pb-3">
            <div className="flex gap-1 items-end whitespace-nowrap">
              <span className="text-sm font-medium">Category:</span>
              <span className="text-sm font-bold">{category}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-6">
            <span className="text-xs sm:text-sm font-bold">Available Dates</span>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-1.5 sm:gap-2">
              {validAvailableDates.slice(0, 6).map((date, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedBatchId(date.batchId)}
                  className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl border transition-all min-h-[60px] sm:min-h-[auto]
                    ${selectedBatchId === date.batchId
                      ? 'border-[#0D203F] bg-[#0D203F] text-white! bg-opacity-5'
                      : 'border-[#E2E8F0] bg-white hover:border-[#0D203F]'
                    }`}
                >
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px] sm:text-xs font-semibold">
                      {format(date.startDate, 'EEE')}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">
                      {format(date.startDate, 'MMM dd')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Seats Available</span>
              <span className="text-[#314158]">
                {selectedDateInfo?.seatsAvailable || 0}
              </span>
            </div>
          </div>
          <div className="flex items-end gap-1 sm:gap-2">
            <span className="font-bold text-xl sm:text-2xl flex items-center">
              <IndianRupee size={18} strokeWidth={3} className="sm:w-[22px] sm:h-[22px]" />{selectedDateInfo?.price || validBasePrice}
            </span>
            <span className="text-sm sm:text-base text-[#45556C] mb-0.5">/ per person</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (selectedBatchId) {
                  router.push(`/trip/book/${tripId}/${selectedBatchId}`);
                }
              }}
              disabled={!selectedBatchId}
              className="flex-1 h-11 sm:h-12 bg-[#0D203F] hover:bg-[#1a2f4f] disabled:bg-[#cccccc] text-white rounded-full text-sm transition-colors"
            >
              Book this tour
            </button>
            <button className="w-11 h-11 sm:w-12 sm:h-12 bg-[#0D203F] hover:bg-[#1a2f4f] rounded-full flex items-center justify-center transition-colors">
              <Bookmark className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </button>
          </div>
        </div>
      </Card>
    </Card>
  );
}
