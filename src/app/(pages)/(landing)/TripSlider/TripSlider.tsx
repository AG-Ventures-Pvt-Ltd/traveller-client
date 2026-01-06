'use client'

import React, { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import TripCard from './TripCard'
import Button from '@/common/components/atoms/Button'


interface Trip {
    tripSlug: string
    image: string
    title: string
    rating: number
    location: string
    price: number
    reviewCount?: number
    days?: number
    description?: string
}

interface TripSliderProps {
    title?: string
    description?: string
    destinations?: string[]
    trips?: Trip[]
    className?: string
    showBookmark?: boolean
}


const TripSlider = ({ title, description, destinations, trips, className, showBookmark = false }: TripSliderProps) => {
    // Mock data if no trips provided
    const mockTrips: Trip[] = [
        {
            tripSlug: 'santorini-sunset',
            image: '/png/P1.png',
            title: 'Santorini Sunset',
            rating: 4.5,
            location: 'Greece',
            price: 1299,
            description: 'Experience the magical sunsets and white-washed buildings of this iconic Greek island. Explore ancient ruins and pristine beaches.'
        },
        {
            tripSlug: 'bali-temples',
            image: '/png/P1.png',
            title: 'Bali Temples',
            rating: 4.7,
            location: 'Indonesia',
            price: 899,
            description: 'Immerse yourself in lush rice terraces, ancient temples, and pristine beaches. Discover the spiritual heart of Indonesia.'
        },
        {
            tripSlug: 'paris-eiffel',
            image: '/png/P1.png',
            title: 'Paris Eiffel',
            rating: 4.8,
            location: 'France',
            price: 1599,
            description: 'Explore the city of love with iconic landmarks and romantic strolls along the Seine.'
        },
        {
            tripSlug: 'tokyo-neon',
            image: '/png/P1.png',
            title: 'Tokyo Neon',
            rating: 4.6,
            location: 'Japan',
            price: 1899,
            description: 'Dive into the vibrant nightlife and cutting-edge culture of Tokyo.'
        },
        {
            tripSlug: 'new-york-city',
            image: '/png/P1.png',
            title: 'New York City',
            rating: 4.9,
            location: 'USA',
            price: 2199,
            description: 'Experience the hustle and bustle of the Big Apple with world-class attractions.'
        },
        {
            tripSlug: 'amazon-rainforest',
            image: '/png/P1.png',
            title: 'Amazon Rainforest',
            rating: 4.4,
            location: 'Brazil',
            price: 1399,
            description: 'Venture into the heart of the rainforest for an unforgettable adventure.'
        }
    ];

    const displayTitle = title || "Our best handpicked trips";
    const displayDescription = description || "Immerse yourself in lush rice terraces, ancient temples, and pristine beaches. Discover the spiritual heart of Indonesia. Immerse yourself in lush rice terraces, ancient temples, and pristine beaches. Discover the spiritual heart of Indonesia. Immerse yourself in lush rice terraces, ancient temples, and pristine beaches. Discover the spiritual heart of Indonesia.";
    const displayTrips = trips || mockTrips;
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [hasMoved, setHasMoved] = useState(false)
    const sliderRef = React.useRef<HTMLDivElement>(null)

    const cardsToShow = 4
    const cardsToScroll = 2
    const cardWidth = 380
    const gap = 32
    const totalCardWidth = cardWidth + gap
    const maxIndex = Math.max(0, (displayTrips?.length || 0) - cardsToShow)

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - cardsToScroll))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + cardsToScroll))
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setHasMoved(false)
        setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0))
        setScrollLeft(currentIndex)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - (sliderRef.current?.offsetLeft || 0)
        const walk = (startX - x) / totalCardWidth

        // Only set hasMoved if there's significant movement
        if (Math.abs(walk) > 0.5) {
            setHasMoved(true)
        }

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
        <div className={`w-full min-h-[940px] bg-[#F0F7FE] overflow-hidden py-8 relative ${className}`}>

            <div className='text-center mb-8 px-4'>
                <div className='flex mx-[5%] gap-[16%] items-center'>
                    <h1 className='text-6xl font-bold mb-4 text-black flex-5 text-start' style={{ fontFamily: 'DM Sans' }}>{displayTitle}</h1>
                    <p className='text-[#000000CC] font-light text-sm leading-5 flex-6 text-start' style={{ fontFamily: 'Inter' }}>
                        {displayDescription}
                    </p>
                </div>
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
                        className='overflow-hidden'
                        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            className='flex transition-transform duration-500 ease-in-out'
                            style={{
                                transform: `translateX(-${currentIndex * totalCardWidth}px)`,
                                gap: `${gap}px`
                            }}
                        >
                            {displayTrips && displayTrips.map((trip) => (
                                <div
                                    key={trip.tripSlug}
                                    className='flex-shrink-0'
                                    style={{
                                        width: `${cardWidth}px`,
                                        pointerEvents: (isDragging && hasMoved) ? 'none' : 'auto'
                                    }}
                                >
                                    <TripCard trip={trip} showBookmark={showBookmark} />
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
