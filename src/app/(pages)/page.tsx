'use client';

import './globals.css';
import Navbar from './(landing)/Navbar/Navbar';
import Hero from './(landing)/Hero/Hero'
import TripSlider from './(landing)/TripSlider/TripSlider'
import InfoSection from './(landing)/InfoSection/InfoSection'
import ReviewSection from './(landing)/ReviewSection/ReviewSection'
import Footer from './(landing)/Footer/Footer'
import { useGetData } from '@/services/useGetData'
import Loader from '@/common/components/composites/Loader/loader'
interface Trip {
    tripSlug: string
    image: string
    title: string
    rating: number
    location: string
    price: number
    reviewCount?: number
    days?: number
}
interface FeaturedTripsResponse {
    trips: Trip[]
}

export const Landing = () => {

    const { data, isLoading } = useGetData<FeaturedTripsResponse>('/api/client/v1/trips/featured')

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className='w-full overflow-x-hidden'>
            <Navbar />
            <Hero />
            <div className='mt-20'>
                <TripSlider title={'Making Your Travel Dreams a Reality'}          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nostrum suscipit maiores natus, dolores, perferendis ullam rerum tempore inventore molestiae'
                    destinations={['Manali', 'Kullu', 'Coorg', 'Mysuru', 'Coimbatore', 'Delhi', 'Mumbai']}
                    trips={data?.trips || []}
                />
            </div>
            <InfoSection />
            <ReviewSection />
            <Footer />
        </div>
    )
}

export default Landing