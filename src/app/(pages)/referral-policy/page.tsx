'use client'

import React, { useState, useEffect } from 'react'
import BackButton from "@/common/ui/BackButton"
import { Gift, Users, Calendar, Award, Shield, AlertTriangle } from 'lucide-react'
import { REFERRAL_POLICY_SECTIONS, REFERRAL_POLICY_CONTENT } from './constants'

export default function ReferralPolicy() {
    const [activeSection, setActiveSection] = useState('')

    const sections = REFERRAL_POLICY_SECTIONS

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = sections.map(section => ({
                id: section.id,
                element: document.getElementById(section.id)
            }))

            const currentSection = sectionElements.find(({ element }) => {
                if (element) {
                    const rect = element.getBoundingClientRect()
                    return rect.top <= 150 && rect.bottom >= 150
                }
                return false
            })

            if (currentSection) {
                setActiveSection(currentSection.id)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const offset = 100
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <BackButton className="mb-6" />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="lg:sticky lg:top-24 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">Navigation</h3>
                            <nav className="space-y-1">
                                {sections.map((section) => {
                                    const Icon = section.icon
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeSection === section.id
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4 flex-shrink-0" />
                                            <span className="truncate">{section.title}</span>
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                        <div id="overview">
                            <h1 className="text-4xl font-bold mb-4 text-gray-900">{REFERRAL_POLICY_CONTENT.title}</h1>
                            <p className="text-sm text-gray-600 mb-6"><strong>Last Updated: {REFERRAL_POLICY_CONTENT.lastUpdated}</strong></p>

                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                                <p className="text-gray-800">
                                    {REFERRAL_POLICY_CONTENT.overview.description}
                                </p>
                            </div>
                        </div>

                        <hr className="my-8" />

                        {/* Section 1 - Definitions */}
                        <section id="definitions" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                1. Definitions
                            </h2>

                            <div className="space-y-4">
                                {REFERRAL_POLICY_CONTENT.definitions.map((def, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                        <p className="mb-2"><strong className="text-gray-900">&quot;{def.term}&quot;</strong> {def.definition}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <hr className="my-8" />

                        {/* Section 2 - Eligibility */}
                        <section id="eligibility" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                2. {REFERRAL_POLICY_CONTENT.eligibility.title}
                            </h2>

                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.eligibility.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <hr className="my-8" />

                        {/* Section 3 - Referral Benefits */}
                        <section id="benefits" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                3. {REFERRAL_POLICY_CONTENT.benefits.title}
                            </h2>

                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.benefits.items.map((item, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </section>

                        <hr className="my-8" />

                        {/* Section 4 - Success Criteria */}
                        <section id="criteria" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                4. {REFERRAL_POLICY_CONTENT.criteria.title}
                            </h2>

                            <p className="mb-4"><strong>A referral shall be deemed successful only when:</strong></p>
                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.criteria.conditions.map((condition, index) => (
                                    <li key={index}>{condition}</li>
                                ))}
                            </ul>

                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.criteria.additionalItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <hr className="my-8" />

                        {/* Section 5 - Time Window */}
                        <section id="timewindow" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                5. {REFERRAL_POLICY_CONTENT.timeWindow.title}
                            </h2>

                            <p className="mb-4"><strong>{REFERRAL_POLICY_CONTENT.timeWindow.highlight}</strong></p>

                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.timeWindow.items.map((item, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </section>

                        <hr className="my-8" />

                        {/* Section 6 - Reward Structure */}
                        <section id="reward" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                6. {REFERRAL_POLICY_CONTENT.reward.title}
                            </h2>

                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.reward.items.map((item, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </section>

                        <hr className="my-8" />

                        {/* Section 7 - Redemption */}
                        <section id="redemption" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                7. {REFERRAL_POLICY_CONTENT.redemption.title}
                            </h2>

                            <p className="mb-4"><strong>{REFERRAL_POLICY_CONTENT.redemption.highlight}</strong></p>

                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.redemption.items.map((item, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </section>

                        <hr className="my-8" />

                        {/* Section 8 - Verification */}
                        <section id="verification" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                8. {REFERRAL_POLICY_CONTENT.verification.title}
                            </h2>

                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.verification.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <hr className="my-8" />

                        {/* Section 9 - Processing */}
                        <section id="processing" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                9. {REFERRAL_POLICY_CONTENT.processing.title}
                            </h2>

                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.processing.items.map((item, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </section>

                        <hr className="my-8" />

                        {/* Section 10 - Transferability */}
                        <section id="transferability" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                10. {REFERRAL_POLICY_CONTENT.transferability.title}
                            </h2>

                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.transferability.items.map((item, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </section>

                        <hr className="my-8" />

                        {/* Section 11 - Fraud */}
                        <section id="fraud" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                11. {REFERRAL_POLICY_CONTENT.fraud.title}
                            </h2>

                            <p className="mb-4"><strong>{REFERRAL_POLICY_CONTENT.fraud.highlight}</strong></p>

                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.fraud.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <hr className="my-8" />

                        {/* Section 12 - Modification */}
                        <section id="modification" className="mb-12 scroll-mt-24">
                            <h2 className="text-2xl font-semibold mb-4">
                                12. {REFERRAL_POLICY_CONTENT.modification.title}
                            </h2>

                            <ul className="list-disc list-inside mb-6 space-y-2">
                                {REFERRAL_POLICY_CONTENT.modification.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <hr className="my-8" />

                        {/* Footer Note */}
                        <p className="mb-6">
                            <strong>{REFERRAL_POLICY_CONTENT.footer.title}</strong><br />
                            {REFERRAL_POLICY_CONTENT.footer.content} <strong>{REFERRAL_POLICY_CONTENT.footer.email}</strong>
                        </p>
                    </main>
                </div>
            </div>
        </div>
    )
}