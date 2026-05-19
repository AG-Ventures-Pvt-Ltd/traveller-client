'use client'

import { useState, useEffect } from 'react';
import { Heart, Share2 } from 'lucide-react';
import MyImage from '@/common/ui/Image';
import { HeroCarouselProps } from '../types';
import { CAROUSEL_AUTO_SCROLL_INTERVAL, CAROUSEL_RESUME_DELAY } from '../constants';

export default function HeroCarousel({
    images,
    title,
    isBookmarked,
    onBack,
    onShare,
    onToggleBookmark,
}: HeroCarouselProps) {
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomedImageIndex, setZoomedImageIndex] = useState(0);
    const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
    const [isSwipe, setIsSwipe] = useState(false);

    const totalImages = images.length;

    useEffect(() => {
        if (!isAutoScrolling || totalImages === 0 || isZoomed) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
        }, CAROUSEL_AUTO_SCROLL_INTERVAL);
        return () => clearInterval(interval);
    }, [isAutoScrolling, totalImages, isZoomed]);

    const pauseAndResume = () => {
        setIsAutoScrolling(false);
        setTimeout(() => setIsAutoScrolling(true), CAROUSEL_RESUME_DELAY);
    };

    // Minimum swipe distance (in px) to trigger navigation
    const minSwipeDistance = 50;

    // Long press duration in milliseconds
    const longPressDuration = 500;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsSwipe(false);
        setIsAutoScrolling(false);

        // Start long press timer
        const timer = setTimeout(() => {
            setIsZoomed(true);
            setZoomedImageIndex(currentImageIndex);
            setIsAutoScrolling(false);
        }, longPressDuration);
        setLongPressTimer(timer);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
        
        // Check if this is a swipe (moved more than minimum distance)
        if (touchStart && Math.abs(e.targetTouches[0].clientX - touchStart) > minSwipeDistance) {
            setIsSwipe(true);
        }
        
        // Cancel long press if user moves finger
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            setLongPressTimer(null);
        }
    };

    const onTouchEnd = () => {
        // Clear long press timer
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            setLongPressTimer(null);
        }

        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        // Only navigate if it was a swipe
        if (isSwipe) {
            if (isLeftSwipe) {
                // Swipe left - next image
                setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
            } else if (isRightSwipe) {
                // Swipe right - previous image
                setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
            }

            // Resume auto-scrolling after swipe
            setTimeout(() => setIsAutoScrolling(true), CAROUSEL_RESUME_DELAY);
        }
    };

    // Zoomed view touch handlers
    const onZoomedTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsSwipe(false);
    };

    const onZoomedTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
        
        // Check if this is a swipe
        if (touchStart && Math.abs(e.targetTouches[0].clientX - touchStart) > minSwipeDistance) {
            setIsSwipe(true);
        }
    };

    const onZoomedTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        // Only navigate if it was a swipe
        if (isSwipe) {
            if (isLeftSwipe) {
                // Swipe left - next image
                setZoomedImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
            } else if (isRightSwipe) {
                // Swipe right - previous image
                setZoomedImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
            }
        }
    };

    const handleImageTap = (e: React.MouseEvent | React.TouchEvent, isZoomedView = false) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clickX = x - rect.left;
        const isLeftSide = clickX < rect.width / 2;

        if (isZoomedView) {
            if (isLeftSide) {
                // Left side - previous image
                setZoomedImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
            } else {
                // Right side - next image
                setZoomedImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
            }
        } else {
            if (isLeftSide) {
                // Left side - previous image
                setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
            } else {
                // Right side - next image
                setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
            }
            pauseAndResume();
        }
    };

    const handleZoomedImageTap = (e: React.MouseEvent | React.TouchEvent) => {
        handleImageTap(e, true);
    };

    const closeZoomedView = () => {
        setIsZoomed(false);
        setTimeout(() => setIsAutoScrolling(true), CAROUSEL_RESUME_DELAY);
    };

    return (
        <div
            className="relative w-full h-90 overflow-hidden"
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Carousel Images */}
            <div className="relative w-full h-full">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-500 cursor-pointer ${
                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={handleImageTap}
                    >
                        <MyImage
                            src={image || '/placeholder.jpg'}
                            alt={`${title} - Image ${index + 1}`}
                            className="w-full h-full"
                        />
                    </div>
                ))}
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Back Button */}
            <div className="absolute top-5 left-5 z-20">
                <button
                    onClick={onBack}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-pink-600 transition-colors"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-5 right-5 z-20 flex gap-2">
                <button
                    onClick={onShare}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-black/80 transition-colors border border-white/20"
                >
                    <Share2 className="w-5 h-5 text-white" />
                </button>
                <button
                    onClick={onToggleBookmark}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-black/80 transition-colors border border-white/20"
                >
                    <Heart
                        className={`w-5 h-5 transition-colors ${
                            isBookmarked ? 'text-red-500 fill-red-500' : 'text-white'
                        }`}
                    />
                </button>
            </div>

            {/* Progress Indicators */}
            {totalImages > 1 && (
                <div className="absolute bottom-6 left-0 right-0 z-30 flex gap-2 px-4 justify-center">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className="flex-1 h-1 bg-gray-600/60 rounded-full overflow-hidden shadow-lg cursor-pointer transition-all"
                            onClick={() => {
                                setCurrentImageIndex(index);
                                pauseAndResume();
                            }}
                        >
                            <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                    index === currentImageIndex ? 'bg-white' : 'bg-transparent'
                                }`}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Zoomed View Modal */}
            {isZoomed && (
                <div 
                    className="fixed inset-0 z-50 bg-black"
                    onTouchStart={onZoomedTouchStart}
                    onTouchMove={onZoomedTouchMove}
                    onTouchEnd={onZoomedTouchEnd}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeZoomedView}
                        className="absolute top-5 right-5 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 transition-colors border border-white/20"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Zoomed Image */}
                    <div className="w-full h-full flex items-center justify-center p-4">
                        <div className="cursor-pointer" onClick={handleZoomedImageTap}>
                            <MyImage
                                src={images[zoomedImageIndex] || '/placeholder.jpg'}
                                alt={`${title} - Image ${zoomedImageIndex + 1} (Zoomed)`}
                                className="max-w-full max-h-full"
                                objectFit="contain"
                                fill={false}
                                style={{ maxWidth: '100vw', maxHeight: '100vh' }}
                            />
                        </div>
                    </div>

                    {/* Zoomed Progress Indicators */}
                    {totalImages > 1 && (
                        <div className="absolute bottom-6 left-0 right-0 z-30 flex gap-2 px-4 justify-center">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className="flex-1 h-1 bg-gray-600/60 rounded-full overflow-hidden shadow-lg cursor-pointer transition-all"
                                    onClick={() => setZoomedImageIndex(index)}
                                >
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${
                                            index === zoomedImageIndex ? 'bg-white' : 'bg-transparent'
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30">
                        <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                            {zoomedImageIndex + 1} / {totalImages}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
