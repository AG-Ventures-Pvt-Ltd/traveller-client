import React from 'react';
import Link from 'next/link';
import { Heart, MapPin, Clock, Star, IndianRupee } from 'lucide-react';
import Card from '@/common/ui/Card';
import MyImage from '@/common/ui/Image';
import BookmarkButton from '@/common/components/atoms/BookmarkButton';
import Button from '@/common/ui/Buttons/Button';


interface TripSearchCardProps {
  title: string;
  imageUrl: string;
  location: string;
  days: string;
  rating: number;
  price: number;
  hostName: string;
  hostUsername?: string;
  isBookmarked: boolean;
  tripSlug: string;
  tripUrl: string;
  onViewDetails: () => void;
}

const TripSearchCard: React.FC<TripSearchCardProps> = ({
    imageUrl,
    tripSlug,
    tripUrl,
    title,
    location,
    days,
    rating,
    price,
    isBookmarked,
    hostName,
    hostUsername,
    onViewDetails,
}) => {
    return (
        <Card className="bg-white w-full flex flex-col md:flex-row gap-4 md:gap-6 p-4 items-center" variant='outline'>
            <div className="w-80 h-45 relative rounded-2xl overflow-hidden flex-shrink-0">
                <MyImage
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full rounded-2xl"
                    style={{ objectFit: 'cover' }}
                />
                <BookmarkButton tripSlug={tripSlug} isBookmarked={isBookmarked} icon={Heart} />
                <div className="absolute bottom-3 right-4 hidden md:flex items-center gap-2">
                    <div className="bg-white rounded-xl px-1.5 pr-3 py-0.5 flex items-center gap-1">
                        <Star className="w-6 h-6 fill-[#FFC107]  text-white" />
                        <span className="text-black text-sm font-medium">{rating == 0 ? 'New' : rating}</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h3 className="text-neutral-900 text-2xl font-bold leading-7 line-clamp-2">
                        {title}
                    </h3>

                    {hostName && (
                        <div className="flex items-center gap-1.5">
                            <Link
                              href={hostUsername ? `/${hostUsername}` : '#'}
                              className="text-neutral-700 text-base font-medium hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              by {hostName}
                            </Link>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-neutral-700" />
                        <span className="text-neutral-700 text-sm font-medium">{days}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-neutral-700" />
                        <span className="text-neutral-700 text-base font-medium">{location}</span>
                    </div>
                </div>
                <div className="flex items-center flex-wrap gap-3 md:gap-5">

                </div>
            </div>
            <div className="w-full md:w-60 bg-neutral-50 rounded-2xl border-2 border-gray-200 p-4 md:p-4 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-3 md:gap-4 flex-shrink-0">
                <div className="flex flex-col gap-1">
                    <span>From</span>
                    <div className="flex items-end gap-1">
                        <span className="text-neutral-900 text-2xl md:text-4xl font-bold leading-tight md:leading-10 flex items-center">
                            <IndianRupee className="w-5 h-5 md:w-8 md:h-8" />
                            {price}
                        </span>
                        <span className="text-neutral-700 text-xs md:text-sm font-medium pb-1">/person</span>
                    </div>
                </div>
                <Link href={`/trip/${tripUrl}`} className="w-full">
                    <Button
                        variant="purple"
                        className="text-base !py-3 w-full whitespace-nowrap"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default TripSearchCard;