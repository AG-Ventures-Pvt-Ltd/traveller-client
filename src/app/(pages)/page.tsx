'use client';

import Footer from './(landing)/Footer/Footer';
import InfoSection from './(landing)/InfoSection/InfoSection';
import ReviewSection from './(landing)/ReviewSection/ReviewSection';
import TripSlider from './(landing)/TripSlider/TripSlider';
// import { useSession } from 'next-auth/react';
import './globals.css';
// import { useGetData } from '@/services/useGetData'
// import Loader from '@/common/components/composites/Loader/loader'
// interface Trip {
//     tripSlug: string
//     image: string
//     title: string
//     rating: number
//     location: string
//     price: number
//     reviewCount?: number
//     days?: number
// }
// interface FeaturedTripsResponse {
//     trips: Trip[]
// }
import Image from 'next/image';


export const Landing = () => {

    // const { data, isLoading } = useGetData<FeaturedTripsResponse>('/api/client/v1/trips/featured')

    // if (isLoading) {
    //     return <Loader/>
    // }

    // const data = useSession()

    return (
        <>
            <div className="w-full min-h-screen p-4 md:p-10 bg-[#0C1E3E] ">
                <div className='relative mb-18'>
                    <div className="w-24 h-[420px] left-[10%] top-[30%] absolute origin-top-left rotate-[-53deg] bg-[#A2BFFF] rounded-full blur-[180px]" />
                    <div className="w-24 h-[420px] right-[30%] top-[65%] absolute origin-top-left rotate-[-127deg] bg-[#A2BFFF] rounded-full blur-[131.70px]" />
                    <header className="w-full relative flex justify-between items-center mb-8 md:mb-12 z-10">
                        <div className="flex items-center gap-8 md:gap-24 w-full">
                            <h1 className="text-white text-2xl md:text-4xl font-bold font-['PolySans']">Wondrr</h1>
                            <nav className="flex items-center gap-10 text-white text-xl">
                                <span>Home</span>
                                <span>About Us</span>
                                <span>Destinations</span>
                                <span>Packages</span>
                                <span>Blog</span>
                                <span>Contact Us</span>
                            </nav>
                        </div>
                        <button className="px-7 py-2 bg-white rounded-3xl text-black text-xl font-semibold font-['DM_Sans'] whitespace-nowrap">
                            Sign Up
                        </button>
                    </header>
                    <section className="relative w-full flex flex-col lg:flex-row items-start justify-between gap-8 mt-8 md:mt-16">
                        <div className="flex flex-col gap-4 md:gap-8 lg:gap-16 text-white font-[1000]">
                            <p className="p-0 m-0 text-[clamp(6rem,20vw,28rem)] leading-[0.6] text-[#C0CFFD] tracking-tighter">
                                DISCOVER
                            </p>
                            <p className="p-0 m-0 text-[clamp(6rem,20vw,28rem)] leading-[0.6] tracking-tighter">
                                INDIA
                            </p>
                        </div>
                        <div className="relative w-[clamp(20rem,40vw,38rem)] lg:absolute lg:right-[2%] lg:top-[40%] rotate-2">
                            <div className="aspect-[2/1] rounded-xl border-4 md:border-6 border-white bg-white overflow-hidden">
                                <Image
                                    alt="Discover India"
                                    width={600}
                                    height={300}
                                    className="w-full h-full object-cover"
                                    src="/png/P1.png"
                                />
                                <p className="p-2 md:p-2.5 bottom-3 w-[90%] mx-[5%] absolute bg-white rounded-xl text-center text-black text-sm md:text-base font-bold font-['Fuzzy_Bubbles']">
                                    Like never before
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="flex gap-[17px]">
                    <div className="flex-6 bg-indigo-200 rounded-3xl flex justify-between p-5">
                        <div className="left-[18px] top-[16px] flex flex-col gap-2">
                            <Image alt="Shiv Temple" width={331} height={158} className="w-80 h-40 rounded-2xl" src="/png/P1.png" />
                            <div className="flex flex-col">
                                <h3 className="text-black text-xl font-extrabold font-['DM_Sans']">Shiv Temple</h3>
                                <p className="text-black text-base font-medium font-['DM_Sans']">Bhubaneswar, Odisha</p>
                            </div>
                            <p className="text-black text-base font-light font-['DM_Sans']">One of the most frequently visited temples in India</p>
                        </div>
                        <div className="flex flex-col justify-between gap-5 px-8">
                            <div className="flex flex-col">
                                <span className="text-black text-6xl font-extrabold font-['DM_Sans']">100k +</span>
                                <span className="text-black text-xl font-['DM_Sans']">Happy customers</span>
                            </div>
                            <hr className="w-48 border-black" />
                            <div className="flex flex-col">
                                <span className="text-black text-6xl font-extrabold font-['DM_Sans']">300+</span>
                                <span className="text-black text-xl font-['DM_Sans']">Partner Companies</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-7 bg-[#678DFF] rounded-3xl px-6 py-10 flex flex-col gap-8">
                        <div className="left-[23px] top-[32px] /png/P1.png flex flex-col gap-2.5 max-w-[492px]">
                            <h2 className="text-white text-4xl font-semibold font-['DM_Sans'] capitalize">Find your dream destination</h2>
                            <p className="text-white text-sm font-['DM_Sans']">Explore awesome destinations and get unforgettable experiences ! And do nothing we&apos;ll handle the rest.</p>
                        </div>
                        <div className="bg-[#0D203F] rounded-2xl p-4">
                            <div className="flex items-end gap-4 w-full">
                                <div className="flex flex-col gap-3 w-full">
                                    <label className="text-white text-base font-['DM_Sans']">Location</label>
                                    <div className="px-2 py-2.5 bg-[#8B94CB] rounded-xl flex items-center gap-2.5">
                                        <span className="text-white text-base font-['DM_Sans']">Manali, India</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className="text-white text-base font-['DM_Sans']">Date</label>
                                    <div className="px-2 py-2.5 bg-[#8B94CB] rounded-xl flex items-center gap-2.5">
                                        <span className="text-white text-base font-['DM_Sans']">Dec 8, 2025</span>
                                    </div>
                                </div>
                                <button className="px-6 py-2.5 bg-white h-fit rounded-xl text-black text-base font-['DM_Sans']">
                                    Search
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <TripSlider />
            <InfoSection/>
            <ReviewSection />
            <Footer />
        </>
    )
}

export default Landing