'use client'

import React from 'react'

export const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
  },
})

export const stagger = (gap = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: 0.05 } },
})

export const SectionHead = ({
  eyebrow,
  title,
  highlight,
  highlightColor = '#D0EF65',
  subtitle,
  align = 'center',
}: {
  eyebrow?: string
  title: string
  highlight?: string
  highlightColor?: string
  subtitle?: string
  align?: 'center' | 'left'
}) => (
  <div className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
    {eyebrow && (
      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
        <span className="h-3 w-6 rounded-full bg-[#FFC107]" />
        {eyebrow}
      </span>
    )}
    <h2 className="max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl">
      {title}
      {highlight && (
        <>
          {' '}
          <span className="rounded-xl px-2 py-0.5 text-neutral-900" style={{ backgroundColor: highlightColor }}>
            {highlight}
          </span>
        </>
      )}
    </h2>
    {subtitle && <p className="max-w-2xl text-base text-neutral-500 sm:text-lg">{subtitle}</p>}
  </div>
)

/** Faint dot grid — a clean "dashboard / product" motif for the partner page. */
export const GridDecor = ({ opacity = 0.5 }: { opacity?: number }) => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0"
    style={{
      opacity,
      backgroundImage: 'radial-gradient(circle at 1px 1px, #111 1px, transparent 0)',
      backgroundSize: '26px 26px',
      maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
    }}
  />
)
