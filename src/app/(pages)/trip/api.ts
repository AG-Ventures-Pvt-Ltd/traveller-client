import { useGetData } from '../../../services/useGetData';
import usePostData from '../../../services/usePostData';
import { API_ENDPOINTS } from '../../../common/constants/apiEndpoints';
import { TripData } from './[id]/types';

export const useTripBasicDetails = (id: string) => {
  return useGetData<Partial<TripData>>(API_ENDPOINTS.TRIPS.BASIC_DETAILS(id));
};

export const useTripDetailedDetails = (id: string, enabled: boolean = true) => {
  return useGetData<Partial<TripData>>(API_ENDPOINTS.TRIPS.DETAILED_DETAILS(id), { enabled } as any);
};

const detectViewSource = (): string => {
  if (typeof window === 'undefined') return 'direct';
  const utmSource = new URLSearchParams(window.location.search).get('utm_source');
  if (utmSource) return utmSource;
  const ref = document.referrer;
  if (!ref) return 'direct';
  if (ref.includes('instagram.com')) return 'instagram';
  if (ref.includes('youtube.com')) return 'youtube';
  if (ref.includes('whatsapp.com') || ref.includes('wa.me')) return 'whatsapp';
  if (ref.includes('twitter.com') || ref.includes('x.com')) return 'x';
  if (ref.includes('google.com')) return 'google';
  return 'others';
};

export const useRecordTripView = (slug: string) => {
  const mutation = usePostData({
    url: API_ENDPOINTS.TRIPS.RECORD_VIEW(slug),
    enableNotifications: false,
  });

  return {
    recordView: () => mutation.mutate({ source: detectViewSource() }),
  };
};