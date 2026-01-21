'use client'
import React, { useState } from 'react'
import Image from 'next/image'

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

    return (
        <section className="flex flex-col gap-6 md:gap-10 px-5 md:px-9 py-12 md:py-24 w-full" aria-labelledby="faq-heading">
            <header className="flex flex-col md:flex-row gap-4">
                <div className="px-4 py-2 bg-zinc-100 rounded-full inline-flex items-center self-start">
                    <span className="text-neutral-900 text-sm font-medium">FAQ</span>
                </div>

                <h2 id="faq-heading" className="text-2xl md:text-3xl lg:text-4xl font-medium w-full md:w-[60%]">
                    <span className="text-neutral-900">{content.title}<br/> </span>
                    <span className="text-neutral-700">{content.subtitle}</span>
                </h2>
            </header>
            <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
                <div className="flex flex-col gap-6 md:gap-10 flex-1 order-1 lg:order-2">
                    <div className="flex flex-col gap-3 md:gap-4">
                        {content.questions.map((item, idx) => (
                            <article
                                key={idx}
                                className="p-4 md:p-6 bg-neutral-50 rounded-2xl md:rounded-3xl cursor-pointer hover:bg-neutral-100 transition-colors"
                                onClick={() => toggleFaq(idx)}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-neutral-900 text-base md:text-lg font-bold">
                                        {item.question}
                                    </h3>
                                    <button
                                        className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0 transition-transform ${expandedFaqIndex === idx ? 'rotate-180' : ''
                                            }`}
                                        aria-expanded={expandedFaqIndex === idx}
                                        aria-label={expandedFaqIndex === idx ? 'Collapse answer' : 'Expand answer'}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                {expandedFaqIndex === idx && (
                                    <p className="text-neutral-700 text-sm md:text-base font-medium mt-3">
                                        {item.answer}
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
                <aside className="flex-1 w-full lg:max-w-md order-2 lg:order-1">
                    <article className="relative p-6 md:p-8 bg-cover bg-center rounded-2xl md:rounded-3xl overflow-hidden min-h-[300px] md:min-h-[450px] flex flex-col justify-end cursor-pointer transition-transform group">
                        <Image
                            src="/png/S31.jpg"
                            alt="Contact support - Get help with your questions"
                            width={400}
                            height={450}
                            className="absolute inset-0 w-full h-full object-cover -z-10 transition-transform duration-300 group-hover:scale-105"
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
                            <button
                                className="px-4 md:px-6 py-2.5 md:py-3 bg-white text-neutral-900 rounded-full font-bold self-start hover:bg-neutral-100 hover:scale-105 transition-transform cursor-pointer text-sm md:text-base"
                                aria-label="Contact our support team"
                            >
                                {content.helpCard.cta}
                            </button>
                        </div>
                    </article>
                </aside>
            </div>
        </section>
    )
}

export default FAQSection
