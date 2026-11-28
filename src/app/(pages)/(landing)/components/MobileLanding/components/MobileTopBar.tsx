'use client';

import { useSession } from 'next-auth/react';
import { useGetData } from '@/services/useGetData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import LocationSelector, { CitiesResponse } from './LocationSelector';

/** Mobile top bar (logo, departure city, wallet/profile) — landing and contact pages. */
export default function MobileTopBar() {
    const { data: session } = useSession();
    // Same key as the landing SSR prefetch, so it hydrates there and is cached elsewhere.
    const { data: cities, isLoading } = useGetData<CitiesResponse>(API_ENDPOINTS.LANDING_PAGE.CITIES);
    return <LocationSelector avatar={session?.user?.avatar} cities={cities || { cities: [] }} cityLoading={isLoading} />;
}
