'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MaskHappyIcon, MotorcycleIcon, ConfettiIcon, UsersFourIcon, LightningIcon, PersonSimpleHikeIcon } from '@phosphor-icons/react';
import Button from '@/common/components/atoms/Button';

const WelcomePage: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/welcome/spin');
  };

  return (
    <div className="min-h-screen bg-[#fff9f4] overflow-hidden flex flex-col md:hidden">
      {/* Header */}
      <div className="flex-1 pt-6 pb-4 text-center flex items-end justify-center">
        <h1 className="text-5xl font-black text-black tracking-tight">Wondrr</h1>
      </div>

      {/* Circular Elements Section */}
      <div className="flex-7 relative w-full max-w-sm mx-auto px-8 ">
        {/* Bike Trips Circle - Left */}
        <div className="absolute left-0 top-20">
          <div className="relative w-40 h-40 z-10">
            {/* Circle with text around it */}
            <svg
              className="w-full h-full absolute inset-0"
              viewBox="0 0 160 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="80" cy="80" r="60" fill="#E2F4A6" />
              <defs>
                <path id="circlePath" d="M 40,80 A 40,40 0 1,1 120,80" fill="none" />
              </defs>
              <defs>
                <path id="bottomPath" d="M 120,80 A 40,40 0 1,1 40,80" fill="none" />
              </defs>
              <text fill="#1a1a1a" fontSize="16" fontWeight="500" letterSpacing="-0.5">
                <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                  Fun is cool
                </textPath>
              </text>
              <text fill="#1a1a1a" fontSize="16" fontWeight="500" letterSpacing="-0.5">
                <textPath href="#bottomPath" startOffset="50%" textAnchor="middle">
                  Fun is cool
                </textPath>
              </text>
            </svg>

            {/* Motorcycle Icon - centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <MaskHappyIcon size={36} className="text-gray-900" weight='thin' />
            </div>
          </div>

          {/* Bike Trips Tag - positioned below circle */}
          <div className="absolute top-32 left-1/2 transform -translate-x-22">
            <div className="bg-white border-2 border-black rounded-full px-3 py-1 flex items-center gap-4 transform rotate-12 whitespace-nowrap">
              <MotorcycleIcon size={32} className="text-gray-900" weight='thin' />
              <span className="font-medium text-lg text-gray-900">Bike trips</span>
            </div>
          </div>
        </div>

        {/* Hiking Circle - Bottom Center */}
        <div className="absolute left-3/4 transform -translate-x-1/2 bottom-0">
          <div className="relative w-40 h-40 z-10">
            {/* Yellow circle */}
            <svg
              className="w-full h-full absolute inset-0"
              viewBox="0 0 160 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="80" cy="80" r="45" fill="#FFD976" />
              <defs>
                <path id="circlePath2" d="M 50,80 A 30,30 0 1,1 110,80" fill="none" />
                <path id="bottomPath2" d="M 110,80 A 30,30 0 1,1 50,80" fill="none" />
              </defs>
              <text fill="#1a1a1a" fontSize="12" fontWeight="500" letterSpacing="-0.5">
                <textPath href="#circlePath2" startOffset="60%" textAnchor="middle">
                  Thrill all over
                </textPath>
              </text>
              <text fill="#1a1a1a" fontSize="12" fontWeight="500" letterSpacing="-0.5">
                <textPath href="#bottomPath2" startOffset="60%" textAnchor="middle">
                  Thrill all over
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <LightningIcon size={24} className="text-gray-900" />
            </div>
          </div>
          <div className="absolute top-3 left-24 transform -rotate-8 -translate-x-22 translate-y-0">
            <div className="bg-white border-2 border-black rounded-full px-2 py-1 flex items-center gap-2 transform -rotate-6">
              <PersonSimpleHikeIcon size={24} className="text-gray-900" weight='thin' />
              <span className="font-medium text-md text-gray-900">Hiking</span>
            </div>
          </div>
        </div>

        {/* Group Trips Circle - Right Top */}
        <div className="absolute right-0 top-0 ">
          <div className="relative w-40 h-40 z-10">
            <svg
              className="w-full h-full absolute inset-0"
              viewBox="0 0 160 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="80" cy="80" r="60" fill="#A8FFF8" />
              <defs>
                <path id="circlePath3" d="M 40,80 A 40,40 0 1,1 120,80" fill="none" />
                <path id="bottomPath" d="M 120,80 A 40,40 0 1,1 40,80" fill="none" />
              </defs>
              <text fill="#1a1a1a" fontSize="16" fontWeight="500" letterSpacing="-0.5">
                <textPath href="#circlePath3" startOffset="70%" textAnchor="middle">
                  Happiness
                </textPath>
              </text>
              <text fill="#1a1a1a" fontSize="16" fontWeight="500" letterSpacing="-0.5">
                <textPath href="#bottomPath" startOffset="70%" textAnchor="middle">
                  Happiness
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <ConfettiIcon size={40} className="text-gray-900" weight='thin' />
            </div>
          </div>
          <div className="absolute -bottom-4 right-0 -rotate-10 transform translate-x-2">
            <div className="bg-white border-2 border-black rounded-full px-3 py-1 flex items-center gap-3 transform rotate-2 whitespace-nowrap">
              <UsersFourIcon size={32} className="text-gray-900" weight='thin' />
              <span className="font-medium text-md text-gray-900">Group Trips</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='flex-2 flex flex-col gap-20 '>
        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <h2 className="text-2xl font-[1000] text-black">Travel Hassle Free</h2>
          <p className="text-lg text-gray-900 font-medium leading-relaxed">
            Find your next adventure in minutes
          </p>
        </div>

        {/* CTA Button */}
        <div className="px-6 pb-8">
          <Button
            onClick={handleGetStarted}
            className="!w-full !py-4 !px-6 !rounded-2xl !text-base !font-semibold"
            style={{
              background: '#e588f7',
              color: '#000',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '16px 24px',
              borderRadius: '16px',
              width: '100%',
              border: 'none',
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center min-h-screen px-8 py-12 relative overflow-hidden">
        {/* Logo - Top Left */}
        <div className="absolute top-8 left-12 z-20">
          <h1 className="text-6xl font-black text-black cursor-pointer">Wondrr</h1>
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl w-full grid grid-cols-2 gap-16 items-center relative">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center gap-8 z-20">
            <h2 className="text-5xl lg:text-6xl font-black text-black leading-tight">
              Travel Hassle Free
            </h2>

            <p className="text-xl text-gray-800 font-medium leading-relaxed">
              Discover your next adventure with your ultimate travel buddy all across India.
            </p>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleGetStarted}
                className="!px-8 !py-4 !rounded-xl !text-lg !font-semibold !text-black"
                style={{
                  background: '#e588f7',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: 'none',
                }}
              >
                Get Started
              </Button>
              <Button
                onClick={() => router.push('/')}
                variant="outlined"
                className="!px-8 !py-4 !rounded-xl !text-lg !font-semibold"
                style={{
                  borderColor: '#121212',
                  color: '#121212',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  borderWidth: '2px',
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
