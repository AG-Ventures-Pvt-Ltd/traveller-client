import React from 'react'
import ImageCoursel from '@/common/components/composites/ImageCoursel'
import Image from 'next/image'


const Card = (
    {name,role,review} : { name : string, role : string, review : string }
    ) => {
    return (
        <div>
            <div className='font-light text-lg'>
                {review}
            </div>
            <Image
                src={'/usertemp.png'}
                alt='User'
                height={0} width={0} unoptimized
                className="w-[40px] h-[40px] object-cover rounded-full mt-4" />
            <div className='text-base font-medium mt-2'>{name}</div>
            <div className='text-xs font-normal text-[#4F4F53]'>
                {role}
            </div>
        </div>
    )
}

export type Review = {
        name: string;
        role: string;
        review: string;
        priority: number;
    };
    
const TripReviews = ({reviews} : {reviews : Review[]}) => {

    const cards = reviews?.map((rev) => { 
        return ({
            card : <Card key={rev.name} name={rev.name} role={rev.role} review={rev.review} />
            })
    })

    return (
        <div className='mt-20'>
            <ImageCoursel images={cards} title='Hear What Travellers Say About Their awesome Adventures!' />
        </div>
    )
}

export default TripReviews