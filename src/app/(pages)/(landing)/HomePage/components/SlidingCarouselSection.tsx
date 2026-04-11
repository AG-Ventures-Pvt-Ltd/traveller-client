'use client';

import React from 'react';
// import { useRouter } from 'next/navigation';
import SlidingCarousel from './SlidingCarousel';

interface Trip {
  id: string | number;
  image: string;
  title: string;
  provider: string;
  duration: string;
  price: number;
  rating: number;
}

interface SlidingCarouselSectionProps {
  title: string;
  description?: string;
  trips: Trip[];
  isLoading?: boolean;
}

const SlidingCarouselSection: React.FC<SlidingCarouselSectionProps> = ({
  title,
  description,
  trips,
  isLoading = false
}) => {

  const handleCardClick = (trip: Trip) => {
    // Navigate to trip details or perform action
    console.log('Card clicked:', trip);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col gap-3 pl-1">
        <h2 className="text-neutral-900 text-lg sm:text-4xl lg:text-5xl font-medium font-['Satoshi'] leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi']">
            {description}
          </p>
        )}
      </div>
      <SlidingCarousel
        trips={trips}
        isLoading={isLoading}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default SlidingCarouselSection;
