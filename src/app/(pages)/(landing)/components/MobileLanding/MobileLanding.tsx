'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import LocationSelector from './components/LocationSelector';
import SuggestionBanner from './components/SuggestionBanner';
import CarouselSection from './components/CarouselSection';
import Skeleton from './components/Skeleton';
import { useFeaturedTrips } from '@/common/hooks/useFeaturedTrips';
import { useSignupBonus } from '@/common/hooks/useSignupBonus';
import Footer from '../Footer/Footer';
import { useSession } from 'next-auth/react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { CitiesResponse } from './components/LocationSelector';
import StatsBanner from './components/StatsBanner';
import ExploreByDestination from '../common/ExploreByDestination/ExploreByDestination';
import TravelPassBanner from '../common/TravelPassBanner/TravelPassBanner';
import TrustSection from './components/TrustSection';
import RecognitionSection from '../common/RecognitionSection/RecognitionSection';
import ClosingCta from '../common/ClosingCta/ClosingCta';
import SignupPerksModal from '@/common/components/composites/SignupPerksModal';
import { useOnceEverModal } from '@/common/hooks/useOnceEverModal';
import { SIGNUP_PERKS_MODAL_STORAGE_KEY } from '@/common/components/composites/SignupPerksModal';

const MobileLanding = () => {
    const handleSearch = (value: string) => {};  // eslint-disable-line @typescript-eslint/no-unused-vars

    const { data: session, status } = useSession();
    const { data: featuredTripsData, isLoading: isTripsLoading } = useFeaturedTrips();
    const { data: cities, isLoading: cityLoading } = useGetData<CitiesResponse>(API_ENDPOINTS.LANDING_PAGE.CITIES)
    const { data: signupBonusData, isLoading: isBonusLoading } = useSignupBonus();
    const { data: travelerStatsData } = useGetData<{ count: number }>(API_ENDPOINTS.LANDING_PAGE.TRAVELER_STATS);
    // useGetData derives `enabled` from the url, so an empty url skips the call for guests.
    const { data: walletData } = useGetData<{ balance: number }>(
        status === 'authenticated' ? API_ENDPOINTS.WALLET.BALANCE : '',
        { queryKey: [API_ENDPOINTS.WALLET.BALANCE] }
    );

    const { show: showSignupModal, dismiss: dismissSignupModal } = useOnceEverModal(
        60_000,
        SIGNUP_PERKS_MODAL_STORAGE_KEY,
        status === 'unauthenticated'
    );

    const fullName = session?.user?.fullName || '';
    const firstName = fullName.split(' ')[0] || 'Traveler';
    const customImage = session?.user?.avatar;
    const suggestion = `${firstName}'s next escape ?`;

    const sortedCarousels = useMemo(() => {
        if (!featuredTripsData) return [];

        return [...featuredTripsData]
            .sort((a, b) => a.priority - b.priority)
            .map((carousel) => ({
                id: carousel._id,
                title: carousel.title,
                trips: carousel.trips.map((trip) => ({
                    id: trip.tripSlug,
                    image: trip.image,
                    title: trip.title,
                    provider: trip.hostName,
                    hostUsername: trip.hostUsername,
                    duration: trip.days,
                    price: trip.price,
                    rating: trip.rating,
                    tripSlug: trip.tripSlug,
                    isBookmarked: trip.isBookmarked,
                })),
            }));
    }, [featuredTripsData]);

    return (
        <>
            {isTripsLoading ? (
                <Skeleton />
            ) : (
                <div className="w-full bg-[#FFF9F4] sm:px-6 lg:px-9 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-24">
                    <div className="max-w-[1440px] mx-auto flex flex-col gap-4 sm:gap-10 lg:gap-12">
                        <LocationSelector avatar={customImage} cities={cities || { cities: [] }} cityLoading={cityLoading} />
                        <div className='flex flex-col gap-4 px-4'>
                            <SuggestionBanner
                                suggestion={suggestion}
                                placeholder="Search by keywords or places"
                                onSearch={handleSearch}
                            />
                            {/* Social proof + signup / Wondrr Cash offer, right under the search */}
                            {status === 'unauthenticated' && signupBonusData?.signupBonus.isEnabled && <StatsBanner
                                message={`Sign up to get ₹${signupBonusData?.signupBonus.amount} Wondrr Cash free!`}
                            />}
                            {status === 'authenticated' && (
                                <Link href={(walletData?.balance ?? 0) > 0 ? '/trips' : '/travel-pass'}>
                                    <StatsBanner
                                        message={(walletData?.balance ?? 0) > 0
                                            ? `You have ₹${walletData!.balance.toLocaleString('en-IN')} Wondrr Cash — use it on your next trip →`
                                            : 'Grow your Wondrr Cash — Travel Pass adds a bonus on top →'}
                                    />
                                </Link>
                            )}
                            {(travelerStatsData?.count ?? 0) > 0 && <StatsBanner
                                message={`Join ${travelerStatsData!.count}+ travellers planning their next trip with Wondrr`}
                            />}
                        </div>
                        <div className='flex flex-col gap-8'>
                            {sortedCarousels.map((carousel, index) => (
                                <CarouselSection
                                    key={carousel.id}
                                    title={carousel.title}
                                    trips={carousel.trips}
                                    isLoading={isTripsLoading}
                                    carouselIndex={index}
                                />
                            ))}
                        </div>
                        {/* Story: trips → trust → afford → still deciding? → belief → go */}
                        <TrustSection />
                        <div className='px-4'>
                            <TravelPassBanner variant="mobile" />
                        </div>
                        <div className='px-4 pt-4'>
                            <ExploreByDestination
                                variant="mobile"
                                title="Still deciding? Start with a place."
                                subtitle="Group trips, sorted by where they’re headed."
                            />
                        </div>
                        <RecognitionSection variant="mobile" />
                        <div className='px-4'>
                            <ClosingCta variant="mobile" />
                        </div>
                    </div>
                </div>
            )}
            <Footer />

            <SignupPerksModal
                open={showSignupModal}
                onClose={dismissSignupModal}
                signupBonusEnabled={signupBonusData?.signupBonus.isEnabled}
                signupBonusAmount={signupBonusData?.signupBonus.amount}
            />
        </>
    );
};

export default MobileLanding;
