import React from 'react';
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="w-full bg-gradient-to-b from-neutral-50 to-gray-200 rounded-[32px] overflow-hidden">
      <div className="relative min-h-[628px] p-16">
        {/* Background Image */}
        <img 
          className="absolute inset-0 w-full h-full object-cover opacity-5" 
          src="https://placehold.co/1368x628" 
          alt="Background"
        />
        
        <div className="relative flex justify-between items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Badge */}
            <div className="w-fit px-4 py-2 bg-neutral-900 rounded-full flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
              <span className="text-white text-sm font-bold font-['Satoshi']">
                Start Your Adventure
              </span>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-6">
              <h1 className="text-neutral-900 text-7xl font-bold font-['Satoshi'] leading-[88px]">
                What adventure awaits you?
              </h1>
              <p className="text-neutral-700 text-xl font-medium font-['Satoshi'] leading-7 max-w-[516px]">
                Discover unique experiences and create unforgettable memories across the world's most stunning destinations
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-start gap-14">
              <div className="flex flex-col gap-1.5">
                <span className="text-neutral-900 text-4xl font-bold font-['Satoshi'] leading-[48px]">
                  500+
                </span>
                <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
                  Destinations
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-neutral-900 text-4xl font-bold font-['Satoshi'] leading-[48px]">
                  2K+
                </span>
                <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
                  Happy Travelers
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-neutral-900 text-4xl font-bold font-['Satoshi'] leading-[48px]">
                  4.9★
                </span>
                <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
                  Rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Images Grid */}
          <div className="flex-1 relative min-h-[500px]">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1 row-span-2">
                <img 
                  className="w-full h-full object-cover rounded-[20px] shadow-lg" 
                  src="https://placehold.co/353x295" 
                  alt="Destination 1"
                />
              </div>
              <div className="col-span-1">
                <img 
                  className="w-full h-full object-cover rounded-[20px] shadow-lg" 
                  src="https://placehold.co/231x193" 
                  alt="Destination 2"
                />
              </div>
              <div className="col-span-1">
                <img 
                  className="w-full h-full object-cover rounded-[20px] shadow-lg" 
                  src="https://placehold.co/231x193" 
                  alt="Destination 3"
                />
              </div>
              <div className="col-span-2">
                <img 
                  className="w-full h-full object-cover rounded-[20px] shadow-lg" 
                  src="https://placehold.co/353x193" 
                  alt="Destination 4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
