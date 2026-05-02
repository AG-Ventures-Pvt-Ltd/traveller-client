'use client'

import { OverviewSectionProps } from '../types';
import { GenderFemaleIcon, HeartIcon } from '@phosphor-icons/react';


export default function OverviewSection({ description }: OverviewSectionProps) {
    const overviewFields = [
        { label: 'Destination', value: description.destination },
        { label: 'Boarding Point', value: '' },
        { label: 'Drop Point', value: '' },
        { label: 'Duration of trip', value: '' },
        { label: 'Avg. Group Size', value: description.seats },
    ];
    return (
        <div className="border border-[#dcdcdc] rounded-[16px] p-4">
            <p className="text-md font-medium text-black mb-2">Overview</p>
            <div className="text-base mb-2 leading-relaxed">
                {overviewFields.map((field, index) => (
                    <div key={index} className='flex justify-between'>
                        <p className='text-[#616161]'>{field.label}</p>
                        <p>{field.value}</p>
                    </div>
                ))}
            </div>
            <hr className='mr-10 my-2 text-[#D9D9D9]'/>
            <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-3'>
                    <GenderFemaleIcon size={24} weight='thin' />
                    <span className='text-[#EEA0FF]'> Female friendly</span>
                </div>
                <div className='flex items-center gap-3'>
                    <HeartIcon size={24} weight='thin' />
                    <span className='text-[#616161]'>Loved by Solo Travelers</span>
                </div>
            </div>
        </div>
    );
}
