'use client'

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import TripDetailMobile from "./mobile/TripDetailMobile";
import TripDetailDesktop from "./desktop/TripDetailDesktop";
import { useDeviceContext } from "@/common/context/DeviceContext";
import { useRecordTripView, useTripBasicDetails } from '@/app/(pages)/trip/api';
import { trackEventOnce, toGaItem } from '@/common/utils/analytics';


export default function TripDetail() {
  const { isMobile } = useDeviceContext();
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : (params.id || '');
  const slug = idParam.split('-').pop() || idParam;

  const { recordView } = useRecordTripView(slug);

  // Same query key the detail components use — served from the cache the page
  // prefetched, so this adds no request and the title is there on first render.
  const { data: basicData } = useTripBasicDetails(slug);

  useEffect(() => {
    if (slug) recordView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // view_item fires at page level (not inside a tab or a scrolled-into-view
  // section) so a direct landing or a refresh counts exactly like a card click.
  useEffect(() => {
    if (!slug || !basicData?.title) return;
    trackEventOnce(`view_item:${slug}`, 'view_item', {
      currency: 'INR',
      value: basicData.pricing?.pricings?.[0]?.pricePerPerson,
      items: [toGaItem({
        slug,
        title: basicData.title,
        hostUsername: basicData.host?.username,
        category: basicData.category,
        city: basicData.location,
        price: basicData.pricing?.pricings?.[0]?.pricePerPerson,
      })],
    });
  }, [slug, basicData?.title]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isMobile) {
    return <TripDetailMobile />;
  }

  return <TripDetailDesktop />;
}
