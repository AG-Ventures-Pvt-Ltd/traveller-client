import React from 'react'
import Button from '@/common/components/atoms/Button'
import ImageCoursel from '@/common/components/composites/ImageCoursel'
import { useRouter } from "next/navigation";


const ThisMonthTrips = () => {

    const router = useRouter();

    const images2 = [
        {
            src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
            alt: "Headphones 1",
            title: "Wireless Pro",
            location: 'Gangtok, Sikkim',
            price: '220',
            route : '/trip'
        },
        {
            src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
            alt: "Headphones 2",
            title: "Studio Max",
            location: 'Gangtok, Sikkim',
            price: '220',
            route : '/trip'
        },
        {
            src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
            alt: "Headphones 3",
            title: "Bass Elite",
            location: 'Gangtok, Sikkim',
            price: '220',
            route : '/trip'
        }
    ];

    return (
        <div className='mt-20'>
            <ImageCoursel images={images2} title='Top Trips this month' description='Lorem ipsum dolor sit amet pisum ' />
            <div className='flex justify-center '>
                <Button className='bg-black text-white px-5 py-3 text-base rounded-full font-semibold' onClick={() => router.push('/trips')}>Explore more</Button>
            </div>
        </div>
    )
}

export default ThisMonthTrips