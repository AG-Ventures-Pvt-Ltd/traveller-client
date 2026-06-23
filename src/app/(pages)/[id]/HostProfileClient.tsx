'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Footer from '../(landing)/components/Footer/Footer';

const HostProfileMobile = dynamic(() => import('./components/mobile/HostProfileMobile'));
const HostProfileDesktop = dynamic(() => import('./components/desktop/HostProfileDesktop'));

interface HostProfileClientProps {
  initialIsMobile: boolean;
}

export default function HostProfileClient({ initialIsMobile }: HostProfileClientProps) {
  const [isMobile, setIsMobile] = useState(initialIsMobile);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      {isMobile ? <HostProfileMobile /> : <HostProfileDesktop />}
      <Footer />
    </>
  );
}
