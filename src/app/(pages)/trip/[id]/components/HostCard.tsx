import { Star } from "lucide-react";
import MyImage from "@/common/ui/Image";
import { HostCardProps } from '../types';
import Card from "@/common/ui/Card";
import { useRouter } from "next/navigation";

export function HostCard({
  name,
  avatar,
  initials,
  rating,
  totalReviews,
  joinedDate = 0,
  description,
  username
}: HostCardProps) {
  // Generate initials from name if not provided
  const displayInitials = initials || name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

    const router = useRouter()

  return (
    <div className="flex flex-col gap-4 sm:gap-6 my-6 sm:my-8">
      <h2 className="text-lg sm:text-xl font-bold text-[#0F172B] tracking-tight">Your Host</h2>

      <Card className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6" onClick={() => router.push(`/${username}`)}>
        <div className="flex gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            {avatar ? (
              <MyImage
                src={avatar}
                alt={name}
                className="w-full h-full rounded-full object-cover overflow-hidden"
              />
            ) : (
              <span className="text-white text-base sm:text-xl font-bold leading-6 sm:leading-7">
                {displayInitials}
              </span>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-base sm:text-lg font-bold text-[#0F172B] leading-6 sm:leading-7 hover:underline">{name}</h3>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-xs sm:text-sm font-medium text-[#0F172B] leading-4 sm:leading-5">
                  {rating || 0}
                </span>
                <span className="text-xs sm:text-sm text-[#475569] leading-4 sm:leading-5">
                  ({totalReviews || 0} reviews) • 
                </span>
              </div> */}
              {joinedDate && (
                <span className="text-xs sm:text-sm text-[#475569] leading-4 sm:leading-5">
                  Joined {joinedDate}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#334155] leading-5 sm:leading-6">{description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
