'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import CarouselCard from './CarouselCard';

interface Trip {
  id: string | number;
  image: string;
  title: string;
  provider: string;
  duration: string;
  price: number;
  rating: number;
}

interface SlidingCarouselProps {
  trips: Trip[];
  isLoading?: boolean;
  onCardClick?: (trip: Trip) => void;
}

const SlidingCarousel: React.FC<SlidingCarouselProps> = ({
  trips,
  isLoading = false,
  onCardClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCards = trips.length;
  // Adjust maxIndex to prevent trailing space - ensure last card is fully visible without overflow
  const maxIndex = Math.max(0, totalCards - 1);

  // Card dimensions
  const cardWidth = 200;
  const gap = 12;

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
    const newIndex = scrollLeft + walk;
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
      {/* Navigation Buttons */}
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

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="overflow-hidden"
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
          className="flex transition-transform duration-300 ease-out gap-3 sm:gap-3"
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
          }}
        >
          {trips.map((trip, index) => (
            <div key={trip.id} className="sm:w-64 flex-shrink-0" style={{ width: `${cardWidth}px` }}>
              <CarouselCard
                {...trip}
                colorScheme={index % 2 === 0 ? 'yellow' : 'green'}
                onClick={() => onCardClick?.(trip)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingCarousel;
