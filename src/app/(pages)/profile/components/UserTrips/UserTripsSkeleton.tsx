'use client';

import React from 'react';
import TripCardSkeleton from './components/TripCardSkeleton';

const UserTripsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <TripCardSkeleton />
      <TripCardSkeleton />
      <TripCardSkeleton />
    </div>
  );
};

export default UserTripsSkeleton;
