import { useGetData } from '../../../services/useGetData';
import { API_ENDPOINTS } from '../../../common/constants/apiEndpoints';
import { TripData } from './[id]/types';

export const useTripBasicDetails = (id: string) => {
  return useGetData<Partial<TripData>>(API_ENDPOINTS.TRIPS.BASIC_DETAILS(id));
};

export const useTripDetailedDetails = (id: string, enabled: boolean = true) => {
  return useGetData<Partial<TripData>>(API_ENDPOINTS.TRIPS.DETAILED_DETAILS(id), { enabled } as any);
};