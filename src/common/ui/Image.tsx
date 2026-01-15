import Image, { ImageProps } from "next/image"

interface WondrrImageProps extends Omit<ImageProps, 'src'> {
    src: string;
}

const MyImage = ({ src, alt,className, ...props }: WondrrImageProps) => {
    return (
        <div className={`relative ${className}`}>
            <Image
                src={`${src.startsWith('/') ? (process.env.NEXT_PUBLIC_CLOUDFRONT_URL + src) : src}`}
                alt={alt || 'Some Trip Image'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                quality={100}
                {...props}
            />
        </div>
    )
}

export default MyImage;