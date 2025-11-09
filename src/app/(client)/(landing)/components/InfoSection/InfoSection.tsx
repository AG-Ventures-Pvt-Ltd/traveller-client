'use client'

import React from 'react'
import Image from 'next/image'

const InfoSection = () => {
    return (
        <div className='p-16'>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between gap-4'>
                    <div className='flex flex-col justify-center gap-4 w-[40%]'>
                        <h2 className='text-5xl font-medium text-black'>
                            Explore the World
                        </h2>
                        <p className='text-[#828282] text-base leading-relaxed font-light'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, 
                            voluptatum. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Quisquam, voluptatum.
                        </p>
                    </div>
                    <div className='flex gap-4 w-[60%]'>
                        <div className='w-[60%] h-[250px] relative rounded-lg overflow-hidden'>
                            <Image
                                src='https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop'
                                alt='Destination 1'
                                fill
                                className='object-cover'
                            />
                        </div>
                        <div className='w-[50%] h-[250px] relative rounded-lg overflow-hidden'>
                            <Image
                                src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop'
                                alt='Destination 2'
                                fill
                                className='object-cover'
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center gap-16'>
                    <div className='flex  gap-4 w-[65%]'>
                        <div className='h-[250px] w-[60%] relative rounded-lg overflow-hidden'>
                            <Image
                                src='https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop'
                                alt='Experience 1'
                                fill
                                className='object-cover'
                            />
                        </div>
                        <div className='flex-1 h-[250px] w-[40%] relative rounded-lg overflow-hidden'>
                            <Image
                                src='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop'
                                alt='Experience 2'
                                fill
                                className='object-cover'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 w-[35%]'>
                        <h2 className='text-2xl font-normal text-black'>
                            Unforgettable Experiences
                        </h2>
                        <p className='text-[#828282] text-base leading-relaxed font-normal'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, 
                            voluptatum. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSection
