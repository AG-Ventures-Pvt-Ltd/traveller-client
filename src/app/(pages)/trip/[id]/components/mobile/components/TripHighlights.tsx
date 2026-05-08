'use client'

import { useState } from 'react';
import MyImage from '@/common/ui/Image';
import { TripHighlight } from '../../../types';
import CollapsibleCard from '@/common/ui/CollapsibleCard';


interface TripHighlightsProps {
  highlights: TripHighlight[];
}

export default function TripHighlights({ highlights }: TripHighlightsProps) {
  const [showAll, setShowAll] = useState(false);

  if (!highlights || highlights.length === 0) {
    return null;
  }

  const displayedHighlights = showAll ? highlights : highlights.slice(0, 3);
  const hasMore = highlights.length > 3;
  const remainingCount = highlights.length - 3;

  return (
    <CollapsibleCard className="" title='Trip Highlights'>
      <div className="px-4 pb-4 flex flex-col gap-3">
        {displayedHighlights.map((highlight, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-300 overflow-hidden flex"
          >
            {/* Image */}
            <div className="w-29 h-26 flex-shrink-0">
              <MyImage
                src={highlight.image}
                alt={highlight.title}
                className="w-full h-full"
                objectFit="cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              <h3 className="text-sm font-semibold text-black">
                {highlight.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {hasMore && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="flex items-center justify-center gap-1.75 w-full py-2"
        >
          <span className="text-sm font-normal text-gray-500">
            view +{remainingCount} more
          </span>
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-2.625 h-1.375 bg-gray-500 transform rotate-45" />
          </div>
        </button>
      )}
    </CollapsibleCard>
  );
}