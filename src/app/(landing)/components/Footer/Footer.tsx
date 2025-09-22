import React, { useState } from 'react'
import Button from '@/common/components/atoms/Button'
import Link from 'next/link'
import usePostData from '@/services/usePostData'


const Footer = () => {

    const [email,setEmail] = useState('')

    const { mutate } = usePostData({ url: '/api/client/v1/newsletter/add' })

    const handleSubscription = () => {
        mutate({email})    
    }

    return (
        <div className='bg-black text-white p-8 m-4 rounded-2xl'>
            <div className='flex justify-between'>
                <div>
                    <h2 className='text-8xl font-bold'>Wondrr</h2>
                    <h4 className='text-base font-light'>Where Journeys Begin & Friendships Last</h4>
                </div>
                <div className='flex flex-col gap-4 w-[34%]'>
                    <div className='text-xl font-semibold'>Get Trip Updates & Exclusive Deals</div>
                    <div className='flex gap-4 '>
                        <input className='rounded-full border-[1px] px-4 py-2 w-full' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}/>
                        <Button className='bg-white text-black rounded-full' onClick={handleSubscription}>Subscribe</Button>
                    </div>
                </div>
            </div>
            <div className='flex justify-between pt-8 mt-12 border-t-[1px]'>
                <h2>© 2025 Wondrr. All rights reserved.</h2>
                <div>
                    {[{
                        name: 'Terms of Service',
                        link: '/privacy-policy'
                    },
                    {
                        name: 'Privacy Policy',
                        link: '/privacy-policy'
                    },
                    {
                        name: 'Cancellation Policy',
                        link: '/privacy-policy'
                    }].map((item, idx) => (
                        <Link key={idx} className='mx-4' href={item.link}>{item.name}</Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Footer