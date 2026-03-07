import React from 'react';
import TripSearchCard from '../components/TripSearchCard';

interface Trip {
  title: string;
  image: string;
  address: string;
  duration: string;
  startDate: string;
  endDate: string;
  rating: number;
  totalReviews: number;
  basePrice: number;
  price: number;
  totalSeats: number;
  totalBookings: number;
  availableSeats: number;
  status: string;
  category: string;
  difficulty: string;
  isFeatured: boolean;
  hostName:string;
  isBookmarked: boolean;
  slug: string;
  tags?: string[];
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
  formatDate,
  calculateDays,
}) => {
  return (
    <div className='space-y-4'>
      {trips.map((trip) => {
        const days = trip.startDate && trip.endDate
          ? calculateDays(trip.startDate, trip.endDate)
          : parseInt(trip.duration) || 0;
        const nextDeparture = trip.startDate ? formatDate(trip.startDate) : undefined;

        return (
          <TripSearchCard
            key={trip.slug}
            tripSlug={trip.slug}
            imageUrl={trip.image}
            title={trip.title}
            location={trip.address}
            days={days}
            rating={trip.rating}
            reviewCount={trip.totalReviews}
            originalPrice={trip.price}
            price={trip.basePrice}
            category={trip.category}
            nextDeparture={nextDeparture}
            difficulty={trip.difficulty}
            totalSeats={trip.totalSeats}
            tags={trip.tags}
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