import React from 'react';
import HeroSection from './components/HeroSection';
import SearchCard from './components/SearchCard';
import FeaturedDestinations from './components/FeaturedDestinations';

const LoggedInLandingPage = () => {
  return (
    <div className="w-full bg-white px-9 pt-10 pb-24">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-24">
        <div className="relative flex flex-col gap-12">
          <HeroSection />
          {/* <SearchCard /> */}
        </div>
        <FeaturedDestinations />
      </div>
    </div>
  );
};

export default LoggedInLandingPage;
