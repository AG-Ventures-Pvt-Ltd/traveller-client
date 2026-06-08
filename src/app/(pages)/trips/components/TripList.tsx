import React from 'react';
import TripSearchCard from '../components/TripSearchCard';

interface Trip {
  title: string;
  image: string;
  address: string;
  days:string;
  rating: number;
  price: number;
  status: string;
  hostName:string;
  isBookmarked: boolean;
  slug: string;
}

interface TripListProps {
  trips: Trip[];
  onBookNow: (slug: string) => void;
  formatDate: (dateString: string) => string;
  calculateDays: (startDate: string, endDate: string) => number;
}

const TripList: React.FC<TripListProps> = ({
  trips,
  onBookNow,
}) => {

  return (
    <div className='space-y-4'>
      {trips.map((trip) => {
        return (
          <TripSearchCard
            key={trip.slug}
            tripSlug={trip.slug}
            imageUrl={trip.image}
            title={trip.title}
            location={trip.address}
            days={trip.days}
            rating={trip.rating}
            price={trip.price}
            hostName={trip.hostName}
            isBookmarked={trip.isBookmarked}
            onViewDetails={() => onBookNow(trip.slug)}
          />
        );
      })}
    </div>
  );
};

export default TripList;