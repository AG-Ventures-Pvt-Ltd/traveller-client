import React from 'react';
import DestinationCard from './DestinationCard';

const destinations = [
  {
    image: 'https://placehold.co/376x280',
    rating: 4.9,
    name: 'Petra',
    location: 'Jordan',
    description: 'Ancient city carved in rose-red cliffs',
    duration: '3-4 days',
    tours: '24 tours',
    price: 89
  },
  {
    image: 'https://placehold.co/376x280',
    rating: 4.8,
    name: 'Dubai',
    location: 'UAE',
    description: 'Modern luxury meets Arabian heritage',
    duration: '4-5 days',
    tours: '32 tours',
    price: 120
  },
  {
    image: 'https://placehold.co/376x280',
    rating: 4.9,
    name: 'Santorini',
    location: 'Greece',
    description: 'White-washed villages and azure seas',
    duration: '5-6 days',
    tours: '18 tours',
    price: 95
  },
  {
    image: 'https://placehold.co/376x280',
    rating: 4.7,
    name: 'Bali',
    location: 'Indonesia',
    description: 'Tropical paradise with ancient temples',
    duration: '6-7 days',
    tours: '28 tours',
    price: 75
  },
  {
    image: 'https://placehold.co/376x280',
    rating: 5.0,
    name: 'Iceland',
    location: 'Iceland',
    description: 'Northern lights and volcanic landscapes',
    duration: '7-8 days',
    tours: '15 tours',
    price: 150
  },
  {
    image: 'https://placehold.co/376x280',
    rating: 4.9,
    name: 'Maldives',
    location: 'Maldives',
    description: 'Crystal waters and overwater villas',
    duration: '5-6 days',
    tours: '12 tours',
    price: 180
  }
];

const FeaturedDestinations = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h2 className="text-neutral-900 text-5xl font-bold font-['Satoshi'] leading-[52.80px]">
          Featured Destinations
        </h2>
        <p className="text-neutral-700 text-lg font-medium font-['Satoshi']">
          Explore our handpicked collection of the world's most breathtaking travel experiences
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="w-full overflow-x-auto">
        <div className="flex gap-6 pb-4">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} {...destination} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedDestinations;
