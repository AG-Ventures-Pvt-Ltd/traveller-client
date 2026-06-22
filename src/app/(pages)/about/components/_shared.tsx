'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import {
  Anchor,
  Camera,
  Compass,
  Globe2,
  Map,
  MapPin,
  Mountain,
  Palmtree,
  Plane,
  Sun,
  Tent,
  Waves,
} from 'lucide-react'

/** Shared reveal variants so every section animates with one consistent feel. */
export const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  },
})

export const stagger = (gap = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: 0.05 } },
})

/**
 * Section heading block — eyebrow chip + bold title with a lime-marker highlight,
 * keeping the home page's signature underline motif.
 */
export const SectionHead = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string
  title: string
  highlight?: string
  subtitle?: string
  align?: 'center' | 'left'
}) => (
  <div className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
    {eyebrow && (
      <span className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-900 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900">
        <span className="h-2 w-2 rounded-full bg-[#D0EF65]" />
        {eyebrow}
      </span>
    )}
    <h2 className="max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl">
      {title}{' '}
      {highlight && (
        <span className="relative inline-block">
          <span className="absolute inset-x-0 bottom-1 z-0 h-[12px] rounded-sm bg-[#D0EF65]" />
          <span className="relative z-10">{highlight}</span>
        </span>
      )}
    </h2>
    {subtitle && <p className="max-w-2xl text-base text-neutral-500 sm:text-lg">{subtitle}</p>}
  </div>
)

const DECOR = [
  { Icon: Plane, className: 'top-6 left-[6%] w-14 h-14 rotate-[20deg]', anim: 'about-float' },
  { Icon: Compass, className: 'top-10 right-[8%] w-12 h-12 -rotate-6', anim: 'about-float-slow' },
  { Icon: Mountain, className: 'bottom-8 left-[12%] w-12 h-12', anim: 'about-float-slow' },
  { Icon: Globe2, className: 'bottom-10 right-[10%] w-16 h-16 rotate-[10deg]', anim: 'about-float' },
  { Icon: Sun, className: 'top-1/2 left-[2%] w-12 h-12 rotate-45', anim: 'about-float' },
  { Icon: Waves, className: 'bottom-1/3 right-[3%] w-12 h-12', anim: 'about-float-slow' },
  { Icon: Palmtree, className: 'top-1/3 right-[16%] w-10 h-10', anim: 'about-float' },
  { Icon: MapPin, className: 'top-1/4 left-[20%] w-9 h-9', anim: 'about-float-slow' },
  { Icon: Camera, className: 'bottom-6 right-[28%] w-9 h-9 rotate-6', anim: 'about-float' },
  { Icon: Anchor, className: 'top-8 left-[40%] w-9 h-9', anim: 'about-float-slow' },
  { Icon: Tent, className: 'bottom-12 left-[34%] w-9 h-9', anim: 'about-float' },
  { Icon: Map, className: 'top-12 right-[34%] w-8 h-8', anim: 'about-float-slow' },
]

/** Faint, slowly floating travel icons scattered behind a section for atmosphere. */
export const ScatterIcons = ({ opacity = 0.06 }: { opacity?: number }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    {DECOR.map(({ Icon, className, anim }, i) => (
      <Icon
        key={i}
        style={{ opacity }}
        className={`absolute text-neutral-900 ${anim} ${className}`}
      />
    ))}
  </div>
)

/** Counts up to `target` once the element scrolls into view. */
export function useCountUp(target: number, duration = 1500) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  return { ref, value }
}
