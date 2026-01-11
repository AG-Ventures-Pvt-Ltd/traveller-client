'use client'

import React from 'react'
import { MapPin, Star, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/common/ui/Buttons/Button";
import { useRouter } from "next/navigation";
import BookmarkButton from "@/common/components/atoms/BookmarkButton";


interface Trip {
    _id?: string | number
    image: string
    title: string
    rating?: number
    location: string
    price: number
    reviewCount?: number
    days?: number
    tripSlug?: string
    isBookmarked?: boolean
    description?: string
}

interface TripCardProps {
    trip: Trip
    showBookmark?: boolean
}

const TripCard: React.FC<TripCardProps> = ({ trip, showBookmark = false }) => {

    const router = useRouter();


    const handleCardClick = () => {
        if (trip.tripSlug) {
            router.push(`/trip/${trip.tripSlug}`);
        }
    };

    return (
        <div onClick={handleCardClick} className='relative w-full h-[480px] rounded-3xl overflow-hidden cursor-pointer'>
            <Image
                src={trip?.image || "null"}
                alt={trip.title}
                fill
                className='object-cover opacity-90'
                quality={100}
            />
            <ArrowUpRight className='absolute top-8 right-8 bg-black/50 rounded-full text-white p-2' size={48}/>
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0)_100%)]" />
            {showBookmark && (
                <div className="absolute top-6 right-6">
                    <BookmarkButton tripSlug={trip.tripSlug!} isBookmarked={trip.isBookmarked || false} />
                </div>
            )}
            <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/20 rounded-full px-3 py-1 inline-block mb-3">
                    <span className="text-white text-sm font-inter">{trip.location}</span>
                </div>
                <h3 className="text-white text-3xl font-normal leading-9 mb-3 font-inter">{trip.title}</h3>
                {trip.description && (
                    <p className="text-white/80 text-sm leading-5 mb-4 font-inter">{trip.description}</p>
                )}
                <div className="flex items-baseline">
                    <span className="text-white text-2xl font-normal font-inter">${trip.price}</span>
                    <span className="text-white/60 text-sm ml-3 font-inter">per person</span>
                </div>
            </div>
        </div>
    )
}

export default TripCard
