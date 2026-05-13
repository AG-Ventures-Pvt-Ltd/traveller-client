import MyImage from '@/common/ui/Image'
import { StarIcon, SealCheckIcon } from '@phosphor-icons/react'

export interface MobileTripCardData {
  _id: string
  title: string
  hostName : string
  slug : string
  rating: number
  days: number
  price: number
  image: string
  isBookmarked : boolean
  bgColor?: string
}

interface MobileTripCardProps {
  trip: MobileTripCardData
  onClick?: (id: string) => void
}

export function MobileTripCard({ trip, onClick }: MobileTripCardProps) {

  return (
    <div
      className="relative rounded-[20px] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
      style={{ backgroundColor: trip.bgColor }}
      onClick={() => onClick?.(trip.slug)}
    >
      <div className="relative mx-[10px] mt-[10px] rounded-[12px] overflow-hidden h-[100px]">
       <MyImage src={trip.image} alt={trip.slug} className='h-full w-full'/>
        <div className="absolute bottom-[6px] right-[6px] bg-white flex items-center gap-[3px] px-[6px] py-[4px] rounded-[8px]">
          <StarIcon size={11} weight="fill" className="text-yellow-400" />
          <span className="text-[10px] font-normal text-black tracking-tight">
            {'New'}
          </span>
        </div>
      </div>
      <div className="px-[10px] pb-[10px] pt-[8px] flex flex-col gap-[4px]">
        <p className="text-[14px] font-bold text-black tracking-tight leading-tight">
          {trip.title}
        </p>
        <div className="flex items-center gap-[4px]">
          <span className="text-[10px] font-medium text-black tracking-tight">
            by {trip.hostName}
          </span>
          {/* <SealCheckIcon size={13} weight="fill" className="text-blue-500" /> */}
        </div>
        <div className="flex items-center gap-[4px]">
          <span className="text-[10px] font-light text-black tracking-tight">
            {trip.days}
          </span>
        </div>
        <p className="text-[10px] text-black tracking-tight">
          From{' '}
          <span className="font-semibold text-xs">₹{trip.price.toLocaleString('en-IN')}/</span>{' '}
          adult
        </p>
      </div>
    </div>
  )
}
