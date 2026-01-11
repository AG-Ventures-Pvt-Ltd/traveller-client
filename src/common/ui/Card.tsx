


import React from 'react';
import { cn } from './utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'contained' | 'outline' | 'fill' | 'shadow';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  className,
  children,
  variant = 'contained',
  onClick
}) => {
  const baseClasses = "rounded-3xl";

  const variantClasses = {
    contained : "bg-[#FAFAFA]",
    outline: "border-2 border-[#EDEDED]",
    fill : "bg-[#FAFAFA] border-2 border-[#EDEDED]",
    shadow: "shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]"
  };

  return (
    <div 
      className={cn(baseClasses, variantClasses[variant], className, onClick && "cursor-pointer")}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;