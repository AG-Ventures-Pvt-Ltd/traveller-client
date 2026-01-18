'use client';

import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { TripCard } from './components/TripCard';
import { Trip } from '../../types';
import { formatDate } from '@/common/utils/dateUtils';
import UserTripsSkeleton from './UserTripsSkeleton';


interface TripApiResponse {
  image?: string;
  status?: string;
  tripName?: string;
  title?: string;
  name?: string;
  address?: string;
  date?: string;
  duration?: string;
  hostName?: string;
  amountPaid?: number | string;
  paymentStatus?: string;
  bookingStatus?: string;
  hasReview?: boolean;
  isCompleted?: boolean;
  review?: {
    rating?: number;
    text?: string;
    comment?: string;
  };
}

interface UserTripsProps {
  activeFilter: number;
  onAddReview: (tripTitle: string) => void;
}

export function UserTrips({ activeFilter, onAddReview }: UserTripsProps) {
  const handleEditReview = () => {
    // TODO: Implement edit review functionality
  };

  const handleDeleteReview = () => {
    // TODO: Implement delete review functionality
  };

  const handleDownloadReceipt = () => {
    // TODO: Implement receipt download functionality
  };
  const { data: tripsData, isLoading, error } = useGetData<TripApiResponse[]>(API_ENDPOINTS.USER.MY_TRIPS);

  if (isLoading) {
    return (
      <div className="w-full">
        <UserTripsSkeleton/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-['Satoshi'] text-red-500">
          Error loading trips. Please try again later.
        </div>
      </div>
    );
  }

  if (!tripsData || tripsData.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-['Satoshi'] text-gray-500">No trips found.</div>
      </div>
    );
  }

  const trips: Trip[] = tripsData.map((trip: TripApiResponse) => {
    const normalizeStatus = (apiStatus: string): 'completed' | 'upcoming' | 'cancelled' => {
      const status = apiStatus?.toLowerCase();
      if (status === 'completed' || status === 'finished' || status === 'done') return 'completed';
      if (status === 'cancelled' || status === 'canceled') return 'cancelled';
      if (status === 'active') return 'upcoming'; 
      return 'upcoming'; 
    };

    return {
      image: trip.image || 'https://placehold.co/280x352',
      status: normalizeStatus(trip.status || ''),
      title: trip.tripName || trip.title || trip.name || 'Untitled Trip',
      location: trip.address || 'Location not specified',
      date: trip.date ? formatDate(trip.date) : 'Date TBD',
      duration: trip.duration || 'Duration not specified',
      host: trip.hostName || 'Host not specified',
      price: trip.amountPaid ? `${trip.amountPaid}` : '0',
      paymentStatus: trip.paymentStatus,
      bookingStatus: trip.bookingStatus,
      hasReview: trip.hasReview || false,
      isCompleted: trip.isCompleted || false,
      review: trip.review ? {
        rating: trip.review.rating || 0,
        text: trip.review.text || trip.review.comment || ''
      } : undefined
    };
  });

  const filteredTrips = trips.filter((trip) => {
    if (activeFilter === 0) return true; 
    if (activeFilter === 1) return trip.status === 'upcoming'; 
    if (activeFilter === 2) return trip.status === 'completed'; 
    return true;
  });

  if (filteredTrips.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-['Satoshi'] text-gray-500">
          No {activeFilter === 1 ? 'upcoming' : activeFilter === 2 ? 'completed' : ''} trips found.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredTrips.map((trip, index) => (
        <TripCard
          key={index}
          {...trip}
          onEditReview={handleEditReview}
          onDeleteReview={handleDeleteReview}
          onDownloadReceipt={handleDownloadReceipt}
          onAddReview={() => onAddReview(trip.title)}
        />
      ))}
    </div>
  );
}
