'use client'

import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import TripSlider from './components/TripSlider/TripSlider'
import InfoSection from './components/InfoSection/InfoSection'
import ReviewSection from './components/ReviewSection/ReviewSection'
import Footer from './components/Footer/Footer'


export const Landing = () => {

    // const { data, isLoading } = useGetData<LandingPageContent>('api/client/v1/landingpage/content')

    // if (isLoading) {
    //     return <Loader/>
    // }

    const MOCK_TRIPS = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        title: 'Manali Adventure Trek',
        rating: 4.5,
        location: 'Manali, Himachal Pradesh',
        price: 6000,
        reviewCount: 23,
        days : 1
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
        title: 'Coorg Coffee Plantation Tour Lets',
        rating: 4.8,
        location: 'Coorg, Karnataka',
        price: 8500,
        reviewCount: 45,
        days : 4
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
        title: 'Goa Beach Paradise',
        rating: 4.6,
        location: 'Goa',
        price: 7200,
        reviewCount: 67,
        days : 5
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=800&h=600&fit=crop',
        title: 'Kerala Backwaters',
        rating: 4.9,
        location: 'Alleppey, Kerala',
        price: 9500,
        reviewCount: 89,
        days : 4
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
        title: 'Rajasthan Heritage Tour',
        rating: 4.7,
        location: 'Jaipur, Rajasthan',
        price: 11000,
        reviewCount: 34,
        days : 4
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
        title: 'Shimla Hill Station',
        rating: 4.4,
        location: 'Shimla, Himachal Pradesh',
        price: 6500,
        reviewCount: 56,
        days : 3
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
        title: 'Mysore Palace Experience',
        rating: 4.6,
        location: 'Mysore, Karnataka',
        price: 5800,
        reviewCount: 41,
        days : 5
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop',
        title: 'Darjeeling Tea Gardens',
        rating: 4.8,
        location: 'Darjeeling, West Bengal',
        price: 8900,
        reviewCount: 72,
        days : 3
    }
]


    return (
        <div className='w-full overflow-x-hidden'>
            <Navbar />
            <Hero />
            <div className='mt-20'>
                <TripSlider title={'Making Your Travel Dreams a Reality'}          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nostrum suscipit maiores natus, dolores, perferendis ullam rerum tempore inventore molestiae'
                    destinations={['Manali', 'Kullu', 'Coorg', 'Mysuru', 'Coimbatore', 'Delhi', 'Mumbai']}
                    trips={MOCK_TRIPS}
                />
            </div>
            <InfoSection />
            <ReviewSection />
            <Footer />
        </div>
    )
}

export default Landing