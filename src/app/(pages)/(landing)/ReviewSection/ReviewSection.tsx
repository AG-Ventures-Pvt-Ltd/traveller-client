'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, MapPin, Star } from 'lucide-react'

interface Review {
    id: number
    image: string
    reviewCount: number
    rating: number
    description: string
    reviewerName: string
    location: string
}

const MOCK_REVIEWS: Review[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        reviewCount: 856,
        rating: 4.8,
        description: 'Amazing experience! The trip was well organized and the destinations were breathtaking. Would definitely recommend to anyone looking for an adventure.',
        reviewerName: 'Rahul Sharma',
        location: 'Mumbai, India'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
        reviewCount: 1024,
        rating: 4.9,
        description: 'Exceptional service and unforgettable memories. The team took care of everything and made our vacation truly special. Highly recommended!',
        reviewerName: 'Priya Patel',
        location: 'Bangalore, India'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
        reviewCount: 742,
        rating: 4.7,
        description: 'Great value for money. The destinations were beautiful and the itinerary was perfect. Will book again for our next trip!',
        reviewerName: 'Amit Kumar',
        location: 'Delhi, India'
    }
]

const ReviewSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? MOCK_REVIEWS.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === MOCK_REVIEWS.length - 1 ? 0 : prev + 1))
    }

    const renderStars = (rating: number) => {
        const stars = []
        const fullStars = Math.floor(rating)

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star key={`full-${i}`} className='w-5 h-5 fill-yellow-400 text-yellow-400' />
            )
        }

        for (let i = fullStars; i < 5; i++) {
            stars.push(
                <Star key={`empty-${i}`} className='w-5 h-5 text-gray-300' />
            )
        }

        return stars
    }

    return (
        <div className='w-full py-16 px-16 '>
            <div className='flex gap-32'>
                <div className='w-[60%] relative'>
                    <div className='overflow-hidden'>
                        <div
                            className='flex transition-transform duration-500 ease-in-out'
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`
                            }}
                        >
                            {MOCK_REVIEWS.map((review) => (
                                <div
                                    key={review.id}
                                    className='w-full flex-shrink-0'
                                >
                                    <div className='overflow-hidden flex h-[500px] relative'>
                                        <div className='w-[40%] relative'>
                                            <Image
                                                src={review.image}
                                                alt='Review'
                                                fill
                                                className='object-cover rounded-lg z-20'
                                                quality={100}
                                            />
                                        </div>
                                        <div className='w-[60%] p-3 flex flex-col justify-end relative'>
                                            <Image
                                                src={'/svg/quotes.svg'}
                                                alt='quotes'
                                                height={0}
                                                width={0}
                                                className='h-auto w-auto absolute right-[54%] bottom-[10%] z-10'
                                            />
                                            <div className=''>
                                                <div className='flex justify-between mb-8'>
                                                    <div className='flex items-center gap-2 mb-4'>
                                                        <span className='text-2xl text-black'>
                                                            ({review.reviewCount}/2041)
                                                        </span>
                                                        <span className='text-2xl text-black'>Reviews</span>
                                                    </div>
                                                    <div className='flex items-center gap-2 mb-6'>
                                                        <div className='flex gap-1'>
                                                            {renderStars(review.rating)}
                                                        </div>
                                                        <span className='text-lg font-normal text-[#828282]'>
                                                            {review.rating}/5
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className='text-[#333] font-normal text-lg leading-relaxed mb-6 px-8'>
                                                    {review.description}
                                                </p>
                                            </div>
                                            <div className='px-8'>
                                                <p className='text-lg font-semibold text-gray-900 mb-1'>
                                                    {review.reviewerName}
                                                </p>
                                                <div className='flex items-center gap-1 text-gray-600'>
                                                    <MapPin className='w-4 h-4' />
                                                    <span className='text-sm'>{review.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-[30%] flex flex-col justify-between gap-6'>
                    <div>
                        <h2 className='text-6xl text-black w-[70%] mb-4'>
                            What They Say About Us
                        </h2>
                        <p className='text-gray-600 text-lg leading-relaxed'>
                            Hear from our satisfied travelers who have experienced unforgettable
                            journeys with us. Their stories inspire us to continue delivering
                            exceptional travel experiences.
                        </p>
                    </div>
                    <div className='flex gap-4'>
                        <button
                            onClick={handlePrev}
                            className='bg-white rounded-full p-3 border-1 border-[#E0E0E0] hover:bg-[rgba(0,142,244,0.25)] transition-all cursor-pointer'
                            aria-label='Previous Review'
                        >
                            <ArrowLeft className='w-10 h-10 text-gray-800' strokeWidth={1} />
                        </button>
                        <button
                            onClick={handleNext}
                            className='bg-white rounded-full p-3 border-1 border-[#E0E0E0] hover:bg-[rgba(0,142,244,0.25)] transition-all cursor-pointer'
                            aria-label='Next Review'
                        >
                            <ArrowRight className='w-10 h-10 text-gray-800' strokeWidth={1} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewSection
