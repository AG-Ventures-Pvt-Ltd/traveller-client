'use client'

import Image, { ImageProps } from "next/image"
import { useState } from "react"

interface WondrrImageProps extends Omit<ImageProps, 'src'> {
    src: string;
    rounded?: boolean;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    fill?: boolean;
}

const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL ?? '';

// Per-session flag: first 402 from /_next/image flips all subsequent images to unoptimized
let _quotaExceeded = false;

const MyImage = ({ src, alt, className, rounded, objectFit = 'cover', fill = true, onError, ...props }: WondrrImageProps) => {
    const imageSrc = src.startsWith('/assets')
        ? src
        : src.startsWith('/')
            ? CLOUDFRONT_URL + src
            : src;

    const isOurCDN = CLOUDFRONT_URL !== '' && imageSrc.startsWith(CLOUDFRONT_URL);

    const [unoptimized, setUnoptimized] = useState(() => isOurCDN && _quotaExceeded);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (isOurCDN && !unoptimized) {
            _quotaExceeded = true;
            setUnoptimized(true);
        }
        onError?.(e);
    };

    if (!fill) {
        return (
            <Image
                src={imageSrc}
                alt={alt || 'Some Trip Image'}
                className={`${className ?? ''} ${rounded ? 'rounded-full' : ''}`.trim() || undefined}
                style={{ objectFit }}
                unoptimized={unoptimized}
                onError={handleError}
                {...props}
            />
        );
    }

    return (
        <div className={`relative ${className}`}>
            <Image
                src={imageSrc}
                alt={alt || 'Some Trip Image'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                quality={90}
                style={{ objectFit }}
                className={rounded ? 'rounded-full' : ''}
                unoptimized={unoptimized}
                onError={handleError}
                {...props}
            />
        </div>
    );
};

export default MyImage;
export type { WondrrImageProps };
