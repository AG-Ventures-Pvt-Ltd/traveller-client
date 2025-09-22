'use client' 

import React from 'react'

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: "reset" | "button" | "submit" | undefined
};

const Button: React.FC<ButtonProps> = ({ className = '', children, onClick = () => {}, style = {}, disabled = false, type = undefined }) => {

  return (
    <button
      className={`transition transform hover:scale-105 active:scale-95 duration-200 px-4 py-2 cursor-pointer whitespace-nowrap ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button