'use client';

import React, { useState, useRef, useEffect } from 'react';
import DesktopCarouselCard from './DesktopCarouselCard';
import { SlidingCarouselProps } from '../../HomePage/types';

const COLOR_PAIRS: Array<['yellow' | 'green' | 'purple', 'yellow' | 'green' | 'purple']> = [
  ['yellow', 'green'],
  ['purple', 'yellow'],
];

const CARD_WIDTH = 260;
const GAP = 20;

interface DesktopSlidingCarouselProps extends SlidingCarouselProps {
  onPrevRef?: (fn: () => void) => void;
  onNextRef?: (fn: () => void) => void;
  onBoundsChange?: (atStart: boolean, atEnd: boolean) => void;
}

const DesktopSlidingCarousel: React.FC<DesktopSlidingCarouselProps> = ({
  trips,
  isLoading = false,
  onCardClick,
  carouselIndex = 0,
  onPrevRef,
  onNextRef,
  onBoundsChange,
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
    const obs = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const totalCards = trips.length;
  const visibleCards = containerWidth > 0
    ? Math.max(1, Math.floor((containerWidth + GAP) / (CARD_WIDTH + GAP)))
    : 1;
  const maxIndex = Math.max(0, totalCards - visibleCards);
  const trackWidth = totalCards * (CARD_WIDTH + GAP) - GAP;
  const maxTranslate = Math.max(0, trackWidth - containerWidth);
  const translateX = Math.min(currentIndex * (CARD_WIDTH + GAP), maxTranslate);

  useEffect(() => {
    onBoundsChange?.(currentIndex === 0, currentIndex >= maxIndex);
  }, [currentIndex, maxIndex, onBoundsChange]);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  useEffect(() => { onPrevRef?.(prev); }, [onPrevRef]);   // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { onNextRef?.(next); }, [onNextRef]);   // eslint-disable-line react-hooks/exhaustive-deps

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(currentIndex);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (startX - x) / (CARD_WIDTH + GAP);
    setCurrentIndex(Math.max(0, Math.min(maxIndex, Math.round(scrollLeft + walk))));
  };
  const onMouseUp = () => setIsDragging(false);

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(currentIndex);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (startX - x) / (CARD_WIDTH + GAP);
    setCurrentIndex(Math.max(0, Math.min(maxIndex, scrollLeft + walk)));
  };
  const onTouchEnd = () => setIsDragging(false);

  if (isLoading) {
    return (
      <div className="flex gap-5 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 rounded-3xl bg-gray-200 animate-pulse" style={{ width: CARD_WIDTH, height: 360 }} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex"
        style={{
          gap: GAP,
          width: trackWidth,
          transform: `translateX(-${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {trips.map((trip, index) => (
          <div key={trip.id} className="flex-shrink-0" style={{ width: CARD_WIDTH }}>
            <DesktopCarouselCard
              {...trip}
              colorScheme={COLOR_PAIRS[carouselIndex % 2][index % 2]}
              onClick={() => onCardClick?.()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopSlidingCarousel;
