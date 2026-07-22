'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  ShareNetworkIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  SuitcaseRollingIcon,
  CalendarCheckIcon,
} from '@phosphor-icons/react'
import MyImage from '@/common/ui/Image'
import { Avatar, AvatarImage, AvatarFallback } from '@/common/ui/avatar'
import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { ShareModal } from '@/common/components/composites/ShareModal'
import { HostProfile } from '../../../types'

/** Merged hero + about for desktop — wide channel-style banner, avatar below it, identity and trip stats on the page's cream background. */
const HostHeroDesktop = () => {
  const params = useParams()
  const id = params.id as string
  const [shareOpen, setShareOpen] = useState(false)

  const { data: host, isLoading } = useGetData<HostProfile>(API_ENDPOINTS.USER.HOST_PROFILE(id))

  if (isLoading) {
    return (
      <div>
        <div className="h-[300px] w-full animate-pulse bg-neutral-200" />
        <div className="mx-auto max-w-6xl px-8">
          <div className="-mt-16 h-36 w-36 animate-pulse rounded-full border-4 border-background bg-neutral-300" />
          <div className="mt-6 h-44 animate-pulse rounded-3xl bg-neutral-200" />
        </div>
      </div>
    )
  }

  const fullName = host?.fullName || 'Wondrr'
  const verified = host?.certificates?.[0] === 'certified'
  const yearsNum = Number(host?.yearsOfExperience)
  const years = Number.isFinite(yearsNum) && yearsNum > 0 ? yearsNum : null
  const bio = host?.bio?.trim()
  const shareUrl = `https://wondrr.in/${id}`

  // Fallback bio stitched from available fields — keeps the section descriptive
  // (and indexable) even when the host hasn't written an about.
  const fallbackBio =
    `${fullName} is a verified travel host on Wondrr` +
    (years ? ` with ${years}+ year${years > 1 ? 's' : ''} of experience leading group trips` : '') +
    `. Explore their upcoming and past trips below and book directly on Wondrr.`

  const stats = [
    { label: 'Trips hosted', value: host?.totalTrips ?? 0, icon: SuitcaseRollingIcon, tint: '#E2F4A6' },
    { label: 'Upcoming batches', value: host?.upcomingBatches ?? 0, icon: CalendarCheckIcon, tint: '#FFD976' },
  ]

  return (
    <>
      <section>
        {/* Wide channel-style banner */}
        <div className="relative h-[300px] w-full">
          <MyImage
            src={host?.banner || '/assets/png/banner.png'}
            alt="Host cover"
            className="h-full w-full"
            objectFit="cover"
            sizes="100vw"
            priority
          />
        </div>

        <div className="mx-auto max-w-6xl px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <div className="min-w-0 flex-1">
              <Avatar className="-mt-16 h-36 w-36 border-4 border-background shadow-lg">
                {host?.avatar ? <AvatarImage src={host.avatar} alt={fullName} /> : null}
                <AvatarFallback name={fullName}>
                  {fullName.split(' ').map((n) => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='mt-3 text-lg font-medium flex items-center gap-8'>
              <span>@{host?.username || id}</span>
              {verified && (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#EEA0FF] px-3 py-1.5">
                    <ShieldCheckIcon size={15} weight="fill" className="text-black" />
                    <span className="text-xs font-bold text-black">Wondrr Verified</span>
                  </span>
                )}
              </div>
              {/* Visual name only — canonical H1 is server-rendered in the layout. */}
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="text-[38px] font-bold leading-none tracking-tight text-maintext">{fullName}</p>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-subtext">
                {years && (
                  <span className="inline-flex items-center gap-1.5">
                    <BriefcaseIcon size={15} weight="fill" />
                    {years}+ {years > 1 ? 'years' : 'year'} hosting
                  </span>
                )}
              </div>

              <p className="mt-5 max-w-2xl whitespace-pre-line text-[15px] leading-7 text-subtext">
                {bio || fallbackBio}
              </p>
            </div>

            {/* Stats + share — sits alongside the identity block on wide screens */}
            <div className="flex shrink-0 flex-col gap-3 lg:mt-8 lg:w-[220px]">
              <div className="flex gap-3 lg:flex-col">
                {stats.map(({ label, value, icon: Icon, tint }) => (
                  <div
                    key={label}
                    className="flex flex-1 items-center gap-3.5 rounded-3xl px-5 py-4"
                    style={{ backgroundColor: tint }}
                  >
                    <Icon size={22} weight="duotone" className="shrink-0 text-maintext" />
                    <div className="min-w-0">
                      <p className="text-2xl font-bold leading-none text-maintext">{value}</p>
                      <p className="mt-1.5 whitespace-nowrap text-xs font-semibold text-maintext/70">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShareOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#EEA0FF] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-95"
              >
                <ShareNetworkIcon size={17} weight="bold" />
                Share profile
              </button>
            </div>
          </div>
        </div>
      </section>

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
