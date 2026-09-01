'use client'

import React from 'react'

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: "reset" | "button" | "submit" | undefined;
  variant?: 'primary' | 'yellow' | 'purple';
  fullWidth?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  onClick = () => {},
  style = {},
  disabled = false,
  type = undefined,
  variant = 'primary',
  fullWidth = false,
}) => {
  const baseClass = `py-4 rounded-xl text-base font-normal text-center cursor-pointer active:opacity-80 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed disabled:active:opacity-60 ${fullWidth ? 'w-full' : ''} ${className}`;

  const variantClass = variant === 'yellow'
    ? 'bg-yellow-400 text-black'
    : variant === 'purple'
    ? 'bg-[#EEA0FF] text-black'
    : 'bg-blue-500 text-white';

  return (
    <button
      className={`${baseClass} ${variantClass}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
