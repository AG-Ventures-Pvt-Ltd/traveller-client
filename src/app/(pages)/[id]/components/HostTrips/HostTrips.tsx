import { useState, useEffect, useMemo } from "react";
import { Trip } from "../../types";
import { useGetData } from "@/services/useGetData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { TripCard } from "./components/TripCard";
import { HostTripsSkeleton } from "./components/HostTripsSkeleton";
import Button from "@/common/ui/Buttons/Button";
import CustomSelect from "@/common/ui/CustomSelect";
import { useRouter } from "next/navigation";

interface HostTripsProps {
  hostUsername: string;
}

type FilterType = 'active' | 'inactive';

const ITEMS_PER_PAGE = 6;

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'active', label: 'Upcoming Trips' },
  { key: 'inactive', label: 'Past Trips' },
];

const LOCATION_OPTIONS = [
  { value: 'all', label: 'All Locations' },
  { value: 'paris', label: 'Paris' },
  { value: 'bali', label: 'Bali' },
  { value: 'tokyo', label: 'Tokyo' },
  { value: 'barcelona', label: 'Barcelona' },
  { value: 'dubai', label: 'Dubai' },
  { value: 'new-york', label: 'New York' },
  { value: 'london', label: 'London' },
  { value: 'sydney', label: 'Sydney' },
];

const buildTripsUrl = (hostUsername: string, filter: FilterType, page: number, location: string) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', ITEMS_PER_PAGE.toString());

  params.append('status', filter === 'active' ? 'active' : 'inactive');

  if (location && location !== 'all') {
    params.append('location', location);
  }

  const baseUrl = API_ENDPOINTS.TRIPS.HOST_TRIPS(hostUsername);
  return `${baseUrl}?${params.toString()}`;
};

export function HostTrips({ hostUsername }: HostTripsProps) {
  const [filter, setFilter] = useState<FilterType>('active');
  const [currentPage, setCurrentPage] = useState(1);
  const [location, setLocation] = useState('all');
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const tripsUrl = buildTripsUrl(hostUsername, filter, currentPage, location);
  const { data: tripsData, isLoading, error } = useGetData<{
    trips: Trip[];
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

  if (isLoading) {
    return <HostTripsSkeleton />;
  }

  if (error) {
    throw Error(error.message || 'Error Loading Trips');
  }

  if (trips.length === 0 && allTrips.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-neutral-600 text-lg">
          No {filter} trips found {location !== 'all' ? `in ${location}` : ''}
        </p>
      </div>
    )
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
            {FILTERS.map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleFilterChange(key)}
                className="!px-2 sm:!px-4 !py-1 !rounded-3xl !font-bold !text-xs sm:!text-sm whitespace-nowrap"
              >
                {label}
              </Button>
            ))}
          </div>
          <div className="w-full sm:w-56 md:w-64">
            <CustomSelect
              value={location}
              onChange={handleLocationChange}
              options={LOCATION_OPTIONS}
              placeholder="Filter by location"
              id="location-filter"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8">
        {allTrips.map((trip, index) => (
          <TripCard key={trip.id || index} trip={trip} onViewDetails={handleViewDetails} />
        ))}
      </div>
      {hasMoreTrips && (
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
    </div>
  );
}