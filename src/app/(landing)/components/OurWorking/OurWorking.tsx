import React from 'react'
import Button from '@/common/components/atoms/Button'
import LocationPin from '../../svgs/locationPin'
import TravelBag from '../../svgs/TravelBag'
import AddressPin from '../../svgs/AddressPin'
import Image from 'next/image'


const OurWorking = () => {

    const offeringsInfo = [
        {
            title: "Choose Your Destination",
            description: "Select from thousands of beautiful places",
            icon: <LocationPin />
        },
        {
            title: "Personalize Your Trip",
            description: "Get custom itineraries tailored to your preferences",
            icon: <TravelBag />
        },
        {
            title: "Travel Effortlessly",
            description: "Book and explore India without hassle",
            icon: <AddressPin />
        }
    ]

    return (
        <div className='flex mt-16 mx-12'>
            <div className='flex-1 px-12'>
                <h1 className='text-4xl font-bold mb-2'>How Our Platform Works</h1>
                <h4 className='text-[16px] font-normal text-[#4F4F53] mt-4'>Set your travel goals, optimize your itinerary, and explore India with ease. Our smart technology helps you plan the perfect adventure, from trekking to adventure excursions.</h4>
                <div className='flex flex-col gap-4 mt-8'>
                    {offeringsInfo.map((offering) => {
                        return (
                            <div className='flex items-center gap-6' key={offering.title}>
                                <div className='bg-[#F5F5F5] p-4 rounded-full'>
                                    {offering.icon}
                                </div>
                                <div className='flex flex-col'>
                                    <h2 className='text-2xl'>{offering.title}</h2>
                                    <h2 className='text-[16px] text-[#4F4F53] font-normal'>{offering.description}</h2>
                                </div>
                            </div>)
                    })}
                </div>
                <Button className='bg-[#0064D7] px-5 py-3 rounded-full text-white mt-14'>Book your spot</Button>
            </div>
            <div className='flex-1 flex justify-end mr-16'>
                <Image
                    src="/bgside.png"
                    alt="Background Image"
                    width={0}
                    height={0}
                    unoptimized
                    className="w-[95%] h-auto"
                />
            </div>
        </div>
    )
}

export default OurWorking