'use client';

import React, { useMemo, useEffect } from 'react';
import LocationSelector from './components/LocationSelector';
import SuggestionBanner from './components/SuggestionBanner';
import StatisticsBanner from './components/StatisticsBanner';
import SlidingCarouselSection from './components/SlidingCarouselSection';
import { useFeaturedTrips } from '@/common/hooks/useFeaturedTrips';
import Footer from '../Footer/Footer';
import { useSession } from 'next-auth/react';
import usePostData from '@/services/usePostData';



const HomePage = () => {
    const handleSearch = (value: string) => {
        // Handle search functionality here
        // console.log('Search:', value);
    };

    const { data: session } = useSession();
    const { data: featuredTripsData, isLoading: isTripsLoading } = useFeaturedTrips();
      
      const { mutate: updateWallet } = usePostData({ 
        url: '/api/client/v1/wallet/update',
        retry: (failureCount, error) => (error as any)?.response?.status !== 409
      });
    
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

    // Transform featured trips data to carousel format with random ratings
    const transformedTrips = useMemo(() => {
        if (!featuredTripsData) return [];
        
        const parseDays = (daysString: string): string => {
            // Parse "4 Days / 3 Nights" format to "4N . 3D"
            const match = daysString.match(/(\d+)\s*Days?\s*\/\s*(\d+)\s*Nights?/i);
            if (match) {
                return `${match[1]}N • ${match[2]}D`;
            }
            return daysString;
        };
        
        return featuredTripsData.map((trip) => ({
            id: trip.tripSlug,
            image: trip.image,
            title: trip.title,
            provider: trip.hostName,
            duration: parseDays(trip.days),
            price: trip.price,
            rating: Math.random() * 1 + 4, // Random rating between 4 and 5
        }));
    }, [featuredTripsData]);

    return (
        <>
            <div className="w-full bg-white px-4 sm:px-6 lg:px-9 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-24">
                <div className="max-w-[1440px] mx-auto flex flex-col gap-8 sm:gap-10 lg:gap-12">
                    <LocationSelector location="Delhi" avatar={customImage} />
                    <div className='flex flex-col gap-2'>
                        <SuggestionBanner
                            suggestion={suggestion}
                            placeholder="Search by keywords or places"
                            onSearch={handleSearch}
                        />
                        {/* <StatisticsBanner
                            text="156+ Travellers booked with us"
                            duration="last month"
                        /> */}
                    </div>
                    {/* First Carousel - Most Booked This Weekend */}
                    {/* <CarouselSection
                        title="Most Booked This Weekend"
                        description="Explore popular destinations trending right now"
                        trips={mostBookedTrips}
                        isLoading={isMostBookedLoading}
                    />

                    {/* Second Carousel - Top Rated by Travelers */}
                    {/* <CarouselSection
                        title="Top Rated by Travelers"
                        description="Discover destinations loved by our community"
                        trips={topRatedTrips}
                        isLoading={isTopRatedLoading}
                    /> */}

                    {/* Sliding Carousel Section with Featured Trips */}
                    <SlidingCarouselSection
                        title="Most Booked Trips"
                        trips={transformedTrips}
                        isLoading={isTripsLoading}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HomePage;
