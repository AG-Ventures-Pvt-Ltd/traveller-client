import React from 'react';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="w-full bg-gradient-to-b from-neutral-50 to-gray-200 rounded-[32px] overflow-hidden">
      <div className="flex p-12 gap-8">
          <div className="flex-1 flex flex-col gap-8 ">
            <div className="w-fit px-4 py-2 bg-neutral-900 rounded-full flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
              <span className="text-white text-sm font-bold font-['Satoshi']">
                Start Your Adventure
              </span>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-neutral-900 text-7xl font-bold">
                What adventure awaits you?
              </h1>
              <p className="text-neutral-700 text-2xl font-medium font-['Satoshi'] w-[80%]">
                Discover unique experiences and create unforgettable memories across the world's most stunning destinations
              </p>
            </div>
            <div className="flex items-start gap-14">
              <div className="flex flex-col gap-1.5">
                <span className="text-neutral-900 text-4xl font-bold font-['Satoshi'] leading-[48px]">
                  500+
                </span>
                <span className="text-neutral-700 text-base font-medium font-['Satoshi']">
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
          <div className="flex-1 flex w-full gap-4">
              <div className='flex-3 flex flex-col gap-4'>
                <div className="h-68">
                  <Image
                    className="w-full h-full object-cover rounded-[20px] shadow-lg"
                    src="/png/P1.png"
                    alt="Destination 1"
                    width={0}
                    height={0}
                  />
                </div>
                <div className="h-50">
                  <Image
                    className="w-full h-full object-cover rounded-[20px] shadow-lg"
                    src="/png/P2.png"
                    alt="Destination 2"
                    width={0}
                    height={0}
                  />
                </div>
              </div>
              <div className='flex-2 flex flex-col gap-4 w-full' >
                <div className="h-46">
                  <Image
                    className="w-full h-full object-cover rounded-[20px] shadow-lg"
                    src="/png/P3.png"
                    alt="Destination 3"
                    width={0}
                    height={0}
                  />
                </div>
                <div className="h-46">
                  <Image
                    className="w-full h-full object-cover rounded-[20px] shadow-lg"
                    src="/png/P4.png"
                    alt="Destination 4"
                    width={0}
                    height={0}
                  />
                </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default HeroSection;
