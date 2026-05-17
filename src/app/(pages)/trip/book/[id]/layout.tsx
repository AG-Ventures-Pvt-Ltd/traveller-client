"use client";
import { useDevice } from '@/common/hooks/useDevice';
import BackButton from '@/common/ui/BackButton';
import { useBookingNavStore } from './[batchId]/store/useBookingNavStore';


export default function Layout({ children }: { children: React.ReactNode }) {

    const { isMobile } = useDevice();
    const { headerLabel, backAction } = useBookingNavStore();

    if (isMobile) {
        return (
            <div className='flex flex-col min-h-screen bg-[#FFF9F4]'>
                <div className="px-5 py-4">
                    <BackButton
                        label={headerLabel}
                        onClick={backAction ?? undefined}
                        className="gap-4"
                    />
                </div>
                <div className="flex-1 overflow-y-auto pb-20">
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div>
            {children}
        </div>
    );
}
