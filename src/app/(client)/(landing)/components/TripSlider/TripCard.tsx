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
}

interface TripCardProps {
    trip: Trip
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
    return (
        <div className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-[420px] flex flex-col'>
            <div className='relative h-[70%] w-full overflow-hidden'>
                <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    className='object-cover hover:scale-110 transition-transform duration-300'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                />
            </div>
            <div className='h-[30%] p-4 flex items-center justify-between'>
                <div className='flex flex-col justify-center gap-2'>
                    <h3 className='text-lg font-semibold text-gray-900 line-clamp-1'>
                        {trip.title}
                    </h3>
                    <div className='flex items-center gap-1'>
                        <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                        <span className='text-sm text-gray-900 font-medium'>{trip.rating}/5</span>
                        <span className='text-sm text-gray-500'>({trip.reviewCount || 23} Reviews)</span>
                    </div>
                    <div className='flex items-center gap-1 text-gray-600'>
                        <MapPin className='w-4 h-4' />
                        <span className='text-sm line-clamp-1'>{trip.location}</span>
                    </div>
                </div>
                <div className='flex flex-col items-end justify-center'>
                    <p className='text-xs text-gray-500 whitespace-nowrap'>Starting from</p>
                    <p className='text-xl font-bold text-gray-900'>₹{trip.price.toLocaleString('en-IN')}</p>
                </div>
            </div>
        </div>
    )
}

export default TripCard
