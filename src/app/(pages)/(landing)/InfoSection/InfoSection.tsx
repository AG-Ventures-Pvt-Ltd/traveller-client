'use client'

import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

const InfoSection = () => {
    return (
        <div className="w-full bg-[#F0F7FE] flex max-h-screen py-[2%] px-[5%]">
            <div className='flex-2 flex flex-col items-start justify-between'>
                <div className="text-black text-4xl font-bold">
                    About us
                </div>
                <div className="w-[188.66px] h-[191.37px] relative">
                    <div className="w-[144.52px] h-[141.25px] -left-5 -top-5 bg-[#C0CFFD] rounded-2xl transform -rotate-3 absolute"></div>
                    <div className='w-40 h-40 absolute rounded-lg'>
                        <Image
                            src="/png/P2.png"
                            alt="Image 2"
                            width={0}
                            height={0}
                            className="object-cover w-full h-full rounded-2xl"
                            unoptimized
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-72">
                    <div className="flex flex-col gap-3">
                        <div className="text-black text-6xl font-bold">4.9/5</div>
                        <div className="flex gap-2">
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                        </div>

                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex">
                            <div className="w-10 h-10 rounded-full ">
                                <Image
                                    src="/png/P1.png"
                                    alt="Avatar 1"
                                    width={0}
                                    height={0}
                                    className='object-cover w-full h-full rounded-full'
                                />
                            </div>
                            <div className="w-10 h-10 rounded-full ">
                                <Image
                                    src="/png/P1.png"
                                    alt="Avatar 1"
                                    width={0}
                                    height={0}
                                    className='object-cover w-full h-full rounded-full'
                                />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#C0CFFD] flex items-center justify-center -ml-2">
                                <div className="text-white text-2xl font-normal">+</div>
                            </div>
                        </div>
                        <div className="px-6 py-2 bg-[#0D203F] rounded-3xl flex items-center justify-center">
                            <div className="text-white text-sm font-normal whitespace-nowrap">100k Happy customers</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-3 flex flex-col items-start justify-between gap-28'>
                <div className="text-black text-5xl font-semibold text-end">
                    Discover India with no hesitation
                </div>
                <div className="flex items-center gap-4">
                    <Image
                        src="/png/P2.png"
                        alt="Image 3"
                        width={304}
                        height={347}
                        className="rounded-xl"
                    />
                    <Image
                        src="/png/P2.png"
                        alt="Image 4"
                        width={211}
                        height={241}
                        className="rounded-lg"
                    />
                </div>
            </div>
            <div className='flex-2 flex flex-col items-end justify-between gap-28 relative'>
                <div className="w-[288.5px] h-[292.64px] left-[1064.5px] top-[66.36px]">
                    <div className="w-[221px] h-[216px] bg-[#C0CFFD] rounded-2xl transform -rotate-3 absolute"></div>
                    <div className="w-60 h-65 rounded-full absolute top-7 right-6">
                        <Image
                            src="/png/P1.png"
                            alt="Avatar 1"
                            width={0}
                            height={0}
                            unoptimized
                            className='object-cover w-full h-full rounded-2xl'
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-72">
                    <div className="text-black text-xl font-normal">
                        Unforgettable experiences, tailored just for you - all in one place
                    </div>
                    <div className="px-6 py-2 bg-[#0D203F] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#1a2a4a]">
                        <div className="text-white text-sm font-normal">
                            Explore Featured Destinations →
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSection
