import React from 'react';

interface SkeletonCardProps {
  compact?: boolean;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ compact }) => (
  <div
    className={`animate-pulse rounded-3xl bg-black/5 ${
      compact ? 'h-52 w-44 flex-shrink-0' : 'h-64 w-full'
    }`}
  />
);

export default SkeletonCard;
