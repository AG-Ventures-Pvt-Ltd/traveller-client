import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@phosphor-icons/react';


interface BackButtonProps {
  label?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  iconSize?: number;
}

const BackButton: React.FC<BackButtonProps> = ({
  label = 'Back',
  to,
  onClick,
  className = '',
  iconSize = 24
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      router.push(to);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={`flex items-center gap-4 text-maintext rounded-lg cursor-pointer w-fit hover:opacity-70 transition-opacity ${className}`}
      onClick={handleClick}
    >
      <div className='bg-[#EEA0FF] text-black p-2 md:p-2 rounded-full'>
        <ArrowLeftIcon size={iconSize} weight='thin' />
      </div>
      <span className="font-bold">{label}</span>
    </div>
  );
};

export default BackButton;
