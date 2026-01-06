'use client'

import React from 'react'

const Footer = () => {
    return (
        <div className="w-full bg-black text-white px-12 pt-12 pb-6 flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4 ">
                    <div className="text-3xl font-bold">Wondrr</div>
                    <div className="text-gray-300 text-lg">&quot;Making Every Journey Memorable&quot;</div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="text-white text-base">Newsletter</div>
                    <div className="flex">
                        <input
                            className="bg-gray-100 text-gray-600 px-6 py-3 rounded-full flex-1"
                            placeholder="Enter your email"
                        />
                        <button className="bg-green-400 text-black px-6 py-3 rounded-full ml-2 w-32">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-6 w-52">
                    <div className="text-gray-300 text-base leading-7">
                        16 Avenue des Champs-<br />Élysées, 75008 Paris, France
                    </div>
                    <div className="text-gray-300 text-base">+33 1 23 45 67 89</div>
                </div>
                <div className="flex gap-16">
                    <div className="flex flex-col gap-6">
                        <div className="text-white text-base font-semibold">HOME</div>
                        <div className="text-gray-400 text-sm leading-5 cursor-pointer hover:text-white">Destinations</div>
                        <div className="text-gray-400 text-sm leading-5 cursor-pointer hover:text-white">About Us</div>
                        <div className="text-gray-400 text-sm leading-5 cursor-pointer hover:text-white">Book Your Trip</div>
                        <div className="text-gray-400 text-sm leading-5 cursor-pointer hover:text-white">Contact Us</div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="text-white text-base font-semibold">CONTACT</div>
                        <div className="text-gray-400 text-sm leading-5 cursor-pointer hover:text-white">Community</div>
                        <div className="text-gray-400 text-sm leading-5 cursor-pointer hover:text-white">Knowledge Base</div>
                        <div className="text-gray-400 text-sm leading-5 cursor-pointer hover:text-white">Support</div>
                        <div className="text-gray-400 text-sm leading-5 cursor-pointer hover:text-white">How to Buy</div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="text-white text-base font-semibold">LEARN</div>
                        <div className="text-gray-400 text-sm leading-5 cursor-pointer hover:text-white">About</div>
                        <div className="text-gray-400 text-sm leading-5 cursor-pointer hover:text-white">Pricing</div>
                    </div>
                </div>
            </div>
            <hr className="border-gray-700" />
            <div className="flex justify-center items-center">
                <div className="text-gray-400 text-sm">All Rights Reserved - Wondrr Trips</div>
            </div>
        </div>
    )
}

export default Footer
