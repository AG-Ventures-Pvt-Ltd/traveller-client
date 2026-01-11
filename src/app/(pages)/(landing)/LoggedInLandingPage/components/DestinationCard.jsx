import React from 'react';
import { MapPin, Clock, Star } from 'lucide-react';

const DestinationCard = ({ 
  image, 
  rating, 
  name, 
  location, 
  description, 
  duration, 
  tours, 
  price 
}) => {
  return (
    <div className="min-w-[376px] bg-white rounded-3xl border-2 border-gray-200 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="relative h-[280px] overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          src={image} 
          alt={name}
        />
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 px-3 py-2 bg-white/95 rounded-full flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" strokeWidth={1} />
          <span className="text-neutral-900 text-sm font-bold font-['Satoshi']">
            {rating}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col gap-4">
        {/* Title & Location */}
        <div className="flex flex-col gap-1">
          <h3 className="text-neutral-900 text-2xl font-bold font-['Satoshi']">
            {name}
          </h3>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-neutral-700" strokeWidth={1.5} />
            <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
              {location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-neutral-900 text-base font-medium font-['Satoshi']">
          {description}
        </p>

        {/* Duration & Tours */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-neutral-700" strokeWidth={1.5} />
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
              {duration}
            </span>
          </div>
          <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
            {tours}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200" />

        {/* Price & CTA */}
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-1">
            <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
              From
            </span>
            <span className="text-neutral-900 text-3xl font-bold font-['Satoshi']">
              ${price}
            </span>
            <span className="text-neutral-700 text-sm font-medium font-['Satoshi'] pb-1">
              /day
            </span>
          </div>
          <button className="px-6 py-3 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors">
            <span className="text-white text-sm font-bold font-['Satoshi']">
              Explore
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
