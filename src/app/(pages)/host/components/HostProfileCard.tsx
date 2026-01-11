import { Star } from "lucide-react";
import { HostProfile } from "../types";

interface HostProfileCardProps {
  host: HostProfile;
}

export function HostProfileCard({ host }: HostProfileCardProps) {
  return (
    <div className="w-full p-12 bg-neutral-50 rounded-3xl border-2 border-gray-200 flex flex-col gap-0">
      <div className="flex gap-8">
        {/* Avatar */}
        <div className="w-28 h-28 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-5xl font-bold font-['Satoshi']">
            {host.initials}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Name and Tagline */}
          <div className="flex flex-col gap-2">
            <h1 className="text-neutral-900 text-5xl font-bold font-['Satoshi'] leading-[50.40px]">
              {host.name}
            </h1>
            <p className="text-neutral-700 text-base font-medium font-['Satoshi']">
              {host.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="max-w-[800px] text-neutral-900 text-base font-medium font-['Satoshi'] leading-6">
            {host.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-8">
            <StatItem
              value={host.stats.yearsWithPlatform.toString()}
              label="Years with Wondrr"
            />
            <StatItem
              value={host.stats.successfulTrips.toLocaleString()}
              label="Successful Trips"
            />
            <StatItem
              value={host.stats.happyGuests.toLocaleString()}
              label="Happy Guests"
            />
            <StatItem
              value={host.rating.toString()}
              label={`Overall Rating (${host.reviewCount} reviews)`}
              showStar
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatItemProps {
  value: string;
  label: string;
  showStar?: boolean;
}

function StatItem({ value, label, showStar }: StatItemProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        {showStar && (
          <div className="w-7 h-7 bg-neutral-900 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 fill-white text-white" />
          </div>
        )}
        <span className="text-neutral-900 text-3xl font-bold font-['Satoshi']">
          {value}
        </span>
      </div>
      <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
        {label}
      </span>
    </div>
  );
}
