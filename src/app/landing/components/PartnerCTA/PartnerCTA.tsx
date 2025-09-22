import React from 'react'
import Button from '@/common/components/atoms/Button'
import { useRouter } from 'next/navigation';

const PartnerCTA = () => {

    const router = useRouter();
    return (
        <div className='bg-[#F5F5F5] p-12 mx-24 mt-16 mb-20 flex rounded-2xl'>
            <div className='flex-1 flex flex-col gap-4'>
                <h2 className='text-3xl font-bold'>Want to Partner with us as a Company ?</h2>
                <h3 className='text-[#4F4F53] text-base font-normal'>Start your journey today with best online booking platform with, seamless customer services, and great oppurtunities.</h3>
            </div>
            <div className='flex-1 flex justify-end gap-4 items-start '>
                <Button className='rounded-full py-3 px-6 border-[1px] '>Learn More</Button>
                <Button className='bg-[#0064D7] rounded-full py-3 px-6 text-white' onClick={() => router.push('/partner-with-us')}>Contact Us Now</Button>
            </div>
        </div>
    )
}

export default PartnerCTA