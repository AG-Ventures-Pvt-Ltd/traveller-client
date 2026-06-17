import React from 'react';

interface SkeletonCardProps {
  compact?: boolean;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ compact }) => (
  <div
    className={`animate-pulse rounded-3xl bg-gray-200 ${
      compact ? 'h-44 w-60 flex-shrink-0' : 'h-64 w-full'
    }`}
  />
);

export default SkeletonCard;
