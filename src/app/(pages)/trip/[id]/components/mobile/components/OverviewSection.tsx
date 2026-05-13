'use client'

import { OverviewSectionProps } from '../types';
import { GenderFemaleIcon, HeartIcon } from '@phosphor-icons/react';


export default function OverviewSection({ description }: OverviewSectionProps) {

    const overviewFields = [
        { label: 'Destination', value: description.destination },
        { label: 'Boarding Point', value: description.boardingPoint },
        { label: "Difficulty", value: description.difficulty },
        { label: 'Avg. Group Size', value: description.seats },
        { label: 'Duration of trip', value: description.duration },
    ];

    const certificateMap = {
        "female-friendly": { label: "Female friendly", color: "#E050FF", icon: GenderFemaleIcon },
        "solo-friendly": { label: "Loved by Solo Travelers", color: "#000", icon: HeartIcon }
    };

    const allowed = Object.keys(certificateMap);

    const requiredCertificates = (description?.certificates as string[])?.filter(c => allowed.includes(c)) ?? [];


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
            {requiredCertificates.length > 0 && (
                <div>
                    <hr className='mr-10 my-4 text-[#D9D9D9]' />
                    <div className='flex flex-col gap-1'>
                        {requiredCertificates.map(cert => {
                            const certData = certificateMap[cert as keyof typeof certificateMap];
                            const IconComponent = certData.icon;
                            return (
                                <div key={cert} className='flex items-center gap-3'>
                                    <IconComponent size={24} weight='thin' />
                                    <span style={{ color: certData.color }}>{certData.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
