import { cache } from 'react';
import { getServerData } from '@/services/serverApi';

export interface HostMeta {
    fullName: string;
    bio?: string;
    website?: string;
    totalTrips: number;
    avatar?: string;
}

// Deduped per-request: generateMetadata + Layout + Page share one fetch.
export const getHostMeta = cache(async (id: string): Promise<HostMeta | null> => {
    try {
        return await getServerData<HostMeta>(`/api/client/v1/user/host/meta/${id}`);
    } catch {
        return null;
    }
});
