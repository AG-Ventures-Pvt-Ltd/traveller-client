'use client'

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Square } from "lucide-react";


export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 4;
    const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

    const slides = [
        {
            img: "/background.png",
            title: "Mountain Vista",
            desc: "Your travel stories and memories are our top priorities",
        },
        {
            img: "/background.png",
            title: "Ocean Paradise",
            desc: "Crystal clear tropical waters",
        },
        {
            img: "/background.png",
            title: "Forest Trail",
            desc: "Mysterious woodland paths",
        },
        {
            img: "/background.png",
            title: "Desert Sunset",
            desc: "Golden hour in the desert",
        },
    ];

    const updateSlide = (index: number) => {
        setCurrentSlide(index % totalSlides);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const startAutoSlide = () => {
        stopAutoSlide();
        autoSlideRef.current = setTimeout(() => {
            nextSlide();
        }, 4000);
    };

    const stopAutoSlide = () => {
        if (autoSlideRef.current !== null) {
            clearTimeout(autoSlideRef.current);
            autoSlideRef.current = null;
        }
    };

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, [currentSlide]);

    return (
        <div className="max-h-[80%]">
            <div
                className="flex flex-col overflow-hidden rounded-3xl items-center justify-center h-full"
                onMouseEnter={stopAutoSlide}
                onMouseLeave={startAutoSlide}
            >
                <div className="w-full overflow-hidden">
                    <div
                        className="flex w-[400%] h-full transition-transform duration-400 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div className="w-1/4 h-full relative" key={index}>
                                <div className="relative w-full max-h-screen h-auto">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 1423 794"
                                        preserveAspectRatio="xMidYMid meet"
                                        className="w-full h-auto"
                                    >
                                        <defs>
                                            <mask id="mask" maskUnits="userSpaceOnUse">
                                                <path
                                                    d="M1399 794H24C10.7452 794 0 783.255 0 770V103.644C0 90.389 10.7452 79.6438 24 79.6438H581.456C587.77 79.6438 593.83 77.1557 598.322 72.7188L664.933 6.925C669.425 2.48806 675.485 0 681.798 0H1399C1412.25 0 1423 10.7452 1423 24V770C1423 783.255 1412.25 794 1399 794Z"
                                                    fill="white"
                                                />
                                            </mask>
                                        </defs>
                                        <image
                                            href={slide.img}
                                            width="1423"
                                            height="794"
                                            preserveAspectRatio="xMidYMid slice"
                                            mask="url(#mask)"
                                        />
                                    </svg>
                                </div>
                                <div className="text-white z-10 text-3xl absolute mb-[20%] ml-8 bottom-0 max-w-[28%] flex gap-4 ">
                                    <Square className="fill-current text-white mt-1" />
                                    {slide.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Image
                src='/wondrr.png'
                alt='Wondrr'
                height={0}
                width={0}
                unoptimized
                className='w-[44%] sm:w-[44vw] h-auto -mt-[13%] z-30 end-[5%] absolute max-w-[90vw]' />
            <div className="flex px-2 z-10 sm:px-12 -my-8 sm:-my-20 gap-2 sm:gap-3">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`w-2 h-2 sm:w-4 z-10 sm:h-4 rounded-full cursor-pointer ${index === currentSlide ? "bg-white scale-125" : "bg-[#434343]"
                            }`}
                        onClick={() => {
                            stopAutoSlide();
                            updateSlide(index);
                        }}
                    ></span>
                ))}
            </div>
        </div>
    );
}
