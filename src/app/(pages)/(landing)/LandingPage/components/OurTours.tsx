'use client'
import React from 'react'
import { ArrowUpRight, IndianRupee } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MyImage from '@/common/ui/Image'
import ArrowButton from '@/common/ui/Buttons/ArrowButton'
import './OurTours.css'
import { useFeaturedTrips } from '@/common/hooks/useFeaturedTrips'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 },
  }),
}

const OurTours = () => {
  const router = useRouter()
  const { data, isLoading } = useFeaturedTrips()

  const handleTripClick = (tripSlug: string) => {
    router.push(`/trip/${tripSlug}`)
  }

  const handleSeeAllClick = () => {
    router.push('/trips')
  }

  return (
    <section className="flex flex-col gap-6 sm:gap-8 sm:px-6 lg:px-24 py-12 sm:py-16 lg:py-24 w-full">
      <motion.div
        className="flex flex-col gap-4 sm:gap-6 pl-6 sm:pl-0"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="px-3 sm:px-4 py-2 bg-neutral-50 rounded-full inline-flex items-center self-start">
          <span className="text-neutral-900 text-xs sm:text-sm font-medium">Our Trips</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-neutral-900 sm:ml-0 lg:ml-16">
            Find Your Perfect
            <br />
            Group Trip Experience
          </h2>
          <ArrowButton onClick={handleSeeAllClick}>
            See All Group Trips
          </ArrowButton>
        </div>
      </motion.div>
      <motion.div
        className="flex gap-2 sm:gap-3 lg:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory ml-[4%] lg:px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[200px] sm:min-h-[400px] lg:min-h-[488px] flex-shrink-0 w-[42%] sm:w-[28%] lg:w-[28%] flex flex-col cursor-pointer snap-start group animate-pulse bg-neutral-100"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-neutral-200 rounded-full self-end m-4" />
              <div className="relative space-y-2 p-4 mt-auto">
                <div className="h-4 sm:h-6 bg-neutral-200 rounded w-3/4" />
                <div className="h-4 sm:h-6 bg-neutral-200 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : (
          <>
            {data?.map((trip, i) => (
              <motion.div
                key={trip.tripSlug}
                custom={i}
                variants={cardVariants}
                onClick={() => handleTripClick(trip.tripSlug)}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[200px] sm:min-h-[400px] lg:min-h-[488px] flex-shrink-0 w-[42%] sm:w-[28%] lg:w-[28%] flex flex-col cursor-pointer snap-start group"
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                  <MyImage
                    src={trip.image || 'https://placehold.co/400x488'}
                    alt={trip.title}
                    className="w-full h-full"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/65 rounded-2xl sm:rounded-3xl" />
                <div className="relative p-4 sm:p-6 flex flex-col justify-between h-full">
                  <motion.div
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center self-end hover:bg-neutral-100"
                    whileHover={{ scale: 1.15, rotate: 15 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <ArrowUpRight size={14} className="sm:w-5 sm:h-5" />
                  </motion.div>
                  <div className='pt-26 px-2'>
                    <h3 className="text-white text-base sm:text-lg font-bold">{trip.title}</h3>
                    <div className="flex flex-col sm:flex-row items-baseline gap-1 mt-2">
                      <div className='flex items-center'>
                        <IndianRupee size={14} className='text-white'/>
                        <span className="text-white text-sm sm:text-xl font-bold leading-1">{trip.price}</span>
                      </div>
                      <span className="text-white/90 text-[10px] sm:text-sm font-medium">/ per person</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </section>
  )
}

export default OurTours
