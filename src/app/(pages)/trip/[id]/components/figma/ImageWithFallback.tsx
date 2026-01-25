import React, { useState } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'

export function ImageWithFallback(props: React.ComponentProps<typeof Image>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, width, height, fill, ...rest } = props

  // Check if src is empty or invalid
  const isSrcValid = src && typeof src === 'string' && src.trim() !== ''

  if (didError || !isSrcValid) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <ImageOff className="w-8 h-8 text-gray-400" />
        </div>
      </div>
    )
  }

  return (
    <Image 
      src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${src}`} 
      alt={alt} 
      className={className} 
      style={style} 
      fill
      {...rest} 
      onError={handleError}
      quality={90}
    />
  )
}
