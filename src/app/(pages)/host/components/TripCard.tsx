import { MapPin, Star, Clock } from "lucide-react";
import Image from "next/image";
import { Trip } from "../types";

interface TripCardProps {
  trip: Trip;
  onViewDetails?: (tripId: string) => void;
}

export function TripCard({ trip, onViewDetails }: TripCardProps) {
  return (
    <div className="w-full max-w-[436px] bg-white rounded-3xl border-2 border-gray-200 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative w-full h-60 overflow-hidden">
        <Image
          src={trip.imageUrl}
          alt={trip.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 pt-1.5 pb-1 bg-white/95 rounded-[50px] text-neutral-900 text-xs font-bold font-['Satoshi']">
            {trip.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pl-6 pt-6 flex flex-col gap-4 pb-6">
        {/* Title and Location */}
        <div className="flex flex-col gap-2">
          <h3 className="text-neutral-900 text-xl font-bold font-['Satoshi'] leading-6">
            {trip.title}
          </h3>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral-700" strokeWidth={1.33} />
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
              {trip.location}
            </span>
          </div>
        </div>

        {/* Rating and Duration */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-neutral-900 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 fill-white text-white" strokeWidth={1.33} />
            </div>
            <span className="text-neutral-900 text-sm font-bold font-['Satoshi']">
              {trip.rating}
            </span>
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
              ({trip.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-neutral-700" strokeWidth={1.33} />
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
              {trip.duration}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200" />

        {/* Price and Button */}
        <div className="flex justify-between items-center pr-6">
          <div className="flex items-baseline gap-1">
            <span className="text-neutral-900 text-3xl font-bold font-['Satoshi']">
              ${trip.price}
            </span>
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
              / person
            </span>
          </div>
          <button
            onClick={() => onViewDetails?.(trip.id)}
            className="px-5 py-2.5 bg-neutral-900 rounded-xl text-white text-sm font-bold font-['Satoshi'] hover:bg-neutral-800 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
