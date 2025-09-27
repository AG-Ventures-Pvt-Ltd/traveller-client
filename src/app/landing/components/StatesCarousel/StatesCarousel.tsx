'use client'

import React from 'react'
import ImageCoursel from '../../../../common/components/composites/ImageCoursel'

interface StateImage {
  src: string;
  alt: string;
  route : string;
}

const StatesCarousel = ({ activeRegions } : { activeRegions: string[] }) => {
    
    const images: StateImage[] = [
        {
            src: "/states/meghalaya.png",
            alt: "Meghalaya",
            route : '/trips/states'
        },
        {
            src: "/states/odisha.png",
            alt: "Odisha",
            route : '/trips/states'
        },
        {
            src: "/states/sikkim.png",
            alt: "Sikkim",
            route : '/trips/states'
        },
        {
            src: "/states/odisha.png",
            alt: "Karnartaka",
            route : '/trips/states'
        },
        {
            src: "/states/sikkim.png",
            alt: "Himachal Pradesh",
            route : '/trips/states'
        }
    ];

    const filteredRegions = images.filter(img => activeRegions.includes(img.alt));

    return (
        <div className='mt-48'>
            <ImageCoursel
                images={images || filteredRegions}
                title='Exploring India’s breathtaking scenery & landscapes'
                description='Discover India’s Wonders Effortlessly – Your shortcut to one-click adventures!'
            />
        </div>
    )
}

export default StatesCarousel