'use client';

import React, { useCallback, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SlidingCarousel from './SlidingCarousel';
import { SlidingCarouselSectionProps } from '../../MobileLanding/types';

const CarouselSection: React.FC<SlidingCarouselSectionProps> = ({
  title,
  description,
  trips,
  isLoading = false,
  carouselIndex = 0,
}) => {

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const prevFnRef = useRef<() => void>(() => {});
  const nextFnRef = useRef<() => void>(() => {});

  const handlePrevRef = useCallback((fn: () => void) => { prevFnRef.current = fn; }, []);
  const handleNextRef = useCallback((fn: () => void) => { nextFnRef.current = fn; }, []);
  const handleBoundsChange = useCallback((start: boolean, end: boolean) => {
    setAtStart(start);
    setAtEnd(end);
  }, []);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-neutral-900 text-3xl font-bold">{title}</h2>
          {description && (
            <p className="text-neutral-500 text-sm font-medium">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => prevFnRef.current()}
            disabled={atStart}
            className="w-10 h-10 rounded-full border-2 border-neutral-200 flex items-center justify-center hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all group"
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => nextFnRef.current()}
            disabled={atEnd}
            className="w-10 h-10 rounded-full border-2 border-neutral-200 flex items-center justify-center hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next"
          >
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <SlidingCarousel
        trips={trips}
        isLoading={isLoading}
        carouselIndex={carouselIndex}
        onPrevRef={handlePrevRef}
        onNextRef={handleNextRef}
        onBoundsChange={handleBoundsChange}
      />
    </div>
  );
};

export default CarouselSection;
