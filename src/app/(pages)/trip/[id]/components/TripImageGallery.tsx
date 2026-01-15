import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TripImageGalleryProps } from '../types';

export function TripImageGallery({ images }: TripImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const validImages = images.filter(img => img && img.trim() !== '');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [validImages.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (validImages.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }


  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] mb-4 sm:mb-6 md:mb-8 rounded-lg overflow-hidden group">
      <ImageWithFallback
        src={validImages[currentIndex]}
        alt={`Trip image ${currentIndex + 1}`}
        fill
        className="object-cover rounded-2xl"
        quality={90}
      />

      <button
        onClick={prevImage}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 sm:p-3 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 sm:p-3 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
        {validImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`transition-all rounded-full ${currentIndex === index
                ? 'w-6 sm:w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
