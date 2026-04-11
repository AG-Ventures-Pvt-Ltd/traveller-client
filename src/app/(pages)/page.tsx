'use client';


import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Loader from '@/common/ui/Loader/Loader';
import LandingPage from './(landing)/LandingPage/LandingPage';
import LoggedInLandingPage from './(landing)/LoggedInLandingPage/LoggedInLandingPage'
import HomePage from './(landing)/HomePage/page';


export const Landing = () => {

    const { status } = useSession()
    const [isMobile, setIsMobile] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
        
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (status === 'loading' || !isHydrated) {
        return <Loader/>
    }

    // Show HomePage on mobile devices only
    if (isMobile) {
        return <HomePage/>
    }

    if (status == 'authenticated') {
        return (<LoggedInLandingPage/>)
    }

    return (
        <LandingPage/>
    )
}

export default Landing