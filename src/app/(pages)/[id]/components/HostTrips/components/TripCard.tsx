import { MapPin, Star, Clock, IndianRupee, Calendar } from "lucide-react";
import { Trip } from "../../../types";
import MyImage from "@/common/ui/Image";
import Button from "@/common/components/atoms/Button";
import BookmarkButton from "@/common/components/atoms/BookmarkButton";
import { formatDateSimple } from "@/common/utils/dateUtils";

interface TripCardProps {
  trip: Trip;
  onViewDetails?: (tripId: string) => void;
}

export function TripCard({ trip, onViewDetails }: TripCardProps) {
  return (
    <div className="w-full max-w-[436px] bg-white rounded-3xl border-2 border-gray-200 overflow-hidden flex flex-col">
      <div className="relative w-full h-60 overflow-hidden">
        <MyImage
          src={trip.image}
          alt={trip.title}
          className="w-full h-full"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 pt-1.5 pb-1 bg-white/95 rounded-[50px] text-neutral-900 text-xs font-bold font-['Satoshi']">
            {trip.category}
          </span>
        </div>
        <div>
          <BookmarkButton tripSlug={trip.slug} isBookmarked={trip.isBookMarked} />
        </div>
      </div>
      <div className="pl-6 pt-6 flex flex-col gap-4 pb-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-neutral-900 text-xl font-bold font-['Satoshi'] leading-6">
            {trip.title}
          </h3>
          {trip.location && <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral-700" strokeWidth={2} />
            <span className="text-neutral-700 text-sm font-medium">
              {trip.location}
            </span>
          </div>}
        </div>
        <div className="flex items-center gap-4">
          {trip.rating > 0 && (<div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-neutral-900 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 fill-white text-white" strokeWidth={2} />
            </div>
            <span className="text-neutral-900 text-sm font-bold font-['Satoshi']">
              {trip.rating}
            </span>
          </div>)}
          <div className="flex flex-col md:flex-row gap-4">
            {trip.duration && <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-neutral-700" strokeWidth={2} />
              <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
                {trip.duration}
              </span>
            </div>}
          </div>
          {trip.batchDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-700" strokeWidth={2} />
              <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
                Departs on {formatDateSimple(trip.batchDate)}
              </span>
            </div>
          )}
        </div>
        <div className="w-full h-px bg-gray-200" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pr-6">
          <div className="flex items-end gap-1">
            <span className="text-neutral-900 text-2xl sm:!text-3xl lg:!text-4xl font-bold font-['Satoshi'] flex items-center">
              <IndianRupee size={24} className="sm:w-6 sm:h-6 lg:w-8 lg:h-8" />{trip.price}
            </span>
            <span className="text-neutral-700 text-sm sm:text-base lg:text-lg font-medium font-['Satoshi']">
              / person
            </span>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onViewDetails?.(trip.slug)}
            className="px-4 sm:px-5! py-2! rounded-xl! text-white! text-sm! font-bold! w-full sm:w-auto"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
