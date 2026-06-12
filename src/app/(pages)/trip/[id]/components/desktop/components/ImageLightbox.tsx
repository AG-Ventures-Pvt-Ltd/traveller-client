'use client'

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import MyImage from '@/common/ui/Image';

export interface ImageLightboxProps {
    images: string[];
    title: string;
    initialIndex: number;
    onClose: () => void;
}

export default function ImageLightbox({ images, title, initialIndex, onClose }: ImageLightboxProps) {
    const [current, setCurrent] = useState(initialIndex);
    const total = images.length;

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') setCurrent(p => p === total - 1 ? 0 : p + 1);
            if (e.key === 'ArrowLeft') setCurrent(p => p === 0 ? total - 1 : p - 1);
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [total, onClose]);

    return (
        <div className="fixed inset-0 z-[100] bg-[#1a1410] flex flex-col select-none">
            <div className="flex items-center justify-between px-8 py-4 border-b border-white/10 shrink-0">
                <p className="text-white font-bold truncate max-w-lg">{title}</p>
                <div className="flex items-center gap-5 shrink-0">
                    <span className="text-white/50 text-sm font-medium">{current + 1} / {total}</span>
                    <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center px-20">
                <div className="relative w-full h-full flex items-center justify-center">
                    <MyImage
                        src={images[current] || '/placeholder.jpg'}
                        alt={`${title} — photo ${current + 1}`}
                        objectFit="contain"
                        fill={false}
                        width={1400}
                        height={900}
                        style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 200px)', objectFit: 'contain' }}
                    />
                </div>
                {total > 1 && (
                    <>
                        <button onClick={() => setCurrent(p => p === 0 ? total - 1 : p - 1)} className="absolute left-5 w-12 h-12 rounded-full bg-white/10 hover:bg-[#EEA0FF] hover:text-black border border-white/15 flex items-center justify-center transition-colors text-white">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={() => setCurrent(p => p === total - 1 ? 0 : p + 1)} className="absolute right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-[#EEA0FF] hover:text-black border border-white/15 flex items-center justify-center transition-colors text-white">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {total > 1 && (
                <div className="flex gap-2 px-8 py-4 overflow-x-auto scrollbar-hide justify-center shrink-0">
                    {images.map((img, i) => (
                        <button key={i} onClick={() => setCurrent(i)} className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-[#EEA0FF] opacity-100' : 'border-transparent opacity-45 hover:opacity-75'}`}>
                            <MyImage src={img} alt="" className="w-full h-full" objectFit="cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
