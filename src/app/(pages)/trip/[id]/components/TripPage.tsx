'use client'

import TripDetailMobile from "./mobile/TripDetailMobile";
import { redirect } from 'next/navigation';
import { useDeviceContext } from "@/common/context/DeviceContext";


export default function TripDetail() {
  const { isMobile } = useDeviceContext();

  if (isMobile) {
    return <TripDetailMobile />;
  }

  redirect('/');
}
