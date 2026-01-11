import { Star } from "lucide-react";
import Image from "next/image";
import { HostCardProps } from '../types';
import Card from "@/common/ui/Card";

export function HostCard({
  name,
  avatar,
  initials,
  rating,
  totalReviews,
  joinedDate = 0,
  description,
}: HostCardProps) {
  // Generate initials from name if not provided
  const displayInitials = initials || name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col gap-6 my-8 ">
      <h2 className="text-xl font-bold text-[#0F172B] tracking-tight">Your Host</h2>

      <Card className="flex flex-col gap-4 p-6">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-[#0D203F] rounded-full flex items-center justify-center flex-shrink-0">
            {avatar ? (
              <Image
                src={avatar}
                alt={name}
                width={64}
                height={64}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-xl font-bold leading-7">
                {displayInitials}
              </span>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-lg font-bold text-[#0F172B] leading-7">{name}</h3>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-medium text-[#0F172B] leading-5">
                  {rating}
                </span>
                <span className="text-sm text-[#475569] leading-5">
                  ({totalReviews} reviews)
                </span>
              </div>
              {joinedDate && (
                <span className="text-sm text-[#475569] leading-5">
                  • Joined {joinedDate}
                </span>
              )}
            </div>
            <p className="text-sm text-[#334155] leading-6">{description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
