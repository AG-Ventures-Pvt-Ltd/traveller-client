'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import DestinationCard from '../LoggedInLandingPage/components/DestinationCard'


interface Trip {
    _id?: string | number;
    tripSlug: string;
    image: string;
    title: string;
    rating?: number;
    location: string;
    price: number;
    reviewCount?: number;
    days?: number;
    isBookmarked?: boolean;
    description?: string;
}

interface TripSliderProps {
    trips?: Trip[]
    className?: string
    showBookmark?: boolean
    isLoading?: boolean
}


const TripSlider = ({ trips, className, showBookmark = true, isLoading = false }: TripSliderProps) => {

    const displayTrips = trips;
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [hasMoved, setHasMoved] = useState(false)
    const [windowWidth, setWindowWidth] = useState(1024)
    const sliderRef = React.useRef<HTMLDivElement>(null)

    // Handle window resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Responsive values based on window width
    const cardsToShow = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3
    const cardsToScroll = 1
    const cardWidth = windowWidth < 640 ? 300 : windowWidth < 1024 ? 320 : 380
    const gap = windowWidth < 640 ? 12 : 24
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

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true)
        setHasMoved(false)
        setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0))
        setScrollLeft(currentIndex)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - (sliderRef.current?.offsetLeft || 0)
        const walk = (startX - x) / totalCardWidth

        if (Math.abs(walk) > 0.3) {
            setHasMoved(true)
        }

        const newIndex = Math.round(scrollLeft + walk)
        const clampedIndex = Math.max(0, Math.min(maxIndex, newIndex))
        setCurrentIndex(clampedIndex)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0)
        const walk = (startX - x) / totalCardWidth

        if (Math.abs(walk) > 0.3) {
            setHasMoved(true)
        }

        const newIndex = Math.round(scrollLeft + walk)
        const clampedIndex = Math.max(0, Math.min(maxIndex, newIndex))
        setCurrentIndex(clampedIndex)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        setHasMoved(false)
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
        setHasMoved(false)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    return (
        <div className={`w-full overflow-hidden relative ${className}`}>
            <div className='relative mx-auto px-4 sm:px-6 lg:px-8'>
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className='hidden sm:flex absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all border shadow-md'
                    aria-label='Previous'
                >
                    <ArrowLeft className='w-3 h-3 sm:w-4 sm:h-4 text-gray-800' />
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentIndex >= maxIndex}
                    className='hidden sm:flex absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 sm:p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all border shadow-md'
                    aria-label='Next'
                >
                    <ArrowRight className='w-4 h-4 text-gray-800' />
                </button>
                <div
                    ref={sliderRef}
                    className='overflow-hidden'
                    style={{ 
                        cursor: isDragging ? 'grabbing' : 'grab',
                        width: `${(cardsToShow + 0.5) * cardWidth + (cardsToShow) * gap}px`
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className='flex transition-transform duration-500 ease-in-out'
                        style={{
                            transform: `translateX(-${currentIndex * totalCardWidth}px)`,
                            gap: `${gap}px`
                        }}
                    >
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={`loading-${index}`}
                                    className='flex-shrink-0'
                                    style={{
                                        width: `${cardWidth}px`,
                                        pointerEvents: 'none'
                                    }}
                                >
                                    <div className="w-full bg-white rounded-3xl border-2 border-gray-200 overflow-hidden flex flex-col animate-pulse">
                                        <div className="h-[240px] bg-gray-200"></div>
                                        <div className="flex-1 p-6 flex flex-col gap-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="h-8 bg-gray-200 rounded"></div>
                                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                                            </div>
                                            <div className="w-full h-px bg-gray-200"></div>
                                            <div className="flex justify-between items-center">
                                                <div className="h-6 bg-gray-200 rounded w-24"></div>
                                                <div className="h-10 bg-gray-200 rounded-full w-20"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            displayTrips && displayTrips.map((trip) => (
                                <div
                                    key={trip.tripSlug}
                                    className='flex-shrink-0'
                                    style={{
                                        width: `${cardWidth}px`,
                                        pointerEvents: (isDragging && hasMoved) ? 'none' : 'auto'
                                    }}
                                >
                                    <DestinationCard trip={trip} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripSlider
