'use client';


import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/common/ui/Loader/Loader';


const DesktopLanding = dynamic(() => import('./(landing)/DesktopLanding/DesktopLanding'), { loading: () => <Loader /> })

const HomePage = dynamic(() => import('./(landing)/HomePage/page'), { ssr: false });


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
    
    return <DesktopLanding/>
}

export default Landing