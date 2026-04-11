'use client';

import React from 'react';
import TripSlider from '../../TripSlider/TripSlider';

interface Trip {
  _id?: string | number;
  tripSlug: string;
  image: string;
  title: string;
  rating?: number;
  location: string;
  price: number;
  reviewCount?: number;
  days?: number;
  isBookmarked?: boolean;
  description?: string;
}

interface CarouselSectionProps {
  title: string;
  description?: string;
  trips?: Trip[];
  isLoading?: boolean;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({
  title,
  description,
  trips,
  isLoading = false
}) => {
  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-2 sm:gap-3">
        <h2 className="text-neutral-900 text-2xl sm:text-3xl lg:text-4xl font-bold font-['Satoshi'] leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi']">
            {description}
          </p>
        )}
      </div>
      <TripSlider trips={trips} isLoading={isLoading} />
    </div>
  );
};

export default CarouselSection;
