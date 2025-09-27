'use client'

import Link from 'next/link'
import React from 'react'
import Button from '@/common/components/atoms/Button';
import { useRouter } from 'next/navigation';
import Search from './components/Search/Search';


const Navbar = () => {

    const NavItems = [
        { name: 'Trips', link: '/trips' },
        { name: 'About Us', link: '/about' },
        { name: 'Services', link: '/services' },
        { name: 'Explore', link: '/explore' },
    ]

    const router = useRouter();

    return (
        <div className=' flex w-full absolute z-10 justify-between '>
            <div
                className='pt-2 pb-3 sm:pt-4 sm:pb-5 bg-white w-fit pr-2 sm:pr-4 flex items-center justify-center ml-12 font-medium'>
                {NavItems.map((item, index) => (
                    <Link key={index} href={item.link} className='mx-2 sm:mx-6 text-base sm:text-xl md:text-2xl'>{item.name}</Link>
                ))}
            </div>
            <div className='mr-12 flex items-center gap-8 w-[45%]'>
                <Search/>
                <Button className='rounded-full text-3xl bg-black/40 mt-4 py-3 px-6' onClick={() => router.push('/auth')}>
                    <span className='text-white opacity-100'>Sign Up</span>
                </Button>
            </div>
        </div>
    )
}

export default Navbar
