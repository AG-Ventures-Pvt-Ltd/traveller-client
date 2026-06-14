'use client'

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import TripDetailMobile from "./mobile/TripDetailMobile";
import TripDetailDesktop from "./desktop/TripDetailDesktop";
import { useDeviceContext } from "@/common/context/DeviceContext";
import { useRecordTripView } from '@/app/(pages)/trip/api';


export default function TripDetail() {
  const { isMobile } = useDeviceContext();
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : (params.id || '');
  const slug = idParam.split('-').pop() || idParam;

  const { recordView } = useRecordTripView(slug);

  useEffect(() => {
    if (slug) recordView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (isMobile) {
    return <TripDetailMobile />;
  }

  return <TripDetailDesktop />;
}
