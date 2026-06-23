import React from 'react'
import Link from 'next/link'
import MyImage from '@/common/ui/Image'
import { StarIcon, MapPinIcon, HeartIcon } from '@phosphor-icons/react'
import { useBookMarking } from '@/common/hooks/useBookMarking'

export interface TripCardProps {
  title: string
  image: string
  address: string
  rating: number
  price: number
  hostName: string
  hostUsername?: string
  slug: string
  tripSlug?: string
  days: string
  bgColor?: string
  isBookmarked?: boolean
  onClick?: (slug: string) => void
}

export function TripCard({ title, image, address, rating, price, hostName, hostUsername, slug, tripSlug, days, bgColor = '#FFD976', isBookmarked: initialIsBookmarked = false }: TripCardProps) {
  const { isBookmarked, toggle } = useBookMarking(slug, initialIsBookmarked)

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(e)
  }

  return (
    <Link
      href={`/trip/${tripSlug || slug}`}
      className="relative rounded-[20px] overflow-hidden active:scale-[0.98] transition-transform flex"
      style={{ backgroundColor: bgColor }}
    >
      {/* Image */}
      <div className="relative m-[10px] rounded-[12px] overflow-hidden w-[157px] min-h-[115px] shrink-0">
        <MyImage src={image} alt={title} className="h-full w-full" objectFit="cover" />

        {/* Bookmark button */}
        <button
          onClick={handleBookmarkClick}
          className="absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-full bg-black/70 hover:bg-black transition-colors z-10"
        >
          <HeartIcon
            size={18}
            weight={isBookmarked ? 'fill' : 'regular'}
            className={isBookmarked ? 'text-red-500' : 'text-white'}
          />
        </button>

        {/* Rating badge */}
        <div className="absolute bottom-[5px] right-[5px] bg-white flex items-center gap-[4px] px-[7px] py-[5px] rounded-[8px]">
          <StarIcon size={12} weight="fill" className="text-yellow-400" />
          <span className="text-[10.5px] font-normal text-black tracking-tight">
            {rating > 0 ? rating : 'New'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-[3px] py-[10px] pr-[10px] flex-1 min-w-0">
        <p className="font-semibold text-[18px] text-black tracking-tight leading-tight line-clamp-2">
          {title}
        </p>
        <div className="flex items-center gap-[4px]">
          <Link
            href={hostUsername ? `/${hostUsername}` : '#'}
            onClick={(e) => e.stopPropagation()}
            className="text-[12.5px] font-normal text-black tracking-tight truncate hover:underline"
          >
            by {hostName}
          </Link>
        </div>
        <div className="flex items-center gap-[2px]">
          <span className="text-[12.5px] font-light text-black tracking-tight">{days || '3N • 2D'}</span>
        </div>
        <p className="text-[12.5px] text-black tracking-tight">
          {'From '}
          <span className="font-semibold">₹{price.toLocaleString('en-IN')}/</span>
          {' adult'}
        </p>
        <div className="flex items-center gap-[7px]">
          <MapPinIcon size={16} weight="thin" className="text-black shrink-0" />
          <span className="text-[12.5px] font-normal text-black tracking-tight truncate">{address || 'India'}</span>
        </div>
      </div>
    </Link>
  )
}
