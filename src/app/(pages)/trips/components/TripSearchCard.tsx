import React from 'react';
import Button from '@/common/components/atoms/Button';
import { Heart, MapPin, Users, Clock, Star, Calendar, IndianRupee, User } from 'lucide-react';
import Card from '@/common/ui/Card';
import MyImage from '@/common/ui/Image';
import BookmarkButton from '@/common/components/atoms/BookmarkButton';


interface TripSearchCardProps {
    imageUrl: string;
    tripSlug:string;
    title: string;
    location: string;
    days: number;
    rating: number;
    reviewCount: number;
    price: number;
    originalPrice?: number;
    discount?: number;
    nextDeparture?: string;
    category?: string;
    tags?: string[];
    totalSeats?: number;
    difficulty?: string;
    isBookmarked:boolean;
    hostName?: string;
    onViewDetails: () => void;
}

const TripSearchCard: React.FC<TripSearchCardProps> = ({
    imageUrl,
    tripSlug,
    title,
    location,
    days,
    rating,
    reviewCount,
    price,
    originalPrice,
    discount,
    nextDeparture,
    category,
    tags = [],
    totalSeats,
    isBookmarked,
    hostName,
    onViewDetails,
}) => {
    return (
        <Card className="w-full relative flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6" variant='outline'>
            {/* Image Section */}
            <div className="w-full md:w-80 h-48 md:h-60 relative rounded-2xl overflow-hidden flex-shrink-0">
                <MyImage
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full rounded-2xl"
                    style={{ objectFit: 'cover' }}
                />
                <BookmarkButton tripSlug={tripSlug} isBookmarked={isBookmarked} icon={Heart}/>
                {discount && (
                    <div className="absolute top-3 left-3 bg-neutral-900 rounded-full px-3 py-1.5">
                        <span className="text-white text-xs font-bold flex items-center ">Save <IndianRupee/> {discount}</span>
                    </div>
                )}
                {category && (
                    <div className="absolute bottom-3 left-3 bg-white/95 rounded-full px-3 py-1.5">
                        <span className="text-neutral-900 text-xs font-bold">{category}</span>
                    </div>
                )}
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h3 className="text-neutral-900 text-2xl font-bold leading-7">{title}</h3>
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-neutral-700" />
                        <span className="text-neutral-700 text-base font-medium">{location}</span>
                    </div>
                    {hostName && (
                        <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4 text-neutral-700" />
                            <span className="text-neutral-700 text-base font-medium">Hosted by {hostName}</span>
                        </div>
                    )}
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <div className="bg-neutral-900 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                        <span className="text-white text-sm font-bold">{rating}</span>
                    </div>
                    <span className="text-neutral-700 text-sm font-medium">({reviewCount} reviews)</span>
                </div>
                {/* {tags.length > 0 && (
                    <div className="hidden md:flex flex-wrap gap-2.5">
                        {tags.slice(0, 3).map((tag, index) => (
                            <div key={index} className="bg-neutral-50 rounded-full px-3 py-1.5">
                                <span className="text-neutral-900 text-xs md:text-sm font-medium">{tag}</span>
                            </div>
                        ))}
                    </div>
                )} */}
                <div className="flex items-center flex-wrap gap-3 md:gap-5">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-neutral-700" />
                        <span className="text-neutral-700 text-sm font-medium">{days} days</span>
                    </div>
                    {totalSeats && (
                        <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-neutral-700" />
                            <span className="text-neutral-700 text-sm font-medium">{totalSeats}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full md:w-60 bg-neutral-50 rounded-2xl border-2 border-gray-200 p-4 md:p-4 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-3 md:gap-4 flex-shrink-0">
                <div className="flex flex-col gap-1">
                    {originalPrice && (
                        <span className="text-neutral-700 text-sm md:text-lg font-medium line-through flex items-center">₹{originalPrice}</span>
                    )}
                    <div className="flex items-end gap-1">
                        <span className="text-neutral-900 text-2xl md:text-4xl font-bold leading-tight md:leading-10 flex items-center">
                            <IndianRupee className="w-5 h-5 md:w-8 md:h-8"/>
                            {price}
                        </span>
                        <span className="text-neutral-700 text-xs md:text-sm font-medium pb-1">/person</span>
                    </div>
                </div>
                {nextDeparture && (
                    <div className="hidden md:flex flex-col gap-1">
                        <span className="text-neutral-900 text-xs font-bold">Departs On</span>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-neutral-700" />
                            <span className="text-neutral-700 text-sm font-medium">{nextDeparture}</span>
                        </div>
                    </div>
                )}
                <Button
                    color="primary"
                    onClick={onViewDetails}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl h-10 md:h-12 text-sm md:text-base px-6 md:w-full md:px-0 whitespace-nowrap"
                >
                    View Details
                </Button>
            </div>
        </Card>
    );
};

export default TripSearchCard;