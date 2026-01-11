import { useState } from "react";
import  Card from "@/common/ui/Card";
import { CalendarIcon, MapPin, Users2, Bookmark, IndianRupee } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useParams } from "next/navigation";
import { TripBookingCardProps } from '../types';

export function TripBookingCard({
  availableDates,
  basePrice,
  duration = "4—5 hours",
  meetingPoint = "Desert Gate Café",
  groupSize = "Up to 6 people",
  tourType = "Walking / Jeep",
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

  return (
    <Card variant="fill" className="sticky border-0! top-26 p-7">
      <Card className="max-w-[448px] ">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 pb-6 ">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-[#45556C]" />
              <div className="flex gap-2">
                <span className="text-sm font-bold">Duration:</span>
                <span className="text-sm font-medium">{duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#45556C]" />
              <div className="flex gap-2">
                <span className="text-sm font-bold">Meeting point:</span>
                <span className="text-sm font-medium">{meetingPoint}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users2 className="h-5 w-5 text-[#45556C]" />
              <div className="flex gap-2">
                <span className="text-sm font-bold">Group Size:</span>
                <span className="text-sm font-medium">{groupSize}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 pb-6 ">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Category</span>
              <span className="text-sm font-bold">{tourType}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-6 ">
            <span className="text-sm font-bold">Available Dates</span>
            <div className="grid grid-cols-3 gap-2">
              {validAvailableDates.slice(0, 6).map((date, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedBatchId(date.batchId)}
                  className={`p-2.5 rounded-xl border transition-all ${selectedBatchId === date.batchId
                      ? 'border-[#0D203F] bg-[#0D203F] bg-opacity-5'
                      : 'border-[#E2E8F0] bg-white hover:border-[#0D203F]'
                    }`}
                >
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-xs text-[#45556C]">
                      {format(date.startDate, 'EEE')}
                    </span>
                    <span className="text-sm text-[#0D203F]">
                      {format(date.startDate, 'MMM dd')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-6 ">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#45556C]">Seats Available</span>
              <span className="text-[#314158]">
                <span>4 / </span>
                {selectedDateInfo?.totalSeats || 15}
              </span>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="font-bold text-2xl flex items-center">
              <IndianRupee size={22} strokeWidth={3}/>{selectedDateInfo?.price || validBasePrice}
            </span>
            <span className="text-base text-[#45556C] mb-0.5">/ per person</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (selectedBatchId) {
                  router.push(`/trip/book/${tripId}/${selectedBatchId}`);
                }
              }}
              disabled={!selectedBatchId}
              className="flex-1 h-12 bg-[#0D203F] hover:bg-[#1a2f4f] disabled:bg-[#cccccc] text-white rounded-full text-sm transition-colors"
            >
              Book this tour
            </button>
            <button className="w-12 h-12 bg-[#0D203F] hover:bg-[#1a2f4f] rounded-full flex items-center justify-center transition-colors">
              <Bookmark className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </Card>
    </Card>
  );
}
