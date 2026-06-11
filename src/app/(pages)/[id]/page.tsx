"use client";

import { redirect, useParams } from "next/navigation";
import { useDevice } from "@/common/hooks/useDevice";
import HostProfileMobile from "./components/mobile/HostProfileMobile";
import HostProfileDesktop from "./components/desktop/HostProfileDesktop";

export default function HostPage() {
  const params = useParams();
  const { isMobile, isHydrated } = useDevice();

  const id = params.id as string;
  const lower = id.toLowerCase();

  // Ids are lowercase by default now, but capitalized variants got indexed.
  // Canonicalize any uppercase id to its lowercase URL so old links resolve.
  if (id !== lower) {
    redirect(`/${lower}`);
  }

  // Gate on hydration so we never flash the wrong (mobile/desktop) layout.
  if (!isHydrated) return null;

  return isMobile ? <HostProfileMobile /> : <HostProfileDesktop />;
}
