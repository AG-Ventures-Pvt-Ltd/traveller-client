'use client'

import React from 'react'
import Button from '@/common/components/atoms/Button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'


const Footer = () => {
    const navOptions = ['Home', 'About', 'Trips', 'Contact']

    return (
        <div className='w-full py-16 px-16'>
                <div className='flex items-end justify-between '>
                    <div className='w-[50%]'>
                        <h2 className='text-5xl text-black mb-8 w-[60%]'>
                            Tailored Travel Experiences Just for You
                        </h2>
                        <div className='flex gap-4'>
                            {navOptions.map((option) => (
                                <button
                                    key={option}
                                    className='bg-white text-black text-lg pr-8 py-3 rounded-lg hover:bg-gray-100 transition-all'
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 w-[35%]'>
                        <p className='text-[#828282] font-normal leading-relaxed'>
                            Discover amazing destinations and create unforgettable memories with our 
                            expertly curated travel packages. Let us help you plan your dream vacation today.
                        </p>
                        <div>
                            <Button
                                variant='contained'
                                className='!text-black !text-lg !font-normal !px-6 !py-2 !rounded-full !bg-[rgba(0,142,244,0.25)] '
                            >
                               Go Travelling <ArrowRight className='w-5 h-5 ml-2' strokeWidth={2}/>
                            </Button>
                        </div>
                    </div>
                </div>
                <Image
                    src='/svg/Wondrr.svg'
                    alt='quotes'
                    height={0}
                    width={0}
                    className='h-auto w-[75%] mt-24 absolute'
                />      
        </div>
    )
}

export default Footer
