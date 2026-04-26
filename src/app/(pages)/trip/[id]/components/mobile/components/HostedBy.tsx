'use client'

import MyImage from '@/common/ui/Image';
import { HostedByProps } from '../types';

export default function HostedBy({ host, onPress }: HostedByProps) {
    return (
        <button
            onClick={onPress}
            className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity w-full border border-[#D9D9D9] rounded-xl p-4"
        >
            {host.avatar ? (
                <MyImage
                    src={host.avatar}
                    alt={host.name}
                    rounded
                    className="w-12 h-12 object-cover"
                />
            ) : (
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-xs text-black">
                    {host.initials || host.name.charAt(0).toUpperCase()}
                </div>
            )}
            <p className="text-md font-medium text-black">{host.name}</p>
        </button>
    );
}
