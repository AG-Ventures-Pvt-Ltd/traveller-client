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
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [hasMoved, setHasMoved] = useState(false)
    const sliderRef = React.useRef<HTMLDivElement>(null)
    
    const cardsToShow = 4
    const cardsToScroll = 2
    const maxIndex = Math.max(0, (trips?.length || 0) - cardsToShow)

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
        const walk = (startX - x) / 100
        
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
        <div className={`w-full py-8 relative ${className}`}>
            
                {title && description && <div className='text-center mb-8'>
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
                </div>}
        
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
                            className='flex transition-transform duration-500 ease-in-out gap-4'
                            style={{
                                transform: `translateX(calc(-${currentIndex * 25}% - ${currentIndex * 4}px))`,
                            }}
                        >
                            {trips && trips.map((trip) => (
                                <div
                                    key={trip.tripSlug}
                                    className='flex-shrink-0'
                                    style={{ 
                                        width: 'calc(25% - 12px)',
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
