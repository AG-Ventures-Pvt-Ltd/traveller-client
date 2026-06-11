'use client'

import { useParams } from 'next/navigation'
import { BriefcaseIcon, MapPinIcon, SuitcaseRollingIcon, CalendarCheckIcon } from '@phosphor-icons/react'
import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { HostProfile } from '../types'

interface AboutHostProps {
  className?: string
}

/**
 * "About the host" section — shared by mobile + desktop, rendered last (after
 * trips) in the page's priority order. Surfaces who the host is: bio, years of
 * experience, where they're based, plus the trip/batch counts moved down from
 * the hero. Every field is optional on the API, so each block has a graceful
 * fallback and the section still renders crawlable copy for SEO/GEO.
 */
const AboutHost = ({ className }: AboutHostProps) => {
  const params = useParams()
  const id = params.id as string

  // Same query key as the hero — react-query dedupes, so this is not a 2nd fetch.
  const { data: host } = useGetData<HostProfile>(API_ENDPOINTS.USER.HOST_PROFILE(id))

  const name = host?.fullName?.trim() || `@${id}`
  const location = [host?.city, host?.state].filter(Boolean).join(', ')
  const yearsNum = Number(host?.yearsOfExperience)
  const years = Number.isFinite(yearsNum) && yearsNum > 0 ? yearsNum : null
  const bio = host?.bio?.trim()

  // Fallback bio stitched from whatever fields are available — keeps the section
  // descriptive (and indexable) even when the host hasn't written an about.
  const fallbackBio =
    `${name} is a verified travel host on Wondrr` +
    (location ? `, based in ${location}` : '') +
    (years ? ` with ${years}+ year${years > 1 ? 's' : ''} of experience leading group trips` : '') +
    `. Explore their upcoming and past trips above and book directly on Wondrr.`

  const stats = [
    { label: 'Trips hosted', value: host?.totalTrips ?? 0, icon: SuitcaseRollingIcon },
    { label: 'Upcoming batches', value: host?.upcomingBatches ?? 0, icon: CalendarCheckIcon },
    // { label: 'Overall rating', value: host?.rating ?? 0, icon: StarIcon },
    // { label: 'Total reviews', value: host?.totalReviews ?? 0, icon: ChatCircleIcon },
  ]

  return (
    <section
      aria-label={`About ${name}`}
      className={`rounded-3xl bg-white p-6 shadow-sm sm:p-10 ${className || ''}`}
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
        {/* Bio + who they are */}
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#1B4332]">
            Meet your host
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl">
            About {name}
          </h2>

          <p className="mt-5 max-w-2xl whitespace-pre-line text-[15px] font-medium leading-7 text-neutral-600 sm:text-base">
            {bio || fallbackBio}
          </p>

          {(years || location) && (
            <dl className="mt-7 flex flex-col gap-5 sm:flex-row sm:gap-12">
              {years && (
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F5EE]">
                    <BriefcaseIcon size={20} weight="fill" className="text-[#1B4332]" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium text-neutral-500">Experience</dt>
                    <dd className="text-base font-bold text-neutral-900">
                      {years}+ {years > 1 ? 'years' : 'year'}
                    </dd>
                  </div>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F5EE]">
                    <MapPinIcon size={20} weight="fill" className="text-[#1B4332]" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium text-neutral-500">Based in</dt>
                    <dd className="text-base font-bold text-neutral-900">{location}</dd>
                  </div>
                </div>
              )}
            </dl>
          )}
        </div>

        {/* Trip stats moved down from the hero */}
        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-auto">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl bg-[#FFF9F4] px-5 py-4 sm:min-w-[180px] lg:min-w-[220px]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <Icon size={22} weight="duotone" className="text-[#1B4332]" />
              </span>
              <div className="min-w-0">
                <p className="text-2xl font-bold leading-none text-neutral-900">{value}</p>
                <p className="mt-1 text-xs font-medium text-neutral-500 whitespace-nowrap">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutHost
