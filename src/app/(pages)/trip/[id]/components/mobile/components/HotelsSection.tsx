'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import MyImage from '@/common/ui/Image';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import { BedIcon, InfoIcon, MapPinIcon } from '@phosphor-icons/react';
import { TripHotel } from '../../../types';

const ImageLightbox = dynamic(() => import('../../desktop/components/ImageLightbox'), { ssr: false });

// 4:3 thumbnails (matches admin crop): 2 per row on mobile, up to 4 at 144px wide on desktop.
const MAX_TILES = 4;
const MOBILE_TILES = 2;

const placeLabel = (h: TripHotel) => [h.city?.trim(), h.state?.trim()].filter(Boolean).join(', ');

function HotelCard({ hotel }: { hotel: TripHotel }) {
    const images = hotel.images || [];
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const tiles = images.slice(0, MAX_TILES);
    const place = placeLabel(hotel);

    return (
        <div className="rounded-xl border border-gray-300 overflow-hidden">
            <div className="flex items-center gap-3 p-4">
                {images.length === 0 && (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <BedIcon className="w-5 h-5 text-gray-500" weight="thin" />
                    </div>
                )}
                <h3 className="min-w-0 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                    <span className="font-semibold text-black">
                        {hotel.name} <span className="font-normal text-gray-500">or similar</span>
                    </span>
                    {place && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-gray-800">
                            <MapPinIcon className="w-3.5 h-3.5 flex-shrink-0" weight="fill" />
                            {place}
                        </span>
                    )}
                </h3>
            </div>
            {tiles.length > 0 && (
                <div className="grid grid-cols-2 gap-1.5 px-4 pb-4 -mt-1 sm:flex">
                    {tiles.map((src, i) => {
                        // "+N" sits on the last visible tile: tile 2 on mobile, tile 4 on desktop.
                        const moreMobile = i === MOBILE_TILES - 1 ? images.length - MOBILE_TILES : 0;
                        const moreDesktop = i === MAX_TILES - 1 ? images.length - MAX_TILES : 0;
                        return (
                            <button
                                key={src}
                                type="button"
                                onClick={() => setLightboxIndex(i)}
                                className={`relative overflow-hidden rounded-lg aspect-[4/3] sm:w-36 ${i >= MOBILE_TILES ? 'hidden sm:block' : ''}`}
                                aria-label={`View ${hotel.name} photo ${i + 1} of ${images.length}`}
                            >
                                <MyImage src={src} alt={`${hotel.name} photo ${i + 1}`} className="w-full h-full" objectFit="cover" />
                                {moreMobile > 0 && (
                                    <span className="sm:hidden absolute inset-0 bg-black/55 flex items-center justify-center text-white text-lg font-semibold">
                                        +{moreMobile + 1}
                                    </span>
                                )}
                                {moreDesktop > 0 && (
                                    <span className="hidden sm:flex absolute inset-0 bg-black/55 items-center justify-center text-white text-lg font-semibold">
                                        +{moreDesktop + 1}
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
        </div>
    );
}

export default function HotelsSection({ hotels }: { hotels: TripHotel[] }) {
    if (!hotels?.length) return null;

    return (
        <CollapsibleCard title="Where You'll Stay" className="border border-[#d9d9d9] rounded-[16px] mt-6">
            <div className="px-4 pb-4 flex flex-col gap-3">
                {/* Array order = order of stay */}
                {hotels.map((hotel, i) => <HotelCard key={`${hotel.name}-${i}`} hotel={hotel} />)}

                {/* Always shown: hotels are indicative, only the quality is guaranteed */}
                <div className="flex items-center gap-2 rounded-lg bg-yellow-400 px-3 py-2.5">
                    <InfoIcon className="w-4 h-4 flex-shrink-0 text-black" weight="regular" />
                    <p className="text-xs text-black">
                        Hotel may vary based on availability, but quality stays the same.
                    </p>
                </div>
            </div>
        </CollapsibleCard>
    );
}
