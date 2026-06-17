'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import CarouselCard from './CarouselCard';
import { SlidingCarouselProps } from '../types';

const COLOR_PAIRS: Array<['yellow' | 'green' | 'purple', 'yellow' | 'green' | 'purple']> = [
  ['yellow', 'green'],
  ['purple', 'yellow'],
];

const SlidingCarousel: React.FC<SlidingCarouselProps> = ({
  trips,
  isLoading = false,
  onCardClick,
  carouselIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const totalCards = trips.length;
  const cardWidth = 200;
  const gap = 12;

  const visibleCards = containerWidth > 0 ? Math.max(1, Math.floor((containerWidth + gap) / (cardWidth + gap))) : 1;
  const maxIndex = Math.max(0, totalCards - visibleCards);

  const trackWidth = totalCards * (cardWidth + gap) - gap;
  const maxTranslate = Math.max(0, trackWidth - containerWidth);
  const translateX = Math.min(currentIndex * (cardWidth + gap), maxTranslate);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(currentIndex);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (startX - x) / (cardWidth + gap);
    const newIndex = Math.round(scrollLeft + walk);
    setCurrentIndex(Math.max(0, Math.min(maxIndex, newIndex)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(currentIndex);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (startX - x) / (cardWidth + gap);
    const newIndex = scrollLeft + walk;
    setCurrentIndex(Math.max(0, Math.min(maxIndex, newIndex)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full sm:w-80 h-96 bg-gray-200 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {totalCards > 1 && (
        <>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 bg-white rounded-full p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-gray-300 shadow-md"
            aria-label="Previous"
          >
            <ArrowLeft size={20} className="w-5 h-5 text-neutral-900" weight="bold" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 bg-white rounded-full p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-gray-300 shadow-md"
            aria-label="Next"
          >
            <ArrowRight size={20} className="w-5 h-5 text-neutral-900" weight="bold" />
          </button>
        </>
      )}

      <div
        ref={containerRef}
        className="overflow-hidden px-3"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          maxWidth: '100%',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(-${translateX}px)`,
            width: `${trackWidth}px`,
          }}
        >
          {trips.map((trip, index) => (
            <div key={trip.id} className="flex-shrink-0" style={{ width: `${cardWidth}px` }}>
              <CarouselCard
                {...trip}
                colorScheme={COLOR_PAIRS[carouselIndex % 2][index % 2]}
                onClick={() => onCardClick?.()}
                priority={carouselIndex === 0 && index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingCarousel;
