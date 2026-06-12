import { cache } from 'react';
import { getServerData } from '@/services/serverApi';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import type { TripData } from './types';

export const getTripBasicDetails = cache(async (id: string): Promise<Partial<TripData> | null> => {
    try {
        return await getServerData<Partial<TripData>>(API_ENDPOINTS.TRIPS.BASIC_DETAILS(id));
    } catch {
        return null;
    }
});

export const getTripDetailedDetails = cache(async (id: string): Promise<Partial<TripData> | null> => {
    try {
        return await getServerData<Partial<TripData>>(API_ENDPOINTS.TRIPS.DETAILED_DETAILS(id));
    } catch {
        return null;
    }
});
