'use client'

import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'lucide-react';

const Navbar = () => {

    const NavItems = [
        { name: 'Tour', link: '/tour' },
        { name: 'About Us', link: '/about' },
        { name: 'Services', link: '/services' },
        { name: 'Explore', link: '/explore' },
    ]
    return (
        <div className=' flex w-full absolute z-10 justify-between '>
            <div
                className='pt-2 pb-3 sm:pt-4 sm:pb-5 bg-white w-fit pr-2 sm:pr-4 flex items-center justify-center ml-12 font-medium'>
                {NavItems.map((item, index) => (
                    <Link key={index} href={item.link} className='mx-2 sm:mx-6 text-base sm:text-xl md:text-2xl'>{item.name}</Link>
                ))}
            </div>
            <div className='mr-12 flex items-center gap-8 w-[45%]'>
                <div className='w-[70%] items-center h-[80%] mt-4 relative'>
                    <input
                        className='bg-white w-full h-full rounded-4xl px-6 pr-24'
                        placeholder='Location, Address or Destination' />
                    <button
                        className='absolute right-2 top-1/2 -translate-y-1/2 bg-[#0064D7] hover:bg-blue-700 text-white rounded-full px-4 py-2 text-base font-semibold shadow flex items-center justify-center h-[80%] w-[20%]'
                        aria-label='Search'
                    >
                        <ArrowRight size={22} />
                    </button>
                </div>
                <button className='rounded-full text-3xl bg-black/40 mt-4 py-3 px-6'>
                    <span className='text-white opacity-100'>Sign Up</span>
                </button>
            </div>
        </div>
    )
}

export default Navbar
