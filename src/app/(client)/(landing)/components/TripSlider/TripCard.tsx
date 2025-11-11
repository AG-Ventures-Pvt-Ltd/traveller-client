'use client'

import React from 'react'
import { MapPin, Star } from 'lucide-react'
import Image from 'next/image'

interface Trip {
    id: number
    image: string
    title: string
    rating: number
    location: string
    price: number
    reviewCount?: number
    days?: number
}

interface TripCardProps {
    trip: Trip
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
    return (
        <div className='bg-white rounded-xl overflow-hidden border-1 border-[#d7d7d7] shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-[390px] flex flex-col'>
            <div className='relative h-[195px] w-full overflow-hidden'>
                <Image
                    src={trip.image}
                    alt={trip.title}
                    width={400}
                    height={195}
                    className='object-cover hover:scale-110 transition-transform duration-300 w-full h-full'
                    quality={100}
                />
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
                    <div className='flex gap-1'>
                        <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                        <span className='text-sm text-gray-900 font-medium'>{trip.rating}/5</span>
                        <span className='text-sm text-gray-500'>({trip.reviewCount || 23} Reviews)</span>
                    </div>
                </div>
                <div className='bg-gray-300 my-2 h-[1px] w-full flex-shrink-0 '></div>
                <div className='flex justify-between items-center w-full flex-shrink-0'>
                    <div>{trip.days} days</div>
                    <div>
                        <p className='text-xs text-gray-500 whitespace-nowrap'>Starting from</p>
                        <p className='text-xl font-bold text-gray-900'>₹{trip.price.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripCard
