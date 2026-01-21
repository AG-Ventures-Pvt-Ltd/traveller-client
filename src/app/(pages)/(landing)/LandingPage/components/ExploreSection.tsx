'use client'
import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ExploreSectionProps {
  content: {
    badge: string
    title: string
    subtitle: string
    cta: string
  }
}

const ExploreSection: React.FC<ExploreSectionProps> = ({ content }) => {
  const router = useRouter()

  return (
    <section className="flex flex-col justify-center mx-[4%] md:mx-[6%]">
      {/* Mobile Layout */}
      <div className="md:hidden w-full max-w-[1520px] px-5 py-12 flex flex-col justify-center items-center gap-8">
        <header className="w-full flex flex-col justify-center items-start gap-6">
          <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex justify-center items-center">
            <span className="text-neutral-900 text-sm font-medium">{content.badge}</span>
          </div>
          
          <div className="w-full max-w-[500px] flex flex-col justify-start items-start">
            <h2 className="text-xl font-medium leading-7">
              <span className="text-neutral-900">{content.title}<br /></span>
              <span className="text-neutral-700">{content.subtitle}</span>
            </h2>
          </div>
          
          <div className="pt-px inline-flex justify-center items-center">
            <button 
              className="px-7 py-3 bg-neutral-900 rounded-full hover:bg-neutral-800 hover:scale-105 transition-transform cursor-pointer"
              onClick={() => router.push('/trips')}
              aria-label="Start your trip and explore destinations"
            >
              <span className="text-white text-sm font-semibold">{content.cta}</span>
            </button>
          </div>
        </header>
        
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <article className="w-full h-72 p-6 relative rounded-3xl flex flex-col justify-center items-center overflow-hidden group">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/png/S22.jpg"
                alt="Real moments from our guided tours showing travelers enjoying scenic spots"
                width={353}
                height={292}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30 rounded-3xl" />
            </div>
            
            <div className="w-full flex-1 flex flex-col justify-end items-start relative z-10">
              <div className="w-full inline-flex justify-between items-end gap-10">
                <div className="flex-1">
                  <p className="text-white text-xl font-semibold leading-7">
                    See real moments<br />from our trips.
                  </p>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center" aria-hidden="true">
                  <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                </div>
              </div>
            </div>
          </article>
          
          <article className="w-full h-72 flex flex-col justify-start items-center gap-3">
            <div className="w-full flex-1 p-6 relative rounded-3xl flex flex-col justify-start items-end overflow-hidden group">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/png/S23.jpg"
                  alt="Scenic nature path through golden landscapes and quiet valleys"
                  fill
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/0 rounded-3xl" />
              </div>
              
              
            </div>
            
            <div className="w-full">
              <p className="text-neutral-700 text-lg font-medium leading-6">
                From Himalayan valleys to desert trails, explore curated routes designed for unforgettable group travel experiences.
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between gap-16 px-9 py-24 w-full">
        <header className="flex flex-col gap-6 flex-1">
          <div className="px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start">
            <span className="text-neutral-900 text-sm font-medium">{content.badge}</span>
          </div>

          <h2 className="text-3xl font-medium leading-tight">
            <span className="text-neutral-900">{content.title} </span>
            <span className="text-neutral-700">{content.subtitle}</span>
          </h2>

          <div className="flex items-center gap-2">
            <button 
              className="px-6 py-3 bg-neutral-900 text-white rounded-full font-bold hover:bg-neutral-800 hover:scale-105 transition-transform cursor-pointer" 
              onClick={() => router.push('/trips')}
              aria-label="Start your trip and explore destinations"
            >
              {content.cta}
            </button>
            <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white" aria-hidden="true">
              <ArrowUpRight />
            </div>
          </div>
        </header>

        <div className="flex gap-3 flex-2">
          <div className="flex flex-col gap-3 flex-[1]">
            <article className="relative p-6 bg-cover bg-center rounded-3xl overflow-hidden min-h-[292px] group">
              <Image
                src="/png/S22.jpg"
                alt="Real moments from our guided tours showing travelers enjoying scenic spots"
                width={400}
                height={488}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/32 rounded-3xl" />
              
              <div className="relative flex flex-col justify-end h-full gap-4">
                <p className="text-white text-lg font-bold">
                  See real moments<br />from our trips.
                </p>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center self-end" aria-hidden="true">
                  <ArrowUpRight />
                </div>
              </div>
            </article>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <article className="relative p-6 bg-cover bg-center rounded-3xl overflow-hidden flex-1 group">
              <Image
                src="/png/S23.jpg"
                alt="Scenic nature path through golden landscapes and quiet valleys"
                fill
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/32 to-transparent rounded-3xl" />
            </article>
            
            <div className="flex flex-col gap-2">
              <p className="text-neutral-700 text-base font-medium">
                From Himalayan valleys to desert trails, explore curated routes designed for unforgettable group travel experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExploreSection
