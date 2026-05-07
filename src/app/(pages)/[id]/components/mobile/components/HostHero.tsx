import React from 'react'
import Button from '@/common/ui/Buttons/Button'
import MyImage from '@/common/ui/Image'
import {
    ShareNetworkIcon,
    ShieldCheckIcon,
} from '@phosphor-icons/react'
import BackButton from '@/common/ui/BackButton'
import HostAvatar from './HostAvatar'
import { useParams } from 'next/navigation'
import { useGetData } from '@/services/useGetData'
import { HostProfile } from '../../../types'
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints'
import { HostHeroSkeleton } from './HostHeroSkeleton'


const HostHero = () => {

    const params = useParams();
    const id = params.id as string;

    const { data: fetchedHost, isLoading, error } = useGetData<HostProfile>(API_ENDPOINTS.USER.HOST_PROFILE(id));

    if (isLoading) {
        return <HostHeroSkeleton />;
    }

    return (
        <div>
            <div className="relative h-[160px] w-full">
                <MyImage
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                    alt="Host cover"
                    className="w-full h-full"
                    objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
                <BackButton className='absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center shadow-sm active:opacity-70' label='' />
                <button
                    className="absolute top-4 right-4 w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-sm active:opacity-70"
                >
                    <ShareNetworkIcon size={24} weight="thin" className="text-white" />
                </button>
                <div className='absolute -bottom-12 w-full'>
                    <div className='flex justify-between px-6'>
                        <HostAvatar avatar={fetchedHost?.avatar} fullName={fetchedHost?.fullName || 'Wondrr'} />
                        <div className="flex items-center gap-[5px] ">
                            {fetchedHost?.certificates?.[0] == 'certified' && <div className='bg-white flex rounded-3xl border border-black px-2.5 py-1.5 gap-1'>
                                <ShieldCheckIcon size={15} weight="fill" className="text-[#43A047]" />
                                <span className="text-xs font-medium tracking-tight">
                                    Wondrr Verified
                                </span>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            {/* ── Profile Info ── */}
            <div className="px-6 pt-16 pb-4 flex flex-col gap-3">
                {/* Name row with Wondrr Verified on the right */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-semibold text-black tracking-tight leading-tight">
                            {fetchedHost?.fullName}
                        </h1>
                        <p className="text-[12px] font-medium">
                            @{fetchedHost?.username}
                        </p>
                    </div>
                    {/* <Button
                        variant="primary"
                        onClick={() => { }}
                        className="!py-[7px] !px-[14px] !text-xs !rounded-xl whitespace-nowrap"
                    >
                        Post a review
                    </Button> */}
                </div>
            </div>

        </div>
    )
}

export default HostHero