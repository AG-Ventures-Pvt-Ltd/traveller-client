"use client";
import { useDevice } from '@/common/hooks/useDevice';
import BackButton from '@/common/ui/BackButton';
import Button from '@/common/ui/Buttons/Button';
import { useBookingNavStore } from './[batchId]/store/useBookingNavStore';


export default function Layout({ children }: { children: React.ReactNode }) {

    const { isMobile } = useDevice();
    const { headerLabel, buttonLabel, continueAction, backAction } = useBookingNavStore();

    if (isMobile) {
        return (
            <div className='flex flex-col min-h-screen bg-[#FFF9F4]'>
                <div className="px-5 pt-14 pb-4">
                    <BackButton
                        label={headerLabel}
                        onClick={backAction ?? undefined}
                        className="gap-4"
                    />
                </div>
                <div className="flex-1 overflow-y-auto pb-28">
                    {children}
                </div>
                <div className="fixed bottom-0 left-0 right-0 px-5 py-5 bg-[#FFF9F4] z-50">
                    <Button
                        variant="yellow"
                        fullWidth
                        onClick={continueAction ?? undefined}
                    >
                        {buttonLabel}
                    </Button>
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
