'use client'

import React from 'react'
import { MapPin, Star, Bookmark } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/common/ui/button";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import usePostData from "@/services/usePostData";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface Trip {
    _id: string | number
    image: string
    title: string
    rating?: number
    location: string
    price: number
    reviewCount?: number
    days?: number
    tripSlug?: string
}

interface TripCardProps {
    trip: Trip
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const handleCardClick = () => {
        if (trip.tripSlug) {
            router.push(`/trip/${trip.tripSlug}`);
        }
    };

    const toggleBookmark = usePostData({
        url: API_ENDPOINTS.BOOKMARKS.TOGGLE_BOOKMARK,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.BOOKMARKS.GET_USER_BOOKMARKS] });
        }
    });

    const handleToggleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleBookmark.mutate({ tripSlug: trip.tripSlug });
    };

    return (
        <div onClick={handleCardClick} className='bg-white rounded-xl overflow-hidden border-1 border-[#d7d7d7] shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-[390px] flex flex-col'>
            <div className='relative h-[195px] w-full overflow-hidden'>
                <Image
                    src={trip?.image || "null"}
                    alt={trip.title}
                    width={400}
                    height={195}
                    className='object-cover hover:scale-110 transition-transform duration-300 w-full h-full'
                    quality={100}
                />
                <button
                    onClick={handleToggleBookmark}
                    className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-lg hover:bg-red-50 transition-all hover:scale-110"
                >
                    <Bookmark className="w-5 h-5 text-[#008EF4] fill-[#008EF4]" />
                </button>
            </div>
            <div className='h-[50%] p-4 flex flex-col'>
                <div className='flex flex-col items-start gap-2 w-full flex-grow'>
                    <h3 className='text-lg font-normal text-gray-900 line-clamp-2 min-h-[3.5rem]'>
                        {trip.title}
                    </h3>
                    <div className='flex items-center gap-1 text-gray-600'>
                        <MapPin className='w-4 h-4' />
                        <span className='text-sm line-clamp-1'>{trip.location}</span>
                    </div>
                    {trip.rating && (
                        <div className='flex gap-1'>
                            <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                            <span className='text-sm text-gray-900 font-medium'>{trip.rating}/5</span>
                            <span className='text-sm text-gray-500'>({trip.reviewCount} Reviews)</span>
                        </div>
                    )}
                </div>
                <div className='bg-gray-300 my-2 h-[1px] w-full flex-shrink-0 '></div>
                <div className='flex justify-between items-center w-full flex-shrink-0'>
                    {trip.days && <div>{trip.days} days</div>}
                    <div>
                        <p className='text-xs text-gray-500 whitespace-nowrap'>Starting from</p>
                        <p className='text-xl font-bold text-gray-900'>${trip.price.toLocaleString('en-US')}</p>
                    </div>
                </div>
                <Button
                    size="sm"
                    className="bg-[#008EF4] hover:bg-[#0077CC] shadow-lg shadow-[#008EF4]/25 mt-2 w-full"
                >
                    Book Now
                </Button>
            </div>
        </div>
    )
}

export default TripCard
