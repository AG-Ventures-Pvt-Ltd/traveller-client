import React from 'react';
import DestinationCard from './DestinationCard';
import TripSlider from '../../TripSlider/TripSlider';
import { useFeaturedTrips } from '@/common/hooks/useFeaturedTrips';



const FeaturedDestinations = () => {
  
  const { data: featuredTrips, isLoading, error } = useFeaturedTrips();

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-2 sm:gap-3">
        <h2 className="text-neutral-900 text-3xl sm:text-4xl lg:text-5xl font-bold font-['Satoshi'] leading-tight">
          Featured Destinations
        </h2>
        <p className="text-neutral-700 text-base sm:text-lg font-medium font-['Satoshi']">
          Explore our handpicked collection of the world's most breathtaking travel experiences
        </p>
      </div>
      <TripSlider trips={featuredTrips} isLoading={isLoading} />
    </div>
  );
};

export default FeaturedDestinations;
