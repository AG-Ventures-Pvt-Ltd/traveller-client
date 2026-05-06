'use client';

import CollapsibleCard from '@/common/ui/CollapsibleCard';
import { HandHeartIcon, UserCircleGearIcon, HeadsetIcon, CheckCircleIcon  } from "@phosphor-icons/react";



export const THINGS_TO_KNOW = [
    {
        icon : HandHeartIcon ,
        description: 'Your safety is our priority. We carefully vet all our ground partners and hold them to consistent quality and safety standards.',
        iconClass: 'text-[#448AFF]'
    },
    {
        icon: UserCircleGearIcon,
        description: 'You’ll have a dedicated trip captain or local coordinator available throughout the trip for 24x7 support.',
        iconClass: 'text-[#FFC107]'
    },
    {
        icon: HeadsetIcon,
        description: 'If something still doesn’t go as expected, you’re not left dealing with it alone. You can directly reach out to Wondrr — our team will step in and ensure it gets resolved.',
        iconClass: 'text-black'
    },
    {
        icon: CheckCircleIcon,
        description: 'From planning to completion, we are here at every step of the way. We make sure you’re taken care of - so you can focus on the experience.',
        iconClass: 'text-[#43A047]'
    },
];

export default function SafetySupportSection() {
    return (
        <CollapsibleCard title="Safety & On-Trip Support">
            <div className="px-4 pb-4 space-y-4">
                {THINGS_TO_KNOW.map((item, index) => (
                    <div key={index} className="pb-2 last:border-b-0 flex items-center">
                        <item.icon size={24} className={`mr-4 flex-shrink-0 ${item.iconClass}`} weight='duotone'/>
                        <p className="font-medium text-xs">{item.description}</p>
                    </div>
                ))}
            </div>
        </CollapsibleCard>
    );
}