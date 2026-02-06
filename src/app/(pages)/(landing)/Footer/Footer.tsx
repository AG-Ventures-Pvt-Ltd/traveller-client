'use client'

import React from 'react'
import Image from 'next/image'

const Footer = () => {

    const CONTENT = {
        footer: {
            tagline: 'Building trust in group travel.',
            sections: [
                {
                    title: 'Explore',
                    links: [
                        { label: 'Trips', href: '/trips' },
                        { label: 'About Us', href: '/about' }
                    ]
                },
                {
                    title: 'Company',
                    links: [
                        { label: 'Partner With Us', href: '/partner-with-us' },
                    ]
                },
                {
                    title: 'Support',
                    links: [
                        { label: 'Privacy Policy', href: '/privacy-policy' },
                        { label: 'Refund Policy', href: '/booking-policy' }
                    ]
                },
                {
                    title: 'Contact',
                    links: [
                        { label: 'support@wondrr.in', href: 'mailto:support@wondrr.in' },
                        { label: '+91-8217728508', href: 'tel:+91-8217728508' },
                        { label: '+91-9151315550', href: 'tel:+91-9151315550' }
                    ]
                }
            ],
            social: [{ label: 'Instagram', href: 'https://instagram.com/wondrr.in' }],
            copyright: '© 2026 Wondrr. All rights reserved.'
        }
    }
    return (
        <footer className="flex flex-col gap-8 md:gap-12 pt-10 md:pt-16 pb-8 md:pb-8 w-full bg-neutral-900 border-t border-neutral-800">
            <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-16 px-5 md:px-9 max-w-[1520px] w-full mx-auto">
                <div className="flex flex-col gap-4 md:gap-6 flex-1 max-w-full lg:max-w-sm px-6 md:px-0">
                    <h3 className="text-2xl md:text-3xl font-black text-white">Wondrr</h3>
                    <p className="text-neutral-300 text-sm md:text-base font-medium">
                        {CONTENT.footer.tagline}
                    </p>
                    <div className="flex gap-3">
                        {CONTENT.footer.social.map((platform) => (
                            <a key={platform.label} href={platform.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                                <Image src='/svg/instagram.svg' width={30} height={30} quality={90} alt='instagram' />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-8 md:gap-12 lg:gap-16 flex-1 justify-between px-6 md:px-0 lg:justify-end">
                    {CONTENT.footer.sections.map((section) => (
                        <div key={section.title} className="flex flex-col gap-3 md:gap-4 min-w-[120px]">
                            <h4 className="text-white text-xs md:text-sm font-bold uppercase tracking-wide">
                                {section.title}
                            </h4>
                            <ul className="flex flex-col gap-2 md:gap-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-neutral-400 text-sm md:text-base font-medium hover:text-white transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6 md:pt-8 border-t border-neutral-800 px-5 md:px-9 max-w-[1520px] w-full mx-auto">
                <p className="text-neutral-400 text-xs md:text-sm font-medium text-center">
                    {CONTENT.footer.copyright}
                </p>
            </div>
        </footer>
    )
}

export default Footer
