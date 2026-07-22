'use client'

import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { FilmSlateIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react'
import { useGetData } from '@/services/useGetData'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { HostProfile } from '../../types'

const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL ?? ''

const toVideoSrc = (src: string) => (src.startsWith('/') ? CLOUDFRONT_URL + src : src)

// Native controls give scrubber/volume/fullscreen we don't want — bare video +
// one center button covers play/pause only, state driven off the element's
// own play/pause events so it can't drift out of sync.
const ReelVideoCard = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? 'Pause video' : 'Play video'}
      className="relative block aspect-[9/16] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm"
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="h-full w-full object-cover"
      />
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          isPlaying ? 'pointer-events-none opacity-0' : 'bg-black/10 opacity-100'
        }`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm">
          {isPlaying ? (
            <PauseIcon size={20} weight="fill" className="text-white" />
          ) : (
            <PlayIcon size={20} weight="fill" className="ml-0.5 text-white" />
          )}
        </span>
      </span>
    </button>
  )
}

interface ReelsSectionProps {
  variant?: 'mobile' | 'desktop'
}

// Shared mobile + desktop section (same pattern as AboutHost) — native <video>
// tags fed by the host's own uploaded clips (partner portal), horizontal
// scroll on small screens, 3-col grid once there's room. Hidden entirely when
// the host hasn't uploaded any, since this is real per-host content now — the
// outer spacing/width lives here (not in the parent) so an empty host leaves
// zero blank gap instead of a hollow padded wrapper.
const ReelsSection = ({ variant = 'mobile' }: ReelsSectionProps) => {
  const params = useParams()
  const id = params.id as string

  // Same query key as the hero/AboutHost — react-query dedupes, not a 2nd fetch.
  const { data: host } = useGetData<HostProfile>(API_ENDPOINTS.USER.HOST_PROFILE(id))
  const videos = host?.profileVideos ?? []

  if (videos.length === 0) return null

  return (
    <section
      aria-label="Host videos"
      className={variant === 'desktop' ? 'mx-auto mt-20 max-w-6xl px-4 sm:px-8' : 'pt-10 pb-2'}
    >
      <div className="px-4 sm:px-0">
        <h2 className="mt-2 text-lg font-medium leading-tight text-neutral-900 sm:text-3xl lg:text-3xl">
          Traveller Reels
        </h2>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
        {videos.map((src) => (
          <div key={src} className="w-[200px] shrink-0 sm:mx-auto sm:w-[220px]">
            <ReelVideoCard src={toVideoSrc(src)} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ReelsSection
