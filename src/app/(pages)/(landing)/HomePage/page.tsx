'use client';

import React, { useMemo } from 'react';
import LocationSelector from './components/LocationSelector';
import SuggestionBanner from './components/SuggestionBanner';
import SlidingCarouselSection from './components/SlidingCarouselSection';
import HomePageSkeleton from './components/HomePageSkeleton';
import { useFeaturedTrips } from '@/common/hooks/useFeaturedTrips';
import { useSignupBonus } from '@/common/hooks/useSignupBonus';
import Footer from '../Footer/Footer';
import { useSession } from 'next-auth/react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { CitiesResponse } from './components/LocationSelector';
import StatisticsBanner from './components/StatisticsBanner';

const HomePage = () => {
    const handleSearch = (value: string) => { };  // eslint-disable-line @typescript-eslint/no-unused-vars

    const { data: session, status } = useSession();
    const { data: featuredTripsData, isLoading: isTripsLoading } = useFeaturedTrips();
    const { data: cities, isLoading: cityLoading } = useGetData<CitiesResponse>(API_ENDPOINTS.LANDING_PAGE.CITIES)
    const { data: signupBonusData, isLoading: isBonusLoading } = useSignupBonus();
    const { data: travelerStatsData } = useGetData<{ count: number }>(API_ENDPOINTS.LANDING_PAGE.TRAVELER_STATS);

    // Signup bonus data available for use:
    // signupBonusData?.signupBonus?.amount - The bonus amount in currency
    // signupBonusData?.signupBonus?.isEnabled - Whether signup bonus is active 
    //     url: '/api/client/v1/wallet/update',
    //     retry: (failureCount, error) => (error as any)?.response?.status !== 409
    //   });

    // Check spinWheelData and update wallet on mount
    // useEffect(() => {
    //   const spinWheelData = localStorage.getItem('spinWheelData');
    //   if (spinWheelData && session?.user?.id) {
    //     try {
    //       const data = JSON.parse(spinWheelData);

    //       // Only make API call if not already claimed
    //       if (!data.claimed) {
    //         const payload = {
    //           rewardAmount: data.rewardAmount,
    //           timestamp: data.timestamp,
    //         };

    //         updateWallet(
    //           payload,
    //           {
    //             onSuccess: () => {
    //               // Mark as claimed and update localStorage
    //               const updatedData = {
    //                 ...data,
    //                 claimed: true,
    //               };
    //               localStorage.setItem('spinWheelData', JSON.stringify(updatedData));
    //             },
    //             onError: (error) => {
    //               console.error('Failed to update wallet:', error);
    //             },
    //           }
    //         );
    //       }
    //     } catch (error) {
    //       console.error('Failed to parse spinWheelData:', error);
    //     }
    //   }
    // }, [session?.user?.id, updateWallet]);

    // Extract firstName from fullName
    const fullName = session?.user?.fullName || '';
    const firstName = fullName.split(' ')[0] || 'Traveler';
    const customImage = session?.user?.avatar;
    const suggestion = `${firstName}'s next escape ?`;

    // Transform carousels data sorted by priority
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
                    duration: trip.days,
                    price: trip.price,
                    rating: Math.random() * 1 + 4,
                    tripSlug: trip.tripSlug,
                    isBookmarked: trip.isBookmarked,
                })),
            }));
    }, [featuredTripsData]);

    return (
        <>
            {isTripsLoading ? (
                <HomePageSkeleton />
            ) : (
                <div className="w-full bg-[#FFF9F4] sm:px-6 lg:px-9 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-24">
                    <div className="max-w-[1440px] mx-auto flex flex-col gap-4 sm:gap-10 lg:gap-12">
                        <LocationSelector avatar={customImage} cities={cities || { cities: [] }} cityLoading={cityLoading} />
                        <div className='flex flex-col gap-4 px-4'>
                            {status === 'unauthenticated' && signupBonusData?.signupBonus.isEnabled && <StatisticsBanner
                                message={`Sign up to get ₹${signupBonusData?.signupBonus.amount} Wondrr Cash free!`}
                            />}
                            <SuggestionBanner
                                suggestion={suggestion}
                                placeholder="Search by keywords or places"
                                onSearch={handleSearch}
                            />
                            {(travelerStatsData?.count ?? 0) > 0 && <StatisticsBanner
                                message={`${travelerStatsData!.count}+ Travellers booked with us last month`}
                            />}
                        </div>
                        <div className='flex flex-col gap-8'>
                            {sortedCarousels.map((carousel, index) => (
                                <SlidingCarouselSection
                                    key={carousel.id}
                                    title={carousel.title}
                                    trips={carousel.trips}
                                    isLoading={isTripsLoading}
                                    carouselIndex={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default HomePage;
