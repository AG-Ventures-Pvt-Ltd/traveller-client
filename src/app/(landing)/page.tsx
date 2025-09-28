'use client'

import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Carousel from './components/slider'
import StatesCarousel from './components/StatesCarousel/StatesCarousel'
import OurWorking from './components/OurWorking/OurWorking'
import ThisMonthTrips from './components/ThisMonthTrips/ThisMonthTrips'
import TripReviews from './components/TripReviews/TripReviews'
import PartnerCTA from './components/PartnerCTA/PartnerCTA'
import Footer from './components/Footer/Footer'
import { useGetData } from '@/services/useGetData'
import { Review } from './components/TripReviews/TripReviews'
import Loader from '@/components/Loader/loader'


 interface LandingPageContent  {
        testimonials: Review[];
        activeRegions : string[];
};

export const Landing = () => {

    const { data, isLoading } = useGetData<LandingPageContent>('api/client/v1/landingpage/content')

    if (isLoading) {
        return <Loader/>
    }

    const testoms = [{
        name: "John Doe",
        role: "Traveler",
        review: "This was an amazing experience! The trip was well organized and the destinations were breathtaking.",
        priority: 1 
    },
    {
        name: "Jane Smith",
        role: "Adventure Seeker",
        review: "I loved every moment of the trip. The activities were thrilling and the guides were very knowledgeable.",
        priority: 2
    },
    {
        name: "Emily Johnson",
        role: "Nature Enthusiast",
        review: "The natural beauty we encountered was stunning. I highly recommend this trip to anyone who loves the outdoors.",
        priority: 3
    }
]

    return (
        <div >
            <div>
                <div className='relative mt-4'>
                    <Navbar />
                    <div className='px-4'>
                        <Carousel />
                    </div>
                </div>
            </div>
            <StatesCarousel activeRegions={data?.activeRegions || []}/>
            <OurWorking />
            <ThisMonthTrips />
            <TripReviews reviews={data?.testimonials || testoms} />
            <PartnerCTA />
            <Footer />
        </div>
    )
}

export default Landing