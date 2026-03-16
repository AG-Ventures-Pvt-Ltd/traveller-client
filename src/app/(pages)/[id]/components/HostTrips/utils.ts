import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { FilterType, ITEMS_PER_PAGE } from "./constants";

export const buildTripsUrl = (hostUsername: string, filter: FilterType, page: number, location: string) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', ITEMS_PER_PAGE.toString());

  params.append('status', filter === 'upcoming' ? 'upcoming' : 'past');

  if (location && location !== 'all') {
    params.append('location', location);
  }

  const baseUrl = API_ENDPOINTS.TRIPS.HOST_TRIPS(hostUsername);
  return `${baseUrl}?${params.toString()}`;
};
