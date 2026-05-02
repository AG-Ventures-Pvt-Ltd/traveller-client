import React from 'react';
import MyImage from '@/common/ui/Image';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import InfoItem from './InfoItem';
import { formatDateTime } from '@/common/utils/dateUtils';

interface TripDetails {
  title: string;
  image: string;
  location: string;
  date: string;
  duration: string;
  travelers: string;
  createdAt: string;
}

interface TripDetailsCardProps {
  trip: TripDetails;
}

const TripDetailsCard: React.FC<TripDetailsCardProps> = ({ trip }) => {
  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-80 h-70 flex-shrink-0 min-w-0">
          <MyImage
            src={trip.image}
            alt={trip.title}
            className="w-full h-full"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex-1 px-6 md:px-8 py-6 md:py-8 flex flex-col gap-4">
          <h2 className="text-neutral-900 text-2xl md:text-3xl font-bold font-['Satoshi']">
            {trip.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoItem icon={MapPin} label="Location" value={trip.location} />
            <InfoItem icon={Calendar} label="Departure Date" value={formatDateTime(trip.date)} />
            <InfoItem icon={Clock} label="Duration" value={trip.duration} />
            <InfoItem icon={Users} label="Travelers" value={trip.travelers} />
          </div>
          <div className="px-4 pt-3 pb-2 bg-neutral-50 rounded-xl">
            <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">Booked on</p>
            <p className="text-neutral-900 text-sm font-bold font-['Satoshi'] mt-0.5">{formatDateTime(trip.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsCard;
