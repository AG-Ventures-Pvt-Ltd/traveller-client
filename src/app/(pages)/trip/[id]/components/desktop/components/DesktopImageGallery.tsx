import { Images } from 'lucide-react';
import MyImage from '@/common/ui/Image';

export interface DesktopImageGalleryProps {
    images: string[];
    title: string;
    onOpen: (index: number) => void;
    isBookmarked: boolean;
    onShare: () => void;
    onToggleBookmark: () => void;
}

export default function DesktopImageGallery({ images, title, onOpen }: DesktopImageGalleryProps) {
    if (images.length === 0) return null;
    const main = images[0];
    const side = images.slice(1, 3);
    const extra = images.length - 3;

    return (
        <div className="relative">
            <div className="flex gap-3 rounded-[28px] overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.10)]" style={{ height: '460px' }}>
                {/* Main */}
                <div className={`overflow-hidden cursor-zoom-in group relative ${side.length > 0 ? 'flex-[3]' : 'flex-1'}`} onClick={() => onOpen(0)}>
                    <MyImage src={main || '/placeholder.jpg'} alt={title} className="w-full h-full transition-transform duration-[600ms] group-hover:scale-[1.04]" objectFit="cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                {/* Side */}
                {side.length > 0 && (
                    <div className="flex-[2] flex flex-col gap-3">
                        {side.map((img, i) => {
                            const showOverlay = i === side.length - 1 && extra > 0;
                            return (
                                <div key={i} className="flex-1 relative overflow-hidden cursor-zoom-in group" onClick={() => onOpen(i + 1)}>
                                    <MyImage src={img} alt={`${title} photo ${i + 2}`} className="w-full h-full transition-transform duration-[600ms] group-hover:scale-[1.04]" objectFit="cover" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                    {showOverlay && (
                                        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-1" onClick={(e) => { e.stopPropagation(); onOpen(i + 1); }}>
                                            <span className="text-white text-4xl font-black leading-none">+{extra}</span>
                                            <span className="text-white/80 text-sm font-medium">more</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* See all photos */}
            <button onClick={() => onOpen(0)} className="absolute bottom-5 right-5 flex items-center gap-2 text-sm font-bold text-black bg-white px-4 py-2.5 rounded-full hover:bg-[#FFC107] transition-colors shadow-lg">
                <Images className="w-4 h-4" />
                See all {images.length} photos
            </button>
        </div>
    );
}
