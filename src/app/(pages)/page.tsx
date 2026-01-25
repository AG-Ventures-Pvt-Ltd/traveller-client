'use client';


import { useSession } from 'next-auth/react';
import Loader from '@/common/ui/Loader/Loader';
import LandingPage from './(landing)/LandingPage/LandingPage';
import LoggedInLandingPage from './(landing)/LoggedInLandingPage/LoggedInLandingPage'
import './globals.css';


export const Landing = () => {

    const { status } = useSession()

    if (status === 'loading') {
        return <Loader/>
    }

    if (status == 'authenticated') {
        return (<LoggedInLandingPage/>)
    }

    return (
        <LandingPage/>
    )
}

export default Landing