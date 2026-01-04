'use client';

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
        <div className="w-full min-h-screen p-4 md:p-10 relative bg-[#0C1E3E] overflow-hidden">
            {/* Background blur effects */}
            <div className="w-24 h-[420px] left-[10%] top-[30%] absolute origin-top-left rotate-[-53deg] bg-[#A2BFFF] rounded-full blur-[180px]"/>
            <div className="w-24 h-[420px] right-[30%] top-[65%] absolute origin-top-left rotate-[-127deg] bg-[#A2BFFF] rounded-full blur-[131.70px]"/>
            {/* Header */}
            <header className="w-full relative flex justify-between items-center mb-8 md:mb-12 z-10">
                <div className="flex items-center gap-8 md:gap-24">
                    <h1 className="text-white text-2xl md:text-4xl font-bold font-['PolySans']">Wondrr</h1>
                    {/* <nav className="flex items-center gap-10 text-white text-xl font-['DM_Sans']">
                        <span>Home</span>
                        <span>About Us</span>
                        <span>Destinations</span>
                        <span>Packages</span>
                        <span>Blog</span>
                        <span>Contact Us</span>
                    </nav> */}
                </div>
                {/* <button className="px-7 py-2 bg-white rounded-3xl text-black text-xl font-semibold font-['DM_Sans']">
                    Sign Up
                </button> */}
            </header>

            {/* Hero Section */}
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
                        <p className="p-2 md:p-2.5 bottom-2 w-[90%] mx-[5%] absolute bg-white rounded-xl text-center text-black text-sm md:text-base font-bold font-['Fuzzy_Bubbles']">
                            Like never before
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom Cards */}
            {/* <div className="flex gap-[17px] left-[38px] top-[682px] absolute">
                <div className="w-[662px] h-72 bg-indigo-200 rounded-3xl overflow-hidden relative">
                    <div className="left-[18px] top-[16px] absolute flex flex-col gap-2">
                        <Image alt="Shiv Temple" width={331} height={158} className="w-80 h-40 rounded-2xl" src="/png/P1.png" />
                        <div className="flex flex-col">
                            <h3 className="text-black text-xl font-extrabold font-['DM_Sans']">Shiv Temple</h3>
                            <p className="text-black text-base font-medium font-['DM_Sans']">Bhubaneswar, Odisha</p>
                        </div>
                        <p className="text-black text-base font-light font-['DM_Sans']">One of the most frequently visited temples in India</p>
                    </div>
                    <div className="left-[403px] top-[24px] absolute flex flex-col items-center gap-5">
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
                    <div className="p-2.5 left-[313px] top-[172.74px] absolute origin-top-left -rotate-45 bg-sky-950 rounded-[44px]">
                        <div className="w-8 h-8 bg-white" />
                    </div>
                </div>

                <div className="w-[696px] h-72 bg-blue-400 rounded-3xl overflow-hidden relative">
                    <div className="left-[23px] top-[32px] absolute flex flex-col gap-2.5 max-w-[492px]">
                        <h2 className="text-white text-4xl font-semibold font-['DM_Sans'] capitalize">Find your dream destination</h2>
                        <p className="text-white text-sm font-['DM_Sans']">Explore awesome destinations and get unforgettable experiences ! And do nothing we&apos;ll handle the rest.</p>
                    </div>
                    <div className="w-[642px] h-28 left-[23px] top-[150px] absolute bg-sky-950 rounded-2xl">
                        <div className="left-[18px] top-[13px] absolute flex items-end gap-3.5">
                            <div className="flex flex-col gap-3">
                                <label className="text-white text-base font-['DM_Sans']">Location</label>
                                <div className="px-2 py-2.5 bg-slate-400 rounded-xl flex items-center gap-2.5">
                                    <div className="w-4 h-4 relative overflow-hidden">
                                        <div className="w-3 h-3.5 left-[2px] top-[1.33px] absolute bg-white" />
                                    </div>
                                    <span className="text-white text-base font-['DM_Sans']">Manali, India</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-white text-base font-['DM_Sans']">Date</label>
                                <div className="px-2 py-2.5 bg-slate-400 rounded-xl flex items-center gap-2.5">
                                    <div className="w-4 h-4 relative overflow-hidden">
                                        <div className="w-2.5 h-2.5 left-[3px] top-[2.33px] absolute bg-white" />
                                    </div>
                                    <span className="text-white text-base font-['DM_Sans']">Dec 8, 2025</span>
                                </div>
                            </div>
                            <button className="px-2 py-2.5 bg-white rounded-xl text-black text-base font-['DM_Sans']">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="p-2.5 left-[604px] top-[62.74px] absolute origin-top-left -rotate-45 bg-sky-950 rounded-[44px]">
                        <div className="w-8 h-8 bg-white" />
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Landing