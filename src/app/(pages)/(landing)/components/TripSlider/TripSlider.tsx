'use client'

import React, { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import TripCard from './TripCard'
import Button from '@/common/components/atoms/Button'


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

interface TripSliderProps {
    title?: string
    description?: string
    destinations?: string[]
    trips?: Trip[]
}

const MOCK_TRIPS: Trip[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'Manali Adventure Trek',
        rating: 4.5,
        location: 'Manali, Himachal Pradesh',
        price: 6000,
        reviewCount: 23,
        days : 1
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
        title: 'Coorg Coffee Plantation Tour Lets',
        rating: 4.8,
        location: 'Coorg, Karnataka',
        price: 8500,
        reviewCount: 45,
        days : 4
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
        title: 'Goa Beach Paradise',
        rating: 4.6,
        location: 'Goa',
        price: 7200,
        reviewCount: 67,
        days : 5
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=800&h=600&fit=crop',
        title: 'Kerala Backwaters',
        rating: 4.9,
        location: 'Alleppey, Kerala',
        price: 9500,
        reviewCount: 89,
        days : 4
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
        title: 'Rajasthan Heritage Tour',
        rating: 4.7,
        location: 'Jaipur, Rajasthan',
        price: 11000,
        reviewCount: 34,
        days : 4
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
        title: 'Shimla Hill Station',
        rating: 4.4,
        location: 'Shimla, Himachal Pradesh',
        price: 6500,
        reviewCount: 56,
        days : 3
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
        title: 'Mysore Palace Experience',
        rating: 4.6,
        location: 'Mysore, Karnataka',
        price: 5800,
        reviewCount: 41,
        days : 5
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop',
        title: 'Darjeeling Tea Gardens',
        rating: 4.8,
        location: 'Darjeeling, West Bengal',
        price: 8900,
        reviewCount: 72,
        days : 3
    }
]

const TripSlider = ({ title, description, destinations, trips }: TripSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const sliderRef = React.useRef<HTMLDivElement>(null)
    
    const cardsToShow = 4
    const cardsToScroll = 2
    const maxIndex = Math.max(0, MOCK_TRIPS.length - cardsToShow)

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - cardsToScroll))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + cardsToScroll))
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0))
        setScrollLeft(currentIndex)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - (sliderRef.current?.offsetLeft || 0)
        const walk = (startX - x) / 100
        const newIndex = Math.round(scrollLeft + walk)
        const clampedIndex = Math.max(0, Math.min(maxIndex, newIndex))
        setCurrentIndex(clampedIndex)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    return (
        <div className='w-full py-8 relative'>
            
                <div className='text-center mb-8'>
                   {title && <h1 className='text-6xl font-bold mb-4'>{title}</h1>}
                   {description && 
                   <p className='text-[#828282] font-light'>
                        {description}
                    </p>}
                    <div className='flex justify-center gap-4 mt-6 flex-wrap px-4'>
                        {destinations && destinations
                            .map((i) => <Button className='!bg-[#0808080D] !text-black !rounded-3xl !px-4 !py-2 !flex !gap-1 !items-center' variant={'text'} key={i}>{i}</Button>
                        )}
                    </div>
                </div>
        
            <div className='mx-auto px-4'>
                <div className='relative px-8'>
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all border-1 cursor-pointer'
                        aria-label='Previous'
                    >
                        <ArrowLeft className='w-4 h-4 text-gray-800' />
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= maxIndex}
                        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all border-1 cursor-pointer'
                        aria-label='Next'
                    >
                        <ArrowRight className='w-4 h-4 text-gray-800' />
                    </button>
                    <div 
                        ref={sliderRef}
                        className='overflow-hidden cursor-grab active:cursor-grabbing'
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            className='flex transition-transform duration-500 ease-in-out gap-4'
                            style={{
                                transform: `translateX(calc(-${currentIndex * 25}% - ${currentIndex * 4}px))`,
                                pointerEvents: isDragging ? 'none' : 'auto'
                            }}
                        >
                            {trips && trips.map((trip) => (
                                <div
                                    key={trip.id}
                                    className='flex-shrink-0'
                                    style={{ width: 'calc(25% - 12px)' }}
                                >
                                    <TripCard trip={trip} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripSlider
