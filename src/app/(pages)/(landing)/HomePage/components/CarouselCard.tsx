'use client';

import React from 'react';
import Link from 'next/link';
import { StarIcon, SealCheckIcon, HeartIcon } from '@phosphor-icons/react';
import MyImage from '@/common/ui/Image';
import { CarouselCardProps } from '../types';
import { useBookMarking } from '@/common/hooks/useBookMarking';
import { generateSlug } from '@/app/(pages)/trip/utils';

const CarouselCard: React.FC<CarouselCardProps> = ({
  id,
  image,
  title,
  provider,
  duration,
  price,
  rating,
  className,
  colorScheme = 'yellow',
  onClick,
  tripSlug,
  isBookmarked: initialIsBookmarked = false,
  priority = false,
}) => {

  const slug = tripSlug || String(id);
  const href = `/trip/${generateSlug(title, tripSlug || String(id))}`;

  const { isBookmarked, toggle } = useBookMarking(slug, initialIsBookmarked);

  const bgColor =
    colorScheme === 'yellow' ? 'bg-[#FFD976]' :
      colorScheme === 'green' ? 'bg-[#E2F4A6]' :
        'bg-[#EEA0FF]';
  const borderColor =
    colorScheme === 'yellow' ? 'border-[#FFD976]' :
      colorScheme === 'green' ? 'border-[#E2F4A6]' :
        'border-[#EEA0FF]';

  return (
    <Link
      href={href}
      onClick={() => onClick?.()}
      className={`w-full h-full ${bgColor} rounded-3xl overflow-hidden border-10 ${borderColor} cursor-pointer hover:shadow-lg transition-shadow flex flex-col`}
    >
      <div className="relative h-32 overflow-hidden rounded-3xl">
        <MyImage
          src={image}
          alt={title}
          className="w-full h-full"
          rounded={false}
          priority={priority}
        />
        {/* Bookmark button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(e); }}
          className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-black/70 hover:bg-black transition-colors z-10"
        >
          <HeartIcon
            size={16}
            weight={isBookmarked ? 'fill' : 'regular'}
            className={isBookmarked ? 'text-red-500' : 'text-white'}
          />
        </button>
        <div className="absolute bottom-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
          <StarIcon size={14} className="w-3 h-3 text-yellow-500" weight="fill" />
          <span className="text-neutral-900 text-xs font-bold font-['Satoshi']">
            {rating == 0 ? 'New' : rating }
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
            <SealCheckIcon size={14} />
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
    </Link>
  );
};

export default CarouselCard;
