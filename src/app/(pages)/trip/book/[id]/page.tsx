'use client'


import { useDevice } from '@/common/hooks/useDevice';
import BookingPage from './components/mobile/BookingPage';



const Page = () => {

     const { isMobile } = useDevice();
    
        if (isMobile) {
            return <BookingPage/>
        }
    
    return (
        <></>
    )

}

export default Page