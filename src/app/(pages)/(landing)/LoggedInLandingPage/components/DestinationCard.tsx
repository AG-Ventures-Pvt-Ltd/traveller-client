import React from 'react';
import { MapPin, Clock, Star, IndianRupee } from 'lucide-react';
import { useRouter } from "next/navigation";
import BookmarkButton from "@/common/components/atoms/BookmarkButton";
import MyImage from '@/common/ui/Image';

interface Trip {
  _id?: string | number;
  image: string;
  title: string;
  rating?: number;
  location: string;
  price: number;
  reviewCount?: number;
  days?: number;
  tripSlug?: string;
  isBookmarked?: boolean;
  description?: string;
}

interface DestinationCardProps {
  trip: Trip;
  showBookmark?: boolean;
}

const DestinationCard = ({
  trip,
  showBookmark = false
}: DestinationCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (trip.tripSlug) {
      router.push(`/trip/${trip.tripSlug}`);
    }
  };

  return (
    <div onClick={handleCardClick} className="w-full bg-white rounded-3xl border-2 border-gray-200 overflow-hidden flex flex-col cursor-pointer">
      <div className="relative h-[240px] overflow-hidden">
        <MyImage
          className="w-full h-full object-cover"
          src={trip?.image || "/"}
          alt={trip?.title || ""}
          width={0}
          height={0}
        />
        {showBookmark && (
          <div className="absolute top-4 right-4">
            <BookmarkButton tripSlug={trip?.tripSlug || ""} isBookmarked={trip?.isBookmarked || false} />
          </div>
        )}
      </div>
      <div className="flex-1 p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-neutral-900 text-2xl font-bold font-['Satoshi']">
            {trip?.title}
          </h3>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-neutral-700" strokeWidth={1.5} />
            <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
              {trip?.location}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {trip?.rating && (
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-neutral-900 text-neutral-900" strokeWidth={1} />
              <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
                {trip?.rating}
              </span>
            </div>
          )}
          {trip?.days && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-neutral-700" strokeWidth={1.5} />
              <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
                {trip?.days} days
              </span>
            </div>
          )}
          {trip?.reviewCount && (
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
              {trip?.reviewCount} reviews
            </span>
          )}
        </div>
        <div className="w-full h-px bg-gray-200" />
        <div className="flex justify-between items-center">
          <div className="flex items-end ">
            <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
              From
            </span>
            <span className='flex items-end'>
            <span className="flex items-center text-neutral-900 text-2xl font-bold font-['Satoshi']">
              <IndianRupee size={24} strokeWidth={3}/>{trip?.price}
            </span>
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi'] pb-1">
              /day
            </span>
            </span>
          </div>
          <button className="px-6 py-3 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors">
            <span className="text-white text-sm font-bold font-['Satoshi']">
              Explore
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
