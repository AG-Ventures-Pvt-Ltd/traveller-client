import { useState, useEffect, useMemo } from "react";
import { Trip } from "../../types";
import { useGetData } from "@/services/useGetData";
import { TripCard } from "./components/TripCard";
import { HostTripsSkeleton } from "./components/HostTripsSkeleton";
import Button from "@/common/components/atoms/Button";
// import CustomSelect from "@/common/ui/CustomSelect";
import { useRouter } from "next/navigation";
import { FilterType, FILTERS, LOCATION_OPTIONS } from "./constants";
import { buildTripsUrl } from "./utils";

interface HostTripsProps {
  hostUsername: string;
}

export function HostTrips({ hostUsername }: HostTripsProps) {
  const [filter, setFilter] = useState<FilterType>('upcoming');
  const [currentPage, setCurrentPage] = useState(1);
  const [location, setLocation] = useState('all');
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const tripsUrl = buildTripsUrl(hostUsername, filter, currentPage, location);
  const { data: tripsData, isLoading, error } = useGetData<{
    trips: Trip[];
    tripCounts?: {
      active: number;
      inactive: number;
    };
    pagination?: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  } | Trip[]>(tripsUrl);

  const router = useRouter();

  const trips = useMemo(() => {
    return Array.isArray(tripsData) ? tripsData : tripsData?.trips || [];
  }, [tripsData]);

  const tripCounts = useMemo(() => {
    return !Array.isArray(tripsData) ? tripsData?.tripCounts : undefined;
  }, [tripsData]);

  const pagination = useMemo(() => {
    return !Array.isArray(tripsData) ? tripsData?.pagination : undefined;
  }, [tripsData]);

  useEffect(() => {
    if (currentPage === 1) {
      setAllTrips(trips);
    }
  }, [filter, location, trips, currentPage]);

  useEffect(() => {
    if (currentPage > 1 && trips.length > 0) {
      setAllTrips(prev => [...prev, ...trips]);
      setIsLoadingMore(false);
    }
  }, [trips, currentPage]);

  const handleViewDetails = (tripId: string) => {
    router.push(`/trip/${tripId}`);
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setCurrentPage(1);
    setAllTrips([]);
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    setCurrentPage(1);
    setAllTrips([]);
  };

  const handleShowMore = () => {
    setIsLoadingMore(true);
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreTrips = pagination?.hasNext || false;

  // Show skeleton only on initial load, not on pagination
  if (isLoading && allTrips.length === 0) {
    return <HostTripsSkeleton />;
  }

  if (error) {
    throw Error(error.message || 'Error Loading Trips');
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-0.5 h-8 sm:h-9 bg-neutral-900 rounded-full flex-shrink-0" />
          <h2 className="text-neutral-900 text-2xl sm:text-3xl font-bold leading-tight sm:leading-10">Hosted Trips</h2>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:mt-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {FILTERS.map(({ key, label }) => {
              const count = key === 'upcoming' ? tripCounts?.active || 0 : tripCounts?.inactive || 0;
              return (
                <Button
                  key={key}
                  variant={filter === key ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => handleFilterChange(key)}
                  className="!px-2 sm:!px-4 !py-1 !rounded-3xl !font-bold !text-xs sm:!text-sm whitespace-nowrap"
                >
                  {label} <span className="ml-1 text-xs sm:text-sm">({count})</span>
                </Button>
              );
            })}
          </div>
          {/* <div className="w-full sm:w-56 md:w-64">
            <CustomSelect
              value={location}
              onChange={handleLocationChange}
              options={LOCATION_OPTIONS}
              placeholder="Filter by location"
              id="location-filter"
            />
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8">
        {allTrips.map((trip, index) => (
          <TripCard key={trip.id || index} trip={trip} onViewDetails={handleViewDetails} />
        ))}
      </div>
      {allTrips.length === 0 ? (
        <div className="flex items-center justify-center min-h-96">
          <p className="text-neutral-600 text-lg">
            No {filter} trips found {location !== 'all' ? `in ${location}` : ''}
          </p>
        </div>
      ) : (
        <>
          {isLoadingMore && (
            <div className="flex items-center justify-center gap-2 py-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neutral-900 animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 rounded-full bg-neutral-900 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-neutral-900 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          {hasMoreTrips && !isLoadingMore && (
            <div className="flex items-center justify-center gap-4 py-6">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleShowMore}
                disabled={isLoadingMore}
                className="!px-6 sm:!px-8"
              >
                {isLoadingMore ? 'Loading...' : 'Show More'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}