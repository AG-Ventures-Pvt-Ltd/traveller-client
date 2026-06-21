'use client';

import React from 'react';
import Link from 'next/link';
import { HeartIcon, SealCheckIcon, CurrencyInrIcon, StarIcon } from '@phosphor-icons/react';
import MyImage from '@/common/ui/Image';
import { CarouselCardProps } from '../../MobileLanding/types';
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
  colorScheme = 'yellow',
  onClick,
  tripSlug,
  isBookmarked: initialIsBookmarked = false,
}) => {

  const slug = tripSlug || String(id);
  const href = `/trip/${generateSlug(title, tripSlug || String(id))}`;
  const { isBookmarked, toggle } = useBookMarking(slug, initialIsBookmarked);

  const bgColor =
    colorScheme === 'yellow' ? 'bg-[#FFD976]' :
    colorScheme === 'green'  ? 'bg-[#E2F4A6]' :
                               'bg-[#EEA0FF]';
  const borderColor =
    colorScheme === 'yellow' ? 'border-[#FFD976]' :
    colorScheme === 'green'  ? 'border-[#E2F4A6]' :
                               'border-[#EEA0FF]';

  return (
    <Link
      href={href}
      onClick={() => onClick?.()}
      className={`w-full h-full ${bgColor} rounded-3xl overflow-hidden border-[10px] ${borderColor} cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex flex-col`}
    >
      <div className="relative h-40 overflow-hidden rounded-2xl flex-shrink-0">
        <MyImage src={image} alt={title} className="w-full h-full" rounded={false} />

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(e); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black flex items-center justify-center z-10 transition-colors"
        >
          <HeartIcon
            size={16}
            weight={isBookmarked ? 'fill' : 'regular'}
            className={isBookmarked ? 'text-red-500' : 'text-white'}
          />
        </button>

        <div className="absolute bottom-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
          <StarIcon size={14} weight="fill" className="text-yellow-500" />
          <span className="text-neutral-900 text-xs font-bold">
            {rating > 0 ? rating.toFixed(1) : 'New'}
          </span>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-1.5">
        <h3 className="text-neutral-900 text-base font-bold  line-clamp-2 leading-tight">
          {title}
        </h3>

        <div className="flex items-center gap-1">
          <span className=" text-xs font-medium truncate">by {provider}</span>
          <SealCheckIcon size={13} className=" flex-shrink-0" />
        </div>

        <p className=" text-xs font-medium">{duration}</p>

        <div className="mt-auto flex flex-col">
          <div className="flex items-center">
            <span className='font-semibold mr-1.5'>From</span>
            <CurrencyInrIcon size={18} weight='bold'/>
            <div className='flex items-baseline font-bold -ml-0.5'>
            <span className="text-neutral-900 text-xl font-bold">
              {price.toLocaleString('en-IN')}
            </span>
            <span className=" text-sm font-medium">/person</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarouselCard;
