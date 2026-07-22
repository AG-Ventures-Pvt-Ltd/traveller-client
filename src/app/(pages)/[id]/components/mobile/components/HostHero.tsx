'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ShareNetworkIcon, ShieldCheckIcon, SuitcaseRollingIcon, CalendarCheckIcon } from '@phosphor-icons/react'
import MyImage from '@/common/ui/Image'
import BackButton from '@/common/ui/BackButton'
import { Avatar, AvatarImage, AvatarFallback } from '@/common/ui/avatar'
import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { ShareModal } from '@/common/components/composites/ShareModal'
import { HostProfile } from '../../../types'

/** Merged hero + about for mobile — wide channel-style banner, avatar below it, identity on the page's cream background. Bio skipped for length. */
const HostHero = () => {
  const params = useParams()
  const id = params.id as string
  const [shareOpen, setShareOpen] = useState(false)

  const { data: host, isLoading } = useGetData<HostProfile>(API_ENDPOINTS.USER.HOST_PROFILE(id))

  if (isLoading) {
    return (
      <div>
        <div className="h-[170px] w-full animate-pulse bg-neutral-200" />
        <div className="px-5">
          <div className="-mt-10 h-[84px] w-[84px] animate-pulse rounded-full border-4 border-background bg-neutral-300" />
          <div className="mt-5 h-28 animate-pulse rounded-2xl bg-neutral-200" />
        </div>
      </div>
    )
  }

  const fullName = host?.fullName || 'Wondrr'
  const verified = host?.certificates?.[0] === 'certified'
  const yearsNum = Number(host?.yearsOfExperience)
  const years = Number.isFinite(yearsNum) && yearsNum > 0 ? yearsNum : null
  const shareUrl = `https://wondrr.in/${id}`

  const stats = [
    { label: 'Trips hosted', value: host?.totalTrips ?? 0, icon: SuitcaseRollingIcon, tint: '#E2F4A6' },
    { label: 'Upcoming', value: host?.upcomingBatches ?? 0, icon: CalendarCheckIcon, tint: '#FFD976' },
  ]

  return (
    <>
      <section>
        {/* Wide channel-style banner */}
        <div className="relative h-[170px] w-full">
          <MyImage
            src={host?.banner || '/assets/png/banner.png'}
            alt="Host cover"
            className="h-full w-full"
            objectFit="cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-4">
            <BackButton className="shrink-0" iconSize={20} label="" />
            <button
              onClick={() => setShareOpen(true)}
              aria-label="Share this host profile"
              className="rounded-full bg-[#EEA0FF] p-2.5 text-black active:opacity-80"
            >
              <ShareNetworkIcon size={20} weight="thin" />
            </button>
          </div>
        </div>

        <div className="px-5">
          <Avatar className="-mt-10 h-[84px] w-[84px] border-4 border-background shadow-md">
            {host?.avatar ? <AvatarImage src={host.avatar} alt={fullName} /> : null}
            <AvatarFallback name={fullName}>
              {fullName.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-wrap items-center gap-4'>
            <p className="mt-2 text-[13px] font-medium text-subtext">
              @{host?.username || id}
            </p>
            {verified && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#EEA0FF] px-2.5 py-1">
                <ShieldCheckIcon size={13} weight="fill" className="text-black" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-black">Verified</span>
              </span>
            )}
          </div>
          {/* Visual name only — canonical H1 is server-rendered in the page layout. */}
          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-2">
            <p className="text-[22px] font-bold leading-tight text-maintext">{fullName}</p>
          </div>

          <p className="text-[13px] font-medium text-subtext">
            {years && `${years}+ yrs hosting`}
          </p>

          <div className="mt-5 flex gap-3">
            {stats.map(({ label, value, icon: Icon, tint }) => (
              <div
                key={label}
                className="flex flex-1 items-center gap-2.5 rounded-2xl px-3.5 py-3"
                style={{ backgroundColor: tint }}
              >
                <Icon size={18} weight="duotone" className="shrink-0 text-maintext" />
                <div className="min-w-0">
                  <p className="text-base font-bold leading-none text-maintext">{value}</p>
                  <p className="mt-1 whitespace-nowrap text-[10px] font-semibold text-maintext/70">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title={'@' + (host?.username || 'Host Profile') + "'s Trips"}
        url={shareUrl}
        utmMedium="host_profile_mobile"
      />
    </>
  )
}

export default HostHero
