'use client';

import React from 'react';
import { ConfettiIcon } from '@phosphor-icons/react';

interface StatisticsBannerProps {
  text?: string;
  duration?: string;
}

const StatisticsBanner: React.FC<StatisticsBannerProps> = ({
  text = 'Still Travellers logged into',
  duration = 'last month'
}) => {
  return (
    <div className="w-full bg-yellow-400 rounded-2xl px-6 sm:px-8 py-2 sm:py-6">
      <div className="flex items-center justify-center gap-2">
        <ConfettiIcon size={24} className="w-6 h-6 text-neutral-900" weight="fill" />
        <p className="text-neutral-900 text-base sm:text-lg font-bold font-['Satoshi'] text-center">
          {text} <span className="font-black">{duration}</span>
        </p>
      </div>
    </div>
  );
};

export default StatisticsBanner;
