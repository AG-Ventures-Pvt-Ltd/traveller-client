import { useState, useEffect } from "react";
import { DeviceType, DeviceInfo } from "../types";

const BREAKPOINTS = {
  mobile: 768,   
  tablet: 1024,  
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────


// ─── Helper ──────────────────────────────────────────────────────────────────
function getDeviceType(width: number): DeviceType {
  if (width < BREAKPOINTS.mobile) return "mobile";
  if (width < BREAKPOINTS.tablet) return "tablet";
  return "desktop";
}

function buildDeviceInfo(width: number, isHydrated: boolean): DeviceInfo {
  const deviceType = getDeviceType(width);
  return {
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isDesktop: deviceType === "desktop",
    deviceType,
    width,
    isHydrated,
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────
/**
 * useDevice
 *
 * Returns reactive device-type flags based on the current viewport width.
 * Safe for SSR: `isHydrated` is false until the first client-side paint,
 * so you can avoid hydration mismatches by gating renders on it.
 *
 * @example
 * const { isMobile, isTablet, isDesktop, deviceType } = useDevice();
 *
 * if (isMobile) return <MobileNav />;
 * if (isTablet) return <TabletNav />;
 * return <DesktopNav />;
 */
export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(
    // SSR-safe initial state — width 0, not yet hydrated
    buildDeviceInfo(0, false)
  );

  useEffect(() => {

    setDeviceInfo(buildDeviceInfo(window.innerWidth, true));

    let rafId: number;

    const handleResize = () => {
        cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setDeviceInfo(buildDeviceInfo(window.innerWidth, true));
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return deviceInfo;
}