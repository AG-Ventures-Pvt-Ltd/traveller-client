'use client'

import React from 'react'
import Loader from '@/common/components/composites/Loader/loader'
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


    return (
        <div className='w-full overflow-x-hidden'>
            <Navbar />
            <Hero />
            <div className='mt-20'>
                <TripSlider />
            </div>
            <InfoSection />
            <ReviewSection />
            <Footer />
        </div>
    )
}

export default Landing