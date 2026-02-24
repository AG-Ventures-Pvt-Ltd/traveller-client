'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import ArrowButton from '@/common/ui/Buttons/ArrowButton'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
    question: string
    answer: string
}

interface FAQSectionProps {
    content: {
        title: string
        subtitle: string
        questions: FAQItem[]
        helpCard: {
            text: string
            answer: string
            cta: string
        }
    }
}

const FAQSection: React.FC<FAQSectionProps> = ({ content }) => {
    const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null)

    const toggleFaq = (index: number) => {
        setExpandedFaqIndex(expandedFaqIndex === index ? null : index)
    }

    const router = useRouter()

    return (
        <section className="flex flex-col gap-6 md:gap-10 px-5 md:px-40 py-12 md:py-24 w-full" aria-labelledby="faq-heading">
            <motion.header
                className="flex flex-col md:flex-row gap-4"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="px-4 py-2 bg-zinc-100 rounded-full inline-flex items-center self-start">
                    <span className="text-neutral-900 text-sm font-medium">FAQ</span>
                </div>
                <h2 id="faq-heading" className="text-2xl md:text-3xl lg:text-4xl font-medium w-full md:w-[60%]">
                    <span className="text-neutral-900">{content.title}<br/> </span>
                    <span className="text-neutral-700">{content.subtitle}</span>
                </h2>
            </motion.header>

            <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
                <div className="flex flex-col gap-6 md:gap-10 flex-1 order-1 lg:order-2">
                    <div className="flex flex-col gap-3 md:gap-4">
                        {content.questions.map((item, idx) => (
                            <motion.article
                                key={idx}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                                className="p-4 md:p-6 bg-neutral-50 rounded-2xl md:rounded-3xl cursor-pointer hover:bg-neutral-100 transition-colors"
                                onClick={() => toggleFaq(idx)}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-neutral-900 text-base md:text-lg font-bold">
                                        {item.question}
                                    </h3>
                                    <motion.button
                                        className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0"
                                        animate={{ rotate: expandedFaqIndex === idx ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        aria-expanded={expandedFaqIndex === idx}
                                        aria-label={expandedFaqIndex === idx ? 'Collapse answer' : 'Expand answer'}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.button>
                                </div>
                                <AnimatePresence initial={false}>
                                    {expandedFaqIndex === idx && (
                                        <motion.div
                                            key="answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-neutral-700 text-sm md:text-base font-medium mt-3">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.article>
                        ))}
                    </div>
                </div>

                <motion.aside
                    className="flex-1 w-full lg:max-w-md order-2 lg:order-1"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <article className="relative p-6 md:p-8 bg-cover bg-center rounded-2xl md:rounded-3xl overflow-hidden min-h-[300px] md:min-h-[450px] flex flex-col justify-end cursor-pointer group">
                        <Image
                            src="/png/S31.jpg"
                            alt="Contact support - Get help with your questions"
                            width={400}
                            height={450}
                            className="absolute inset-0 w-full h-full object-cover -z-10 transition-transform duration-500 group-hover:scale-110"
                            quality={90}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-2xl md:rounded-3xl" />
                        <div className="relative flex flex-col">
                            <h3 className="text-white text-lg md:text-xl font-semibold leading-tight">
                                {content.helpCard.text}
                            </h3>
                            <p className="mb-4 text-white text-sm md:text-base">
                                {content.helpCard.answer}
                            </p>
                            <ArrowButton onClick={() => router.push('/contact')}>
                                {content.helpCard.cta}
                            </ArrowButton>
                        </div>
                    </article>
                </motion.aside>
            </div>
        </section>
    )
}

export default FAQSection
