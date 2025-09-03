import React from 'react'
import Navbar from './components/Navbar'
import Image from 'next/image'
import Carousel from './components/slider'

const Landing = () => {
    return (
        <>
            <div>
                <div className='relative mt-4'>
                    <Navbar />
                    <div className='px-4'>
                        <Carousel />
                    </div>
                </div>
            </div>
            <div>

            </div>
        </>
    )
}

export default Landing