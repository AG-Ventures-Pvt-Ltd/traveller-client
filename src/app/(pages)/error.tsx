'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Error({ error }: { error: Error & { digest?: string }, reset: () => void }) {
    const router = useRouter()

    return (
        <div className="mt-[6%] w-full bg-white flex flex-col items-center justify-center space-y-4 overflow-hidden pb-[5%]">
            <Image src={'/svg/error.svg'} alt='Error Image' width={0} height={0} className="w-48 h-48 mb-8" />
            <div className="text-center text-black text-5xl font-semibold ">Whoops!</div>
            <div className="text-center text-black text-2xl font-light ">{error.message || 'We can&apos;t seem to find the page you are looking for'}</div>
            <div className='flex gap-12 mt-12'>
                <div className="px-6 py-3 rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.31)] overflow-hidden flex items-center justify-center bg-white cursor-pointer" onClick={() => router.push('/')}>
                    <div className="text-black text-sm font-medium ">RETURN HOME</div>
                </div>
                <div className="px-6 py-3 rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.31)] overflow-hidden flex items-center justify-center bg-white cursor-pointer" onClick={() => window.location.reload()}>
                    <div className="text-black text-sm font-medium">TRY AGAIN</div>
                </div>
            </div>
        </div>
    )
}

