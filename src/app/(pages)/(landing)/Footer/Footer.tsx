'use client'

import React from 'react'

const Footer = () => {
    return (
        <div className="w-full bg-black text-white px-4 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-6 flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0">
                <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="text-2xl sm:text-3xl font-bold">Wondrr</div>
                    <div className="text-gray-300 text-base sm:text-lg">&quot;Making Every Journey Memorable&quot;</div>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-auto">
                    <div className="text-white text-sm sm:text-base">Newsletter</div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            className="bg-gray-100 text-gray-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full flex-1 text-sm sm:text-base"
                            placeholder="Enter your email"
                        />
                        <button className="bg-gray-100 text-black px-6 py-2.5 sm:py-3 rounded-full w-full sm:w-32 text-sm sm:text-base">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
                <div className="grid grid-cols-2 md:flex gap-8 sm:gap-12 md:gap-16 w-full md:w-auto">
                    <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="text-white text-sm sm:text-base font-semibold">HOME</div>
                        <div className="text-gray-400 text-xs sm:text-sm leading-5 cursor-pointer hover:text-white">Destinations</div>
                        <div className="text-gray-400 text-xs sm:text-sm leading-5 cursor-pointer hover:text-white">About Us</div>
                        <div className="text-gray-400 text-xs sm:text-sm leading-5 cursor-pointer hover:text-white">Book Your Trip</div>
                        <div className="text-gray-400 text-xs sm:text-sm leading-5 cursor-pointer hover:text-white">Contact Us</div>
                    </div>
                    <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="text-white text-sm sm:text-base font-semibold">CONTACT</div>
                        <div className="text-gray-400 text-xs sm:text-sm leading-5 cursor-pointer hover:text-white">Community</div>
                        <div className="text-gray-400 text-xs sm:text-sm leading-5 cursor-pointer hover:text-white">Knowledge Base</div>
                        <div className="text-gray-400 text-xs sm:text-sm leading-5 cursor-pointer hover:text-white">Support</div>
                        <div className="text-gray-400 text-xs sm:text-sm leading-5 cursor-pointer hover:text-white">How to Buy</div>
                    </div>
                    <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="text-white text-sm sm:text-base font-semibold">LEARN</div>
                        <div className="text-gray-400 text-xs sm:text-sm leading-5 cursor-pointer hover:text-white">About</div>
                        <div className="text-gray-400 text-xs sm:text-sm leading-5 cursor-pointer hover:text-white">Pricing</div>
                    </div>
                </div>
            </div>
            <hr className="border-gray-700" />
            <div className="flex justify-center items-center">
                <div className="text-gray-400 text-xs sm:text-sm text-center">All Rights Reserved - Wondrr Trips</div>
            </div>
        </div>
    )
}

export default Footer
