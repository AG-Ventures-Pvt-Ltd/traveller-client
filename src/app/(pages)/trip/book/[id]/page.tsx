'use client'


import { useDevice } from '@/common/hooks/useDevice';
import BookingPage from './components/mobile/BookingPage';
import { redirect } from 'next/navigation';



const Page = () => {

     const { isMobile } = useDevice();
    
        if (isMobile) {
            return <BookingPage/>
        }
    
    redirect('/')

}

export default Page