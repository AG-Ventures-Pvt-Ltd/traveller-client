

import React from 'react';

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className = '' }) => {
  return <div className={`h-0.5 bg-gray-300 ${className}`} />;
};

export default Divider;