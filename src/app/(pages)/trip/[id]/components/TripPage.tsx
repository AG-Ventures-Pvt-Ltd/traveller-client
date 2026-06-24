'use client'

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import TripDetailMobile from "./mobile/TripDetailMobile";
import TripDetailDesktop from "./desktop/TripDetailDesktop";
import { useDeviceContext } from "@/common/context/DeviceContext";
import { useRecordTripView } from '@/app/(pages)/trip/api';
import { trackEvent, getFunnelSource } from '@/common/utils/analytics';


export default function TripDetail() {
  const { isMobile } = useDeviceContext();
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : (params.id || '');
  const slug = idParam.split('-').pop() || idParam;

  const { recordView } = useRecordTripView(slug);

  useEffect(() => {
    if (slug) {
      recordView();
      const source = getFunnelSource();
      trackEvent('trip_detail_view', { trip_id: slug, funnel_source: source });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (isMobile) {
    return <TripDetailMobile />;
  }

  return <TripDetailDesktop />;
}
