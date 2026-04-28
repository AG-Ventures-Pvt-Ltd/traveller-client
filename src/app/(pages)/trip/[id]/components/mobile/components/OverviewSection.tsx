'use client'

import { OverviewSectionProps } from '../types';



export default function OverviewSection({ description, expanded, onToggle }: OverviewSectionProps) {
    return (
        <div className="border border-[#dcdcdc] rounded-[16px] p-4">
            <p className="text-md font-medium text-black mb-2">Overview</p>
            <div className="text-base mb-2 leading-relaxed">
            <div className='flex'>
                <p>Boarding Point</p>
                <p></p>
            </div>
            <div className='flex'>
                <p>Destination</p>
                <p></p>
            </div>
            <div className='flex'>
                <p>Drop Point</p>
                <p></p>
            </div>
            <div className='flex'>
                <p>Duration of trip</p>
                <p></p>
            </div>
            <div className='flex'>
                <p>Avg. Group Size</p>
                <p></p>
            </div>
            </div>
        </div>
    );
}
