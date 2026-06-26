'use client';

import React from 'react';
import CarouselCard from './CarouselCard';
import { SlidingCarouselProps } from '../types';

const COLOR_PAIRS: Array<['yellow' | 'green' | 'purple', 'yellow' | 'green' | 'purple']> = [
  ['yellow', 'green'],
  ['purple', 'yellow'],
];

const SlidingCarousel: React.FC<SlidingCarouselProps> = ({
  trips,
  isLoading = false,
  onCardClick,
  carouselIndex = 0,
}) => {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full sm:w-80 h-96 bg-gray-200 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {trips.map((trip, index) => (
        <div key={trip.id} className="flex-shrink-0 w-[200px]">
          <CarouselCard
            {...trip}
            colorScheme={COLOR_PAIRS[carouselIndex % 2][index % 2]}
            onClick={() => onCardClick?.()}
            priority={carouselIndex === 0 && index === 0}
          />
        </div>
      ))}
    </div>
  );
};

export default SlidingCarousel;
