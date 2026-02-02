import { useState, useEffect } from "react";
import { Trip } from "../../types";
import { useGetData } from "@/services/useGetData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { TripCard } from "./components/TripCard";
import Button from "@/common/ui/Buttons/Button";
import { useRouter } from "next/navigation";

interface HostTripsProps {
  hostUsername: string;
  onDataLoaded?: (count: number) => void;
}

type FilterType = 'all' | 'active' | 'inactive';

export function HostTrips({ hostUsername, onDataLoaded }: HostTripsProps) {

  const [filter, setFilter] = useState<FilterType>('all');
  const { data: trips, isLoading, error } = useGetData<Trip[]>(API_ENDPOINTS.TRIPS.HOST_TRIPS(hostUsername));


  const router = useRouter()

  const handleViewDetails = (tripId: string) => {
    router.push(`/trip/${tripId}`);
  };

  useEffect(() => {
    if (trips && onDataLoaded) {
      onDataLoaded(trips.length);
    }
  }, [trips, onDataLoaded]);

  const filteredTrips = trips?.filter(trip => {
    if (filter === 'all') return true;
    if (filter === 'active') return trip.isActive;
    return !trip.isActive;
  }) || [];

  if (isLoading) {
    return <div className="flex items-center justify-center py-8">Loading trips...</div>;
  }

  if (error) {
    throw Error(error.message || 'Error Loading Trips')
  }

  if (!trips || trips.length === 0) {
    return <div className="flex items-center justify-center py-8">No trips found</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 overflow-x-auto sm:overflow-x-visible scrollbar-hide">
        <Button
          variant={filter === 'all' ? "contained" : "outlined"}
          color="primary"
          onClick={() => setFilter('all')}
          className="!px-4 !py-2 !rounded-lg !font-medium !text-sm sm:!text-base whitespace-nowrap"
        >
          All Trips ({trips.length})
        </Button>
        <Button
          variant={filter === 'active' ? "contained" : "outlined"}
          color="primary"
          onClick={() => setFilter('active')}
          className="!px-4 !py-2 !rounded-lg !font-medium !text-sm sm:!text-base whitespace-nowrap"
        >
          Active Trips ({trips.filter(t => t.isActive).length})
        </Button>
        <Button
          variant={filter === 'inactive' ? "contained" : "outlined"}
          color="primary"
          onClick={() => setFilter('inactive')}
          className="!px-4 !py-2 !rounded-lg !font-medium !text-sm sm:!text-base whitespace-nowrap"
        >
          Inactive Trips ({trips.filter(t => !t.isActive).length})
        </Button>
      </div>
      {filteredTrips.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          No {filter === 'all' ? '' : filter} trips found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip, index) => (
            <TripCard key={trip.id || index} trip={trip} onViewDetails={handleViewDetails} />
          ))}
        </div>
      )}
    </div>
  );
}