'use client'
import React, { useMemo } from 'react'
import Footer from '../Footer/Footer'
import { useSession } from 'next-auth/react'
import { SearchIcon, Globe2, Plane, MapPin, Compass, Mountain, Waves, Camera, Sun, Anchor, Map } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useFeaturedTrips } from '@/common/hooks/useFeaturedTrips';
import { useSignupBonus } from '@/common/hooks/useSignupBonus';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import StatsBanner from './components/StatsBanner';
import CarouselSection from './components/CarouselSection';
import TrustSection from './components/TrustSection';
import ExploreByDestination from '../common/ExploreByDestination/ExploreByDestination';

const DesktopLanding = () => {

  const { status, data: userData } = useSession()
  const router = useRouter();
  const [searchValue, setSearchValue] = React.useState('');

  const { data: featuredTripsData, isLoading: isTripsLoading } = useFeaturedTrips();
  const { data: signupBonusData } = useSignupBonus();
  const { data: travelerStatsData } = useGetData<{ count: number }>(API_ENDPOINTS.LANDING_PAGE.TRAVELER_STATS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      router.push(`/trips?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleExplore = () => {
    if (searchValue.trim()) {
      router.push(`/trips?q=${encodeURIComponent(searchValue.trim())}`);
    } else {
      router.push('/trips');
    }
  };

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

  const showSignupBanner = status === 'unauthenticated' && signupBonusData?.signupBonus?.isEnabled;
  const showStatsBanner = (travelerStatsData?.count ?? 0) > 0;

  return (
    <main className="flex flex-col items-center overflow-hidden bg-[#FFF9F4]">

      <div className='w-full'>
        <div className='bg-[#D0EF65] mx-24 rounded-2xl flex flex-col items-center py-16 my-2 relative overflow-hidden min-h-[480px]'>

          <Plane        className="absolute top-5 left-8   w-16 h-16 text-neutral-800 opacity-[0.09] rotate-[20deg]  pointer-events-none" />
          <Compass      className="absolute top-4 right-10  w-14 h-14 text-neutral-800 opacity-[0.09] -rotate-6       pointer-events-none" />
          <MapPin       className="absolute bottom-6 left-10 w-11 h-11 text-neutral-800 opacity-[0.09]                pointer-events-none" />
          <Globe2       className="absolute bottom-4 right-8 w-16 h-16 text-neutral-800 opacity-[0.09] rotate-[10deg] pointer-events-none" />
          <Mountain     className="absolute top-8  left-[20%] w-10 h-10 text-neutral-800 opacity-[0.07]              pointer-events-none" />
          <Camera       className="absolute top-5  right-[20%] w-9 h-9 text-neutral-800 opacity-[0.07] rotate-6     pointer-events-none" />
          <Waves        className="absolute bottom-5 left-[32%] w-12 h-12 text-neutral-800 opacity-[0.07]           pointer-events-none" />
          <Sun          className="absolute -top-2 left-[46%] w-16 h-16 text-neutral-800 opacity-[0.06] rotate-45   pointer-events-none" />
          <Anchor       className="absolute bottom-8 right-[24%] w-9 h-9 text-neutral-800 opacity-[0.07]            pointer-events-none" />
          <Map          className="absolute top-6  right-[34%] w-8 h-8 text-neutral-800 opacity-[0.06]              pointer-events-none" />
          <Plane        className="absolute bottom-4 right-[42%] w-8 h-8 text-neutral-800 opacity-[0.06] rotate-[-30deg] pointer-events-none" />
          <MapPin       className="absolute top-10 left-[52%] w-7 h-7 text-neutral-800 opacity-[0.06]               pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center w-full">
            <h1 className='text-5xl font-bold text-center'>What&apos;s your next escape,<br />{status == 'authenticated' ? userData.user?.fullName : 'Traveller'} ?</h1>
            <p className='pt-4 text-center'>Safe group adventures for solo travelers who want to travel with like-minded strangers.</p>
            <div className="relative mt-12 w-[60%]">
              <SearchIcon className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" strokeWidth={2} />
              <input
                type="text"
                placeholder={'Search by keywords or places'}
                value={searchValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full bg-white rounded-2xl pl-14 pr-32 py-4 text-neutral-900 placeholder-neutral-500 text-base border-2 border-white focus:outline-none focus:border-neutral-300"
                enterKeyHint="search"
              />
              <button
                onClick={handleExplore}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-neutral-900 text-white text-sm font-semibold px-4 py-3 rounded-xl hover:bg-neutral-700 transition-colors"
              >
                Explore
              </button>
            </div>
          </div>

        </div>
      </div>

      {(showSignupBanner || showStatsBanner) && (
        <div className="w-full px-24 mt-4 flex gap-4">
          {showSignupBanner && (
            <StatsBanner
              variant="signup"
              amount={signupBonusData!.signupBonus.amount}
            />
          )}
          {showStatsBanner && (
            <StatsBanner
              variant="stats"
              count={travelerStatsData!.count}
            />
          )}
        </div>
      )}

      {!isTripsLoading && sortedCarousels.length > 0 && (
        <div className="w-full px-24 mt-10 flex flex-col gap-12 mb-12">
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
      )}

      {isTripsLoading && (
        <div className="w-full px-24 mt-10 mb-12 flex flex-col gap-12">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col gap-5">
              <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex gap-5">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="flex-shrink-0 rounded-3xl bg-gray-200 animate-pulse" style={{ width: 280, height: 360 }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full px-24 mt-2 mb-12">
        <ExploreByDestination variant="desktop" />
      </div>

      <TrustSection />

      <Footer />
    </main>
  )
}

export default DesktopLanding
