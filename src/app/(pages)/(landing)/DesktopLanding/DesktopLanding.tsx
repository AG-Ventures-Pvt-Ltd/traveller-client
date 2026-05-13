import React from 'react'
import Image from 'next/image'


const DesktopLanding = () => {
    return (
        <div className='bg-[#FCF3EB] relative h-screen overflow-hidden'>
            <Image src={'/svg/BRE1.svg'} alt='BRE1' width={400} height={300} className='absolute top-0' />
            <Image src={'/svg/BRE2.svg'} alt='BRE2' width={240} height={300} className='absolute bottom-0' />
            <Image src={'/svg/BRE3.svg'} alt='BRE3' width={500} height={300} className='absolute right-0' />
            <div className='font-semibold text-2xl flex flex-col gap-10 items-center justify-center h-screen text-center'>
                <span className='text-4xl font-black'>Welcome to Wondrr</span>
                <p>
                    The desktop version of our site is currently under construction,<br /> please switch the mobile view to book your trips
                </p>
            </div>
        </div>
    )
}

export default DesktopLanding