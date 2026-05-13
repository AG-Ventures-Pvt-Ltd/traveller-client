'use client'

import MyImage from '@/common/ui/Image';
import { HostedByProps } from '../types';
import CollapsibleCard from '@/common/ui/CollapsibleCard';
import { ShieldCheckIcon } from '@phosphor-icons/react';


export default function HostedBy({ host, onPress }: HostedByProps) {
    return (
        <CollapsibleCard title='Hosted by'>
            <button
                onClick={onPress}
                className="flex items-center gap-4 mb-6 hover:opacity-80 transition-opacity w-full px-4"
            >
                {host.avatar ? (
                    <MyImage
                        src={host.avatar}
                        alt={host.name}
                        rounded
                        className="w-14 h-14 object-cover"
                    />
                ) : (
                    <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-xs text-black">
                        <span>{host.initials || host.name.charAt(0).toUpperCase()}</span>
                    </div>
                )}
                <div className='flex flex-col items-start justify-center'>
                    <p className="text-md font-normal text-black">{host.name}</p>
                    {host.certificates && host.certificates.includes('certified') && <span className='font-semibold flex items-center gap-1'><ShieldCheckIcon weight='fill' className='text-[#43A047]'/>Wondrr Verified</span>}
                </div>
            </button>
        </CollapsibleCard>
    );
}
