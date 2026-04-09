'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Users, Bike, Footprints } from 'lucide-react';
import Button from '@/common/components/atoms/Button';

const WelcomePage: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/welcome/spin');
  };

  return (
    <div className="min-h-screen bg-[#fff9f4] overflow-hidden flex flex-col md:hidden">
      {/* Header */}
      <div className="pt-6 pb-4 text-center">
        <h1 className="text-5xl font-black text-black tracking-tight">Wondrr</h1>
      </div>

      {/* Circular Elements Section */}
      <div className="flex-1 relative w-full max-w-sm mx-auto px-4 py-8">
        {/* Bike Trips Circle - Left */}
        <div className="absolute left-0 top-20">
          <div className="relative w-40 h-40">
            {/* Circle with text around it */}
            <svg
              className="w-full h-full absolute inset-0"
              viewBox="0 0 160 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Lime circle */}
              <circle cx="80" cy="80" r="75" fill="#d4fc79" stroke="#000" strokeWidth="1" opacity="0.9" />

              {/* Text path for circular text */}
              <defs>
                <path id="circlePath" d="M 30, 80 A 50, 50 0 1,1 130, 80" fill="none" />
              </defs>
              <text fill="#1a1a1a" fontSize="14" fontWeight="600" letterSpacing="-0.5">
                <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                  Trips Cool l Food utter
                </textPath>
              </text>
            </svg>

            {/* Motorcycle Icon - centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Bike size={40} className="text-gray-900" />
            </div>
          </div>

          {/* Bike Trips Tag - positioned below circle */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <div className="bg-white border-2 border-black rounded-full px-4 py-2 flex items-center gap-2 transform -rotate-12">
              <Bike size={18} className="text-gray-900" />
              <span className="font-semibold text-sm text-gray-900">Bike trips</span>
            </div>
          </div>
        </div>

        {/* Hiking Circle - Bottom Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20">
          <div className="relative w-40 h-40">
            {/* Yellow circle */}
            <svg
              className="w-full h-full absolute inset-0"
              viewBox="0 0 160 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="80" cy="80" r="75" fill="#fbbf24" stroke="#000" strokeWidth="1" opacity="0.9" />

              <defs>
                <path id="circlePath2" d="M 30, 80 A 50, 50 0 1,1 130, 80" fill="none" />
              </defs>
              <text fill="#1a1a1a" fontSize="14" fontWeight="600" letterSpacing="-0.5">
                <textPath href="#circlePath2" startOffset="50%" textAnchor="middle">
                  Thrill e are small
                </textPath>
              </text>
            </svg>

            {/* Footprints Icon - centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Footprints size={40} className="text-gray-900" />
            </div>
          </div>

          {/* Hiking Tag */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 translate-y-0">
            <div className="bg-white border-2 border-black rounded-full px-4 py-2 flex items-center gap-2 transform -rotate-6">
              <Footprints size={18} className="text-gray-900" />
              <span className="font-semibold text-sm text-gray-900">Hiking</span>
            </div>
          </div>
        </div>

        {/* Group Trips Circle - Right Top */}
        <div className="absolute right-0 top-0">
          <div className="relative w-40 h-40">
            {/* Cyan circle */}
            <svg
              className="w-full h-full absolute inset-0"
              viewBox="0 0 160 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="80" cy="80" r="75" fill="#67e8f9" stroke="#000" strokeWidth="1" opacity="0.9" />

              <defs>
                <path id="circlePath3" d="M 30, 80 A 50, 50 0 1,1 130, 80" fill="none" />
              </defs>
              <text fill="#1a1a1a" fontSize="14" fontWeight="600" letterSpacing="-0.5">
                <textPath href="#circlePath3" startOffset="50%" textAnchor="middle">
                  Hobbies seabord all
                </textPath>
              </text>
            </svg>

            {/* Users Icon - centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Users size={40} className="text-gray-900" />
            </div>
          </div>

          {/* Group Trips Tag */}
          <div className="absolute -bottom-4 right-0 transform translate-x-2">
            <div className="bg-white border-2 border-black rounded-full px-4 py-2 flex items-center gap-2 transform rotate-2">
              <Users size={18} className="text-gray-900" />
              <span className="font-semibold text-sm text-gray-900">Group Trips</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center gap-4 px-6 py-6 text-center">
        <h2 className="text-2xl font-[1000] text-black">Travel Hassle Free</h2>
        <p className="text-base text-gray-900 font-medium leading-relaxed">
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

          {/* Right Side - Floating Badges */}
          <div className="relative h-96 flex items-center justify-center">
            {/* Bike Trips Circle */}
            <div className="absolute left-0 top-16">
              <div className="relative w-48 h-48">
                <svg
                  className="w-full h-full absolute inset-0"
                  viewBox="0 0 160 160"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="80" cy="80" r="75" fill="#d4fc79" stroke="#000" strokeWidth="1" opacity="0.9" />
                  <defs>
                    <path id="cpDesk1" d="M 30, 80 A 50, 50 0 1,1 130, 80" fill="none" />
                  </defs>
                  <text fill="#1a1a1a" fontSize="12" fontWeight="600">
                    <textPath href="#cpDesk1" startOffset="50%" textAnchor="middle">
                      Trips Cool l Food utter
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bike size={48} className="text-gray-900" />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                <div className="bg-white border-2 border-black rounded-full px-5 py-3 flex items-center gap-2 transform -rotate-12">
                  <Bike size={20} className="text-gray-900" />
                  <span className="font-semibold text-gray-900">Bike trips</span>
                </div>
              </div>
            </div>

            {/* Hiking Circle */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8">
              <div className="relative w-48 h-48">
                <svg
                  className="w-full h-full absolute inset-0"
                  viewBox="0 0 160 160"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="80" cy="80" r="75" fill="#fbbf24" stroke="#000" strokeWidth="1" opacity="0.9" />
                  <defs>
                    <path id="cpDesk2" d="M 30, 80 A 50, 50 0 1,1 130, 80" fill="none" />
                  </defs>
                  <text fill="#1a1a1a" fontSize="12" fontWeight="600">
                    <textPath href="#cpDesk2" startOffset="50%" textAnchor="middle">
                      Thrill e are small
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Footprints size={48} className="text-gray-900" />
                </div>
              </div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-white border-2 border-black rounded-full px-5 py-3 flex items-center gap-2 transform -rotate-6">
                  <Footprints size={20} className="text-gray-900" />
                  <span className="font-semibold text-gray-900">Hiking</span>
                </div>
              </div>
            </div>

            {/* Group Trips Circle */}
            <div className="absolute right-0 top-0">
              <div className="relative w-48 h-48">
                <svg
                  className="w-full h-full absolute inset-0"
                  viewBox="0 0 160 160"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="80" cy="80" r="75" fill="#67e8f9" stroke="#000" strokeWidth="1" opacity="0.9" />
                  <defs>
                    <path id="cpDesk3" d="M 30, 80 A 50, 50 0 1,1 130, 80" fill="none" />
                  </defs>
                  <text fill="#1a1a1a" fontSize="12" fontWeight="600">
                    <textPath href="#cpDesk3" startOffset="50%" textAnchor="middle">
                      Hobbies seabord all
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users size={48} className="text-gray-900" />
                </div>
              </div>
              <div className="absolute -bottom-4 right-0 transform translate-x-2">
                <div className="bg-white border-2 border-black rounded-full px-5 py-3 flex items-center gap-2 transform rotate-2">
                  <Users size={20} className="text-gray-900" />
                  <span className="font-semibold text-gray-900">Group Trips</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
