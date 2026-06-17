'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useLocation } from '@/common/hooks/useLocation';

// Both variants are SSR'd so the correct one is in the initial HTML per device
// (no desktop→mobile flash, and content is present for mobile-first crawlers).
const DesktopLanding = dynamic(() => import('./components/DesktopLanding/DesktopLanding'));
const MobileLanding = dynamic(() => import('./components/MobileLanding/MobileLanding'));

interface LandingClientProps {
  /** Device guess from the request User-Agent so SSR renders the right variant. */
  initialIsMobile: boolean;
}

const LandingClient = ({ initialIsMobile }: LandingClientProps) => {
  // Initialised from the server UA guess so the first client render matches the
  // server render (no hydration mismatch). A resize effect corrects edge cases.
  const [isMobile, setIsMobile] = useState(initialIsMobile);
  const { requestLocationPermission } = useLocation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        requestLocationPermission().catch(() => {});
      } else if (result.state === 'prompt') {
        const timer = setTimeout(() => {
          requestLocationPermission().catch(() => {});
        }, 15000);
        return () => clearTimeout(timer);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMobile ? <MobileLanding /> : <DesktopLanding />;
};

export default LandingClient;
