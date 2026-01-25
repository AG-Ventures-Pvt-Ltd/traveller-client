import React from 'react';
import { User, FileText } from 'lucide-react';

interface TravelerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface TravelerCardProps {
  traveler: TravelerInfo;
  isPrimary?: boolean;
  travelerNumber?: number;
}

const TravelerCard: React.FC<TravelerCardProps> = ({ 
  traveler, 
  isPrimary = false,
  travelerNumber 
}) => {
  return (
    <div className="px-5 pt-5 pb-1 bg-neutral-50 rounded-2xl border border-gray-200 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-white rounded-full flex justify-center items-center flex-shrink-0">
          <User className="w-4 h-4 text-neutral-900" />
        </div>
        <h3 className="text-neutral-900 text-base font-bold font-['Satoshi']">
          {isPrimary ? 'Primary Traveler' : `Traveler ${travelerNumber}`}
        </h3>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">First Name</p>
          <p className="text-neutral-900 text-sm font-bold font-['Satoshi']">{traveler.firstName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">Last Name</p>
          <p className="text-neutral-900 text-sm font-bold font-['Satoshi']">{traveler.lastName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">Email</p>
          <p className="text-neutral-900 text-sm font-bold font-['Satoshi']">{traveler.email}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">Phone</p>
          <p className="text-neutral-900 text-sm font-bold font-['Satoshi']">{traveler.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default TravelerCard;
