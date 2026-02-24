'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { WHO_ITS_BUILT_FOR } from '../constants'

const WhoItsBuiltForSection = () => {
  const OperatorIcon = WHO_ITS_BUILT_FOR.operators.icon
  const TravelerIcon = WHO_ITS_BUILT_FOR.travelers.icon

  return (
    <section className="flex flex-col px-4 sm:px-8 lg:px-32 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-white border-b-2 border-gray-200">
      <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
        {/* Section Header */}
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h2 className="text-neutral-900 text-3xl sm:text-4xl lg:text-5xl font-bold font-['Satoshi'] leading-tight lg:leading-[52.80px]">
            {WHO_ITS_BUILT_FOR.title}
          </h2>
          <p className="text-neutral-700 text-base sm:text-lg lg:text-xl font-medium font-['Satoshi'] leading-6 sm:leading-7 lg:leading-8 mt-2 sm:mt-4">
            {WHO_ITS_BUILT_FOR.subtitle}
          </p>
        </motion.header>

        {/* Hero Images */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          {WHO_ITS_BUILT_FOR.images.map((image, index) => (
            <motion.div
              key={index}
              className="relative flex-1 h-48 sm:h-56 lg:h-72 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden group"
              initial={{ opacity: 0, x: index === 0 ? -32 : 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: index * 0.12 }}
            >
              <Image
                className="w-full h-full rounded-3xl object-cover transition-transform duration-500 group-hover:scale-110"
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: 'cover' }}
                quality={90}
              />
            </motion.div>
          ))}
        </div>

        {/* User Cards */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Operators Card */}
          <motion.article
            className="flex-1 p-6 sm:p-8 bg-gradient-to-b from-neutral-900 to-zinc-800 rounded-2xl sm:rounded-3xl"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ y: -4 }}
          >
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <OperatorIcon className="text-neutral-900" size={28} aria-hidden="true" />
            </div>

            {/* Title */}
            <h3 className="text-white text-xl sm:text-2xl font-bold font-['Satoshi'] leading-7 sm:leading-8 mb-3 sm:mb-4">
              {WHO_ITS_BUILT_FOR.operators.title}
            </h3>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base font-medium font-['Satoshi'] leading-5 sm:leading-6 mb-4 sm:mb-6">
              {WHO_ITS_BUILT_FOR.operators.description}
            </p>

            {/* Features List */}
            <ul className="space-y-2 sm:space-y-3">
              {WHO_ITS_BUILT_FOR.operators.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 text-white/90 text-sm sm:text-base font-medium font-['Satoshi']"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 + index * 0.07 }}
                >
                  <span className="text-white mt-1">•</span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.article>

          {/* Travelers Card */}
          <motion.article
            className="flex-1 p-6 sm:p-8 bg-gradient-to-b from-neutral-50 to-gray-200 rounded-2xl sm:rounded-3xl"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <TravelerIcon className="text-white" size={28} aria-hidden="true" />
            </div>

            {/* Title */}
            <h3 className="text-neutral-900 text-xl sm:text-2xl font-bold font-['Satoshi'] leading-7 sm:leading-8 mb-3 sm:mb-4">
              {WHO_ITS_BUILT_FOR.travelers.title}
            </h3>

            {/* Description */}
            <p className="text-neutral-700 text-sm sm:text-base font-medium font-['Satoshi'] leading-5 sm:leading-6 mb-4 sm:mb-6">
              {WHO_ITS_BUILT_FOR.travelers.description}
            </p>

            {/* Features List */}
            <ul className="space-y-2 sm:space-y-3">
              {WHO_ITS_BUILT_FOR.travelers.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 text-neutral-900 text-sm sm:text-base font-medium font-['Satoshi']"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 + index * 0.07 }}
                >
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

export default WhoItsBuiltForSection
