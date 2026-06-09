'use client'

import TripDetailMobile from "./mobile/TripDetailMobile";
import TripDetailDesktop from "./desktop/TripDetailDesktop";
import { useDeviceContext } from "@/common/context/DeviceContext";


export default function TripDetail() {
  const { isMobile } = useDeviceContext();

  if (isMobile) {
    return <TripDetailMobile />;
  }

  return <TripDetailDesktop />;
}
