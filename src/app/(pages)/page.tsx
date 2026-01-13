'use client';

import Footer from './(landing)/Footer/Footer';
import InfoSection from './(landing)/InfoSection/InfoSection';
import ReviewSection from './(landing)/ReviewSection/ReviewSection';
import TripSlider from './(landing)/TripSlider/TripSlider';
import LoggedInLandingPage from './(landing)/LoggedInLandingPage/LoggedInLandingPage'
import { useSession } from 'next-auth/react';
import './globals.css';
// import { useGetData } from '@/services/useGetData'
// import Loader from '@/common/components/composites/Loader/loader'
// interface Trip {
//     tripSlug: string
//     image: string
//     title: string
//     rating: number
//     location: string
//     price: number
//     reviewCount?: number
//     days?: number
// }
// interface FeaturedTripsResponse {
//     trips: Trip[]
// }
import LandingPage from './(landing)/LandingPage/LandingPage';
import Loader from '@/common/ui/Loader/Loader';


export const Landing = () => {

    // const { data, isLoading } = useGetData<FeaturedTripsResponse>('/api/client/v1/trips/featured')

    // if (isLoading) {
    //     return <Loader/>
    // }

    const { status } = useSession()

    if (status === 'loading') {
        return <Loader/>
    }
    console.log(status)
    if (status == 'authenticated') {
        return (<LoggedInLandingPage/>)
    }

    return (
            <LandingPage/>
    )
}

export default Landing