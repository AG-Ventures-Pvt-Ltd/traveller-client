import React from 'react';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="w-full bg-gradient-to-b from-neutral-50 to-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden">
      <div className="flex flex-col lg:flex-row p-6 sm:p-8 lg:p-12 gap-6 sm:gap-8">
        <div className="flex-1 flex flex-col gap-6 sm:gap-8">
          <div className="w-fit px-3 sm:px-4 py-2 bg-neutral-900 rounded-full flex items-center gap-2">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
            <span className="text-white text-xs sm:text-sm font-bold font-['Satoshi']">
              Start Your Adventure
            </span>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6">
            <h1 className="text-neutral-900 text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              What adventure awaits you?
            </h1>
            <p className="text-neutral-700 text-lg sm:text-xl lg:text-2xl font-medium font-['Satoshi'] w-full lg:w-[80%]">
              Discover unique experiences and create unforgettable memories across the world's most stunning destinations
            </p>
          </div>
          <div className="flex items-start gap-8 sm:gap-10 lg:gap-14">
            <div className="flex flex-col gap-1.5">
              <span className="text-neutral-900 text-2xl sm:text-3xl lg:text-4xl font-bold font-['Satoshi'] leading-tight">
                10+
              </span>
              <span className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi']">
                Destinations
              </span>
            </div>
            {/* <div className="flex flex-col gap-1.5">
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
              </div> */}
          </div>
        </div>
        <div className="flex-1 flex w-full gap-3 sm:gap-4">
          <div className='flex-1 flex flex-col gap-3 sm:gap-4'>
            <div className="h-32 sm:h-40 lg:h-68">
              <Image
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-lg"
                src="/png/L22.png"
                alt="Destination 1"
                width={0}
                height={0}
                quality={90}
              />
            </div>
            <div className="h-24 sm:h-32 lg:h-50">
              <Image
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-lg"
                src="/png/L21.png"
                alt="Destination 2"
                width={0}
                height={0}
                quality={90}
              />
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-3 sm:gap-4 w-full' >
            <div className="h-24 sm:h-32 lg:h-46">
              <Image
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-lg"
                src="/png/L12.png"
                alt="Destination 3"
                width={0}
                height={0}
                quality={90}
              />
            </div>
            <div className="h-24 sm:h-32 lg:h-46">
              <Image
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-lg"
                src="/png/L11.png"
                alt="Destination 4"
                width={0}
                height={0}
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
