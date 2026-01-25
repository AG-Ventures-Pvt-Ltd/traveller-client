import React from 'react'
import { ArrowUpRight } from 'lucide-react'

interface ArrowButtonProps {
    children: React.ReactNode
    onClick?: () => void
    className?: string
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ children, onClick, className }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div
                className="px-6 py-3 bg-neutral-900 text-white rounded-full font-bold"
                aria-label="Start your trip and explore destinations"
            >
                {children}
            </div>
            <button className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white hover:bg-neutral-800 hover:scale-105 transition-transform cursor-pointer" onClick={onClick} aria-hidden="true">
                <ArrowUpRight />
            </button>
        </div>
    )
}

export default ArrowButton