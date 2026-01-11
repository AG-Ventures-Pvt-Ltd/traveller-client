'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'


interface Testimonial {
    id: number
    name: string
    role: string
    quote: string
    avatar: string
}

const MOCK_TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah Mitchell',
        role: 'Travel Blogger',
        quote: 'This platform completely transformed how I plan my trips! The curated destinations and seamless booking process saved me hours of research. Every recommendation is worth!',
        avatar: '/png/P2.png',
    },
    {
        id: 2,
        name: 'Emma Rodriguez',
        role: 'Digital Nomad',
        quote: 'As someone who travels frequently, I appreciate the quality and variety of destinations. The booking experience is incredibly smooth!',
        avatar: '/png/P2.png',
    },
    {
        id: 3,
        name: 'Marcus Chen',
        role: 'Business Executive',
        quote: 'Outstanding service from start to finish. The attention to detail and personalized itineraries made my family vacation unforgettable.',
        avatar: '/png/P2.png',
    },
    {
        id: 4,
        name: 'Emma Rodriguez',
        role: 'Digital Nomad',
        quote: 'As someone who travels frequently, I appreciate the quality and variety of destinations. The booking experience is incredibly smooth!',
        avatar: '/png/P2.png',
    }
]

const ReviewSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? MOCK_TESTIMONIALS.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev === MOCK_TESTIMONIALS.length - 1 ? 0 : prev + 1))
    }
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="text-[#FFB900] fill-[#FFB900]" size={16} />
        ))
    }

    return (
        <div className="w-full min-h-[691px] bg-[#F0F7FE] overflow-hidden py-16 px-16">
            <div className="text-7xl font-bold text-[#0D203F] mb-8">
                What people say<br /> about us ?
            </div>
            <div className="flex gap-[41px] justify-center">
                {MOCK_TESTIMONIALS.map((testimonial, index) => (
                    <div
                        key={testimonial.id}
                        className={`bg-[#E3EAFF] rounded-xl transition-transform duration-500 ${index === activeIndex ? 'scale-120' : 'scale-100'}`}
                    >
                        {/* <div className="-top-3 -left-3 w-12 h-12 bg-gradient-to-br from-[#C0CFFD] to-[#4C79FF] rounded-full shadow-md flex items-center justify-center">
                            <div className="w-6 h-6 relative overflow-hidden">
                                <div className="w-[7px] h-[18px] left-[14px] top-[3px] absolute bg-white outline-2 outline-white outline-offset-[-1px]" />
                                <div className="w-[7px] h-[18px] left-[3px] top-[3px] absolute bg-white outline-2 outline-white outline-offset-[-1px]" />
                            </div>
                        </div> */}
                        <div className="p-6 pt-8 flex flex-col">
                            <div className="flex gap-1.5 mb-4">
                                {renderStars()}
                            </div>
                            <div className="flex-1 text-[#0D203F] font-normal leading-relaxed mb-6" style={{ fontFamily: 'Inter', fontSize: testimonial.id === 1 ? '18px' : '16px', lineHeight: testimonial.id === 1 ? '29.25px' : '24px' }}>
                                &quot;{testimonial.quote}&quot;
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`rounded-full overflow-hidden ${testimonial.id === 1 ? 64 : 48}`}>
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        width={0}
                                        height={0}
                                        className="h-full w-full shadow-sm object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="text-[#0D203F] font-normal" style={{ fontFamily: 'Inter', fontSize: testimonial.id === 1 ? '18px' : '16px', lineHeight: testimonial.id === 1 ? '28px' : '24px' }}>
                                        {testimonial.name}
                                    </div>
                                    <div className="text-[#0D203F] font-normal text-sm" style={{ fontFamily: 'Inter', lineHeight: '20px' }}>
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={handlePrev}
                    className="bg-white rounded-full p-3 border border-gray-300 hover:bg-blue-50 transition-all cursor-pointer"
                    aria-label="Previous Testimonial"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button
                    onClick={handleNext}
                    className="bg-white rounded-full p-3 border border-gray-300 hover:bg-blue-50 transition-all cursor-pointer"
                    aria-label="Next Testimonial"
                >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
            </div>
        </div>
    )
}

export default ReviewSection
