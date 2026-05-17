'use client';

import React from 'react';
import { ConfettiIcon } from '@phosphor-icons/react';

interface StatisticsBannerProps {
  message?: string;
}

const StatisticsBanner: React.FC<StatisticsBannerProps> = ({
  message = 'Still Travellers logged into',
}) => {
  return (
    <div className="w-full bg-[#FFC107] rounded-xl px-6 py-2.5">
      <div className="flex items-center justify-center gap-2">
        <ConfettiIcon size={16} weight="thin" />
        <p className="text-neutral-900 text-center text-xs">
          {message}
        </p>
      </div>
    </div>
  );
};

export default StatisticsBanner;
