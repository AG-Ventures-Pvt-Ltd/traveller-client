import { useGetData } from '../../../services/useGetData';
import { API_ENDPOINTS } from '../../../common/constants/apiEndpoints';

export const useTripBasicDetails = (id: string) => {
  return useGetData(API_ENDPOINTS.TRIPS.BASIC_DETAILS(id));
};

export const useTripDetailedDetails = (id: string, enabled: boolean = true) => {
  return useGetData(API_ENDPOINTS.TRIPS.DETAILED_DETAILS(id), { enabled } as any);
};