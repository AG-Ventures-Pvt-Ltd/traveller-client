import Image, { ImageProps } from "next/image"

interface WondrrImageProps extends Omit<ImageProps, 'src'> {
    src: string;
    rounded?:boolean;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    fill?: boolean;
}

const MyImage = ({ src, alt,className,rounded, objectFit = 'cover', fill = true, ...props }: WondrrImageProps) => {
    const imageSrc = `${src.startsWith('/') ? (process.env.NEXT_PUBLIC_CLOUDFRONT_URL + src) : src}`;
    
    if (!fill) {
        return (
            <img
                src={imageSrc}
                alt={alt || 'Some Trip Image'}
                className={`${className} ${rounded ? 'rounded-full' : ''}`}
                style={{ objectFit }}
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
                style={{ 'objectFit' : objectFit }}
                className={rounded ? `rounded-full` : ""}
                {...props}
            />
        </div>
    )
}

export default MyImage;