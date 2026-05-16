'use client';

import React from 'react';
// import { useRouter } from 'next/navigation';
import SlidingCarousel from './SlidingCarousel';
import { SlidingCarouselSectionProps } from '../types';

const SlidingCarouselSection: React.FC<SlidingCarouselSectionProps> = ({
  title,
  description,
  trips,
  isLoading = false,
  carouselIndex = 0,
}) => {

  const handleCardClick = () => {
    // Navigate to trip details or perform action
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col gap-3 pl-4">
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
        carouselIndex={carouselIndex}
      />
    </div>
  );
};

export default SlidingCarouselSection;
