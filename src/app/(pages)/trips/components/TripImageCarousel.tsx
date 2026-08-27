'use client';

import React, { useEffect, useRef, useState } from 'react';
import MyImage from '@/common/ui/Image';

interface TripImageCarouselProps {
  images: string[];
  alt: string;
  /** Applied to the clipping container — give it a height. */
  className?: string;
  /** Eager-load the first slide. Only worth it for cards above the fold. */
  priority?: boolean;
  /** Owned by the card, which pauses on hover — the card's stretched link covers this
      element, so the carousel can't observe its own hover. */
  paused?: boolean;
  /** Overrides MyImage's generic default, which assumes a narrower slot than a trip card
      occupies and would serve an image too small for it. */
  sizes?: string;
  intervalMs?: number;
}

/**
 * Auto-advancing image strip for trip cards.
 *
 * Pauses while off-screen or while `paused`, and does not auto-advance at all under
 * `prefers-reduced-motion`. A single image renders as a plain image with no dots.
 *
 * The track sits below the card's stretched link so that clicking the image still opens
 * the trip; only the dots are raised above it.
 */
const TripImageCarousel: React.FC<TripImageCarouselProps> = ({
  images,
  alt,
  className = '',
  priority = false,
  paused = false,
  sizes,
  intervalMs = 3500,
}) => {
  const slides = images.filter(Boolean);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only animate while the card is on screen — a 12-card page would otherwise run a dozen
  // timers and image swaps for cards nobody is looking at.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || count <= 1) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    if (count <= 1 || paused || !visible) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => window.clearInterval(id);
  }, [count, paused, visible, intervalMs]);

  if (count === 0) return <div className={`bg-neutral-200 ${className}`} />;

  if (count === 1) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <MyImage src={slides[0]} alt={alt} className="w-full h-full" priority={priority} sizes={sizes} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-full w-full shrink-0">
            {/* Only the first slide is eager; the rest lazy-load so a page of cards
                doesn't fetch 60 images up front. */}
            <MyImage src={src} alt={alt} className="w-full h-full" priority={priority && i === 0} sizes={sizes} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/35 px-2 py-1 backdrop-blur-sm">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show image ${i + 1} of ${count}`}
            aria-current={i === index}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIndex(i); }}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TripImageCarousel;
