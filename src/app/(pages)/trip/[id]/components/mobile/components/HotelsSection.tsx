'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import MyImage from '@/common/ui/Image';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import { BedIcon, InfoIcon, MapPinIcon } from '@phosphor-icons/react';
import { TripHotel } from '../../../types';

const ImageLightbox = dynamic(() => import('../../desktop/components/ImageLightbox'), { ssr: false });

const MAX_TILES = 4;
// Static class names so Tailwind picks them up.
const GRID_COLS = ['', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-2 sm:grid-cols-4'];

const placeLabel = (h: TripHotel) => [h.city?.trim(), h.state?.trim()].filter(Boolean).join(', ');

// Group by location, keeping the order hotels were entered (= order of stay).
const groupByPlace = (hotels: TripHotel[]) => {
    const groups = new Map<string, TripHotel[]>();
    for (const h of hotels) {
        const key = placeLabel(h);
        groups.set(key, [...(groups.get(key) || []), h]);
    }
    return [...groups.entries()].map(([place, items]) => ({ place, items }));
};

function HotelCard({ hotel }: { hotel: TripHotel }) {
    const images = hotel.images || [];
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const tiles = images.slice(0, MAX_TILES);
    const hiddenCount = images.length - MAX_TILES;

    return (
        <div className="rounded-xl border border-gray-300 overflow-hidden">
            {tiles.length > 0 && (
                <div className={`grid gap-1 ${GRID_COLS[tiles.length]}`}>
                    {tiles.map((src, i) => {
                        const showMore = i === MAX_TILES - 1 && hiddenCount > 0;
                        return (
                            <button
                                key={src}
                                type="button"
                                onClick={() => setLightboxIndex(i)}
                                className={`relative overflow-hidden ${tiles.length === 1 ? 'h-44' : 'h-28'}`}
                                aria-label={showMore ? `View all ${images.length} photos of ${hotel.name}` : `View ${hotel.name} photo ${i + 1}`}
                            >
                                <MyImage src={src} alt={`${hotel.name} photo ${i + 1}`} className="w-full h-full" objectFit="cover" />
                                {showMore && (
                                    <span className="absolute inset-0 bg-black/55 flex items-center justify-center text-white text-lg font-semibold">
                                        +{hiddenCount + 1}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
            {lightboxIndex !== null && (
                <ImageLightbox images={images} title={hotel.name} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
            )}
            <div className="flex items-center gap-3 p-4">
                {images.length === 0 && (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <BedIcon className="w-5 h-5 text-gray-500" weight="thin" />
                    </div>
                )}
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-black">{hotel.name}</h3>
                    <p className="text-xs text-gray-500">or similar</p>
                </div>
            </div>
        </div>
    );
}

export default function HotelsSection({ hotels }: { hotels: TripHotel[] }) {
    if (!hotels?.length) return null;
    const groups = groupByPlace(hotels);

    return (
        <CollapsibleCard title="Where You'll Stay" className="border border-[#d9d9d9] rounded-[16px] mt-6">
            <div className="px-4 pb-4 flex flex-col gap-5">
                {groups.map(({ place, items }) => (
                    <div key={place || 'other'} className="flex flex-col gap-3">
                        {place && (
                            <div className="flex items-center gap-1.5">
                                <MapPinIcon className="w-4 h-4 text-gray-700" weight="fill" />
                                <span className="text-sm font-medium text-gray-800">
                                    {groups.length > 1 ? `Stay in ${place}` : place}
                                </span>
                            </div>
                        )}
                        {items.map((hotel, i) => <HotelCard key={`${hotel.name}-${i}`} hotel={hotel} />)}
                    </div>
                ))}

                {/* Always shown: hotels are indicative, only the quality is guaranteed */}
                <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
                    <InfoIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-600" weight="regular" />
                    <p className="text-xs text-gray-600">
                        Hotels shown are indicative. Depending on availability, you may stay at a different
                        property, but it will be of the same quality and standard.
                    </p>
                </div>
            </div>
        </CollapsibleCard>
    );
}
