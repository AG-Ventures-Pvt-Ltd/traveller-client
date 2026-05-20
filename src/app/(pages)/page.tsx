'use client';


import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/common/ui/Loader/Loader';
import { useLocation } from '@/common/hooks/useLocation';


const DesktopLanding = dynamic(() => import('./(landing)/DesktopLanding/DesktopLanding'), { loading: () => <Loader /> })

const HomePage = dynamic(() => import('./(landing)/HomePage/page'), { ssr: false });


export const Landing = () => {

    const { status } = useSession()
    const [isMobile, setIsMobile] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const { requestLocationPermission } = useLocation();

    useEffect(() => {
        setIsHydrated(true);

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'granted') {
                requestLocationPermission().catch(() => { });
            } else if (result.state === 'prompt') {
                const timer = setTimeout(() => {
                    requestLocationPermission().catch(() => { });
                }, 15000);
                return () => clearTimeout(timer);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHydrated]);


    if (status === 'loading' || !isHydrated) {
        return <Loader />
    }

    // Show HomePage on mobile devices only
    if (isMobile) {
        return <HomePage />
    }

    return <DesktopLanding />
}

export default Landing