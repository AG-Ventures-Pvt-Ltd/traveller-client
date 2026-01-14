import React from 'react';
import HeroSection from './components/HeroSection';
import SearchCard from './components/SearchCard';
import FeaturedDestinations from './components/FeaturedDestinations';
import Footer from '../Footer/Footer';

const LoggedInLandingPage = () => {
  return (
    <>
      <div className="w-full bg-white px-4 sm:px-6 lg:px-9 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-24">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-12 sm:gap-16 lg:gap-24">
          <div className="relative flex flex-col gap-8 sm:gap-10 lg:gap-12">
            <HeroSection />
            {/* <SearchCard /> */}
          </div>
          <FeaturedDestinations />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoggedInLandingPage;
