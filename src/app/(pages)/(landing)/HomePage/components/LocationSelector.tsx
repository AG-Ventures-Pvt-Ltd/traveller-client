'use client';

import React from 'react';
import { MapPinAreaIcon, MoneyWavyIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import MyImage from '@/common/ui/Image';

interface LocationSelectorProps {
    location?: string;
    avatar?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
    location = 'Delhi',
    avatar
}) => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleAvatarClick = () => {
        if (session) {
            router.push('/profile');
        } else {
            router.push('/auth');
        }
    };

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <MapPinAreaIcon size={24} className="w-10 h-10 text-neutral-700" weight="regular" />
                <div className="flex flex-col">
                    <span className="text-neutral-700 text-sm font-medium font-['Satoshi']">
                        Currently viewing for
                    </span>
                    <p className="text-neutral-900 text-2xl sm:text-3xl font-bold font-['Satoshi']">
                        {location}
                    </p>
                </div>
            </div>
                <div className="flex items-center gap-3">
                <button
                    onClick={() => router.push('/wallet')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                    aria-label="View wallet"
                >
                    <MoneyWavyIcon className="w-8 h-8 text-neutral-700" weight="regular" />
                    <div className="absolute top-2 left-1 w-3 h-3 bg-[#F44336] rounded-full" />
                </button>
                {avatar ? (
                    <button
                        onClick={handleAvatarClick}
                        className="p-0 rounded-full transition-opacity hover:opacity-80"
                        aria-label="Go to profile or login"
                    >
                        <MyImage
                            src={avatar}
                            alt="User avatar"
                            className="w-10 h-10"
                            rounded={true}
                        />
                    </button>
                ) : (
                    <button
                        onClick={handleAvatarClick}
                        className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg hover:opacity-80 transition-opacity"
                        aria-label="Go to profile or login"
                    >
                        🧑
                    </button>
                )}
            </div>
        </div>
    );
};

export default LocationSelector;
