'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  ShareNetworkIcon,
  ShieldCheckIcon,
  MapPinIcon,
  AirplaneTiltIcon,
  CompassIcon,
} from '@phosphor-icons/react'
import MyImage from '@/common/ui/Image'
import BackButton from '@/common/ui/BackButton'
import { Avatar, AvatarImage, AvatarFallback } from '@/common/ui/avatar'
import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { ShareModal } from '@/common/components/composites/ShareModal'
import { HostProfile } from '../../../types'


const HostHeroDesktop = () => {
  const params = useParams()
  const id = params.id as string
  const [shareOpen, setShareOpen] = useState(false)

  const { data: host, isLoading } = useGetData<HostProfile>(API_ENDPOINTS.USER.HOST_PROFILE(id))

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="h-[420px] w-full animate-pulse bg-neutral-200" />
        <div className="mx-auto -mt-24 max-w-6xl px-8">
          <div className="h-44 animate-pulse rounded-[32px] bg-neutral-100 shadow-sm" />
        </div>
      </div>
    )
  }

  const verified = host?.certificates?.[0] === 'certified'
  const fullName = host?.fullName || 'Wondrr'
  const shareUrl = `https://wondrr.in/${id}`

  return (
    <>
      <div className="relative w-full">
        {/* ── Immersive banner ── */}
        <div className="relative h-[320px] w-full ">
          <MyImage
            src="/assets/png/banner.png"
            alt="Host cover"
            className="h-full w-full"
            objectFit="cover"
          />
          {/* Darken top for controls, fade bottom into the page's cream bg */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-[#FFF9F4]" />

          {/* Travel decoration — dashed flight path arching across the banner */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
            viewBox="0 0 1440 420"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M -40 300 Q 480 60 760 180 T 1480 120"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          </svg>
          <AirplaneTiltIcon
            size={34}
            weight="fill"
            className="absolute right-[18%] top-[26%] -rotate-[18deg] text-white drop-shadow-md"
          />
        </div>

        {/* ── Boarding-pass profile card (overlaps banner) ── */}
        <div className="mx-auto -mt-20 max-w-6xl px-8">
          <div className="relative flex flex-col items-center gap-6 rounded-[32px] bg-white p-8 shadow-[0_20px_60px_-25px_rgba(27,67,50,0.4)] sm:flex-row sm:items-end sm:gap-8">           
            {/* Avatar pokes up into the banner */}
            <div className="-mt-24 shrink-0 sm:-mt-28">
              <Avatar className="h-36 w-36 border-[5px] border-white shadow-lg ring-1 ring-neutral-100">
                {host?.avatar ? <AvatarImage src={host.avatar} alt={fullName} /> : null}
                <AvatarFallback name={fullName}>
                  {fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Identity */}
            <div className="flex flex-1 flex-col items-center gap-2 sm:items-start">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                {/* Visual name only — canonical H1 is server-rendered in the layout. */}
                <p className="text-3xl font-bold leading-tight tracking-tight text-neutral-900">
                  {fullName}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-medium text-neutral-500 sm:justify-start">
                <span>@{host?.username || id}</span>
                {verified && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#E8F5EE] px-3 py-1.5">
                    <ShieldCheckIcon size={15} weight="fill" className="text-[#43A047]" />
                    <span className="text-xs font-semibold tracking-tight text-[#1B4332]">
                      Wondrr Verified
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* Boarding-pass "stub" CTA */}
            <div className="flex shrink-0 flex-col items-center gap-2 sm:w-36">
              <button
                onClick={() => setShareOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#143728]"
              >
                <ShareNetworkIcon size={18} weight="bold" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title={'@' + (host?.username || 'Host Profile') + "'s Trips"}
        url={shareUrl}
        utmMedium="host_profile_desktop"
      />
    </>
  )
}

export default HostHeroDesktop
