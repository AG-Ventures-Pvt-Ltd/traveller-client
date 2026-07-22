'use client'

import React from 'react'
import Image from 'next/image'

const Footer = () => {

    const CONTENT = {
        footer: {
            tagline:
                "Wondrr is a travel marketplace to discover and book fixed-departure group trips from India's top verified travel brands — treks, road trips and adventures, all in one place.",
            sections: [
                // {
                //     title: 'Popular Destinations',
                //     links: [
                //         { label: 'Spiti Valley Trips', href: '/explore/HP' },
                //         { label: 'Ladakh Trips', href: '/explore/LA' },
                //         { label: 'Manali Trips', href: '/explore/HP' },
                //         { label: 'Meghalaya Trips', href: '/explore/ML' },
                //         { label: 'Kashmir Trips', href: '/explore/JK' },
                //         { label: 'Kerala Trips', href: '/explore/KL' },
                //         { label: 'Rajasthan Trips', href: '/explore/RJ' },
                //         { label: 'All Trips', href: '/trips' },
                //     ]
                // },
                // {
                    // title: 'Trip Types',
                    // links: [
                        // { label: 'Weekend Getaways', href: '/trips' },
                        // { label: 'Himalayan Treks', href: '/trips' },
                        // { label: 'Bike Trips', href: '/trips' },
                        // { label: 'All Girls Trips', href: '/trips' },
                        // { label: 'Budget Trips', href: '/trips' },
                        // { label: 'International Tours', href: '/trips' },
                        // { label: 'Backpacking Trips', href: '/trips' },
                    // ]
                // },
                {
                    title: 'Company',
                    links: [
                        { label: 'About Us', href: '/about' },
                        { label: 'Partner With Us', href: '/partner-with-us' },
                        { label: 'Blog', href: '/blog' },
                        { label: 'Privacy Policy', href: '/privacy-policy' },
                        { label: 'Refund Policy', href: '/booking-policy' }
                    ]
                },
                {
                    title: 'Contact',
                    links: [
                        { label: 'support@wondrr.in', href: 'mailto:support@wondrr.in' },
                        { label: '+91-9667427187', href: 'tel:+91-8217728508' },
                        { label: '+91-9151315550', href: 'tel:+91-8629060785' }
                    ]
                }
            ],
            social: [
                { label: 'Instagram', href: 'https://instagram.com/wondrr.in' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/wondrr' }
            ],
            copyright: '© 2026 Wondrr. All rights reserved.'
        }
    }
    return (
        <footer className="flex flex-col gap-8 md:gap-12 pt-10 md:pt-16 pb-8 md:pb-8 w-full bg-neutral-900 border-t border-neutral-800">
            <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-16 px-5 md:px-9 max-w-[1520px] w-full mx-auto">
                <div className="flex flex-col gap-4 md:gap-6 flex-1 max-w-full lg:max-w-sm px-3 md:px-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Wondrr</h3>
                    <p className="text-neutral-300 text-sm md:text-base font-normal">
                        {CONTENT.footer.tagline}
                    </p>
                    <div className="flex gap-3">
                        {CONTENT.footer.social.map((platform) => (
                            <a key={platform.label} href={platform.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                                {platform.label == 'Instagram' && <Image src='/svg/instagram.svg' width={30} height={30} quality={90} alt='instagram' />}
                                {platform.label == 'LinkedIn' && <Image src='/png/linkedin.png' width={24} height={24} quality={90} alt='linkedin' />}
                            </a>
                        ))}
                        <a href="https://wa.me/919667427187?text=Hi%20Wondrr%2C%20I%27d%20like%20to%20plan%20a%20trip" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors" aria-label="WhatsApp">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="flex flex-wrap gap-8 md:gap-12 lg:gap-16 flex-1 justify-between px-3 md:px-0 lg:justify-end">
                    {CONTENT.footer.sections.map((section) => (
                        <div key={section.title} className="flex flex-col gap-3 md:gap-4 min-w-[120px]">
                            <h4 className="text-white text-xs md:text-sm font-medium uppercase tracking-wide">
                                {section.title}
                            </h4>
                            <ul className="flex flex-col gap-2 md:gap-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-neutral-400 text-sm md:text-base font-normal hover:text-white transition-colors">
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
