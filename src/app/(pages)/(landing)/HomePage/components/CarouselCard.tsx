'use client';

import React from 'react';
import { StarIcon, SealCheckIcon } from '@phosphor-icons/react';
import MyImage from '@/common/ui/Image';


interface CarouselCardProps {
  id: string | number;
  image: string;
  title: string;
  provider: string;
  duration: string;
  price: number;
  rating: number;
  colorScheme?: 'yellow' | 'green';
  onClick?: () => void;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  id,
  image,
  title,
  provider,
  duration,
  price,
  rating,
  colorScheme = 'yellow',
  onClick
}) => {
  const bgColor = colorScheme === 'yellow' ? 'bg-[#FFD976]' : 'bg-[#E2F4A6]';
  const borderColor = colorScheme === 'yellow' ? 'border-[#FFD976]' : 'border-[#E2F4A6]';

  return (
    <div
      onClick={onClick}
      className={`w-full h-full ${bgColor} rounded-3xl overflow-hidden border-10 ${borderColor} cursor-pointer hover:shadow-lg transition-shadow flex flex-col`}
    >
      <div className="relative h-32 overflow-hidden rounded-3xl">
        <MyImage
          src={image}
          alt={title}
          className="w-full h-full"
          rounded={false}
        />
        <div className="absolute bottom-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
          <StarIcon size={14} className="w-3 h-3 text-yellow-500" weight="fill" />
          <span className="text-neutral-900 text-xs font-bold font-['Satoshi']">
            New
          </span>
        </div>
      </div>
      <div className="flex-1 p-3 sm:p-3 flex flex-col gap-1.5">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-neutral-900 text-base sm:text-base font-bold font-['Satoshi'] line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-1">
            <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">
              by {provider}
            </p>
            <SealCheckIcon size={14}/>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 pt-0">
          <p className="text-neutral-700 text-xs font-medium font-['Satoshi']">
            {duration}
          </p>
          <div className="flex items-baseline">
            <span className="text-neutral-900 text-sm font-bold font-['Satoshi']">
              From ₹{price.toLocaleString('en-IN')}/
            </span>
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
              adult
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
