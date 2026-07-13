'use client'

import { useEffect } from 'react';
import { useRecordTripView } from '@/app/(pages)/trip/api';
import { trackEvent, getFunnelSource } from '@/common/utils/analytics';

export default function TripViewTracker({ slug }: { slug: string }) {
  const { recordView } = useRecordTripView(slug);

  useEffect(() => {
    if (slug) {
      recordView();
      const source = getFunnelSource();
      trackEvent('trip_detail_view', { trip_id: slug, funnel_source: source });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return null;
}
