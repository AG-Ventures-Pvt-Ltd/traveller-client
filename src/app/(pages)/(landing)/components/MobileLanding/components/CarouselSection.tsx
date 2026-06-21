'use client';

import React from 'react';
import SlidingCarousel from './SlidingCarousel';
import { SlidingCarouselSectionProps } from '../types';
import { ArrowRightIcon } from '@phosphor-icons/react';

const CarouselSection: React.FC<SlidingCarouselSectionProps> = ({
  title,
  description,
  trips,
  isLoading = false,
  carouselIndex = 0,
  viewAllClick
}) => {

  const handleCardClick = () => {};

  return (
    <div className="w-full flex flex-col gap-3">
      <div className='flex justify-between px-4'>
        <div className="flex flex-col gap-3">
          <h2 className="text-neutral-900 text-lg sm:text-3xl lg:text-4xl font-medium leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-neutral-700 text-sm sm:text-base font-medium">
              {description}
            </p>
          )}
        </div>
        {viewAllClick && <button
          onClick={viewAllClick}
          className="flex items-center gap-1 text-sm font-semibold text-neutral-700 active:opacity-70"
        >View all <ArrowRightIcon size={16} weight="bold" />
        </button>}
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

export default CarouselSection;
