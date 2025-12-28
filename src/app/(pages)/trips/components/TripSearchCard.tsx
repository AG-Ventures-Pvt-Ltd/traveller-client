import React from 'react';
import Image from 'next/image';
import Button from '@/common/components/atoms/Button';
import { Heart, MapPin, Users, Clock, Star, AlarmClock } from 'lucide-react';

interface TripSearchCardProps {
    imageUrl: string;
    title: string;
    location: string;
    days: number;
    rating: number;
    reviewCount: number;
    price: number;
    seatsLeft: number;
    totalSeats: number;
    onBookmark: () => void;
    onBookNow: () => void;
}

const SeatsLeft = ({ seatsLeft, totalSeats }: { totalSeats: number, seatsLeft: number }) => {

    const isSeatLow = seatsLeft < 0.1 * totalSeats;
    return (
        <div className={`text-sm mb-4 flex items-center justify-end gap-1 ${isSeatLow ? 'text-red-600' : 'text-gray-600'}`}>
            {isSeatLow && <AlarmClock className="w-4 h-4" />}
            <p>{seatsLeft} seats left</p>
        </div>
    )
}


const TripSearchCard: React.FC<TripSearchCardProps> = ({
    imageUrl,
    title,
    location,
    days,
    rating,
    reviewCount,
    price,
    seatsLeft,
    totalSeats,
    onBookmark,
    onBookNow,
}) => {
    return (
        <div className="bg-card text-card-foreground flex h-52 overflow-hidden rounded-lg border border-[#ececec] shadow-none p-1.5">
            <div className="relative w-1/5 h-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="18vw"
                    className="object-cover rounded-sm"
                    loading="eager"
                />
                <Button
                    variant='text'
                    color='info'
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={onBookmark}
                >
                    <Heart className="w-4 h-4" />
                </Button>
            </div>
            <div className="flex-1 flex flex-col justify-between px-4 py-6">
                <div className='flex flex-col gap-1'>
                    <h3 className="text-xl font-bold mb-1">{title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                        <MapPin className="w-4 h-4 mr-1 inline" />
                        <p>{location}</p>
                    </div>
                    <div className='flex gap-8'>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Users className="w-4 h-4 mr-1 inline" />
                            <p>{totalSeats} people</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Clock className="w-4 h-4 mr-1 inline" />
                            <p>{days} days</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                    <div>
                        <span className="text-sm text-gray-900 font-medium">{rating}/5 </span>
                        <span className='text-sm text-gray-500'>({reviewCount} reviews)</span>
                    </div>
                </div>
            </div>
            <div className="w-1/4 flex flex-col justify-center items-end p-4 text-right">
                <p className='text-xs text-gray-500 whitespace-nowrap -mb-1'>Starting from</p>
                <p className="text-2xl font-bold mb-1">₹{price.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mb-1">Excluding taxes and charges</p>
                <SeatsLeft seatsLeft={seatsLeft} totalSeats={totalSeats} />
                <Button color='primary' onClick={onBookNow}>Book Now</Button>
            </div>
        </div>
    );
};

export default TripSearchCard;