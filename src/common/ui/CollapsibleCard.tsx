'use client';

import { useState } from 'react';
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';

interface CollapsibleCardProps {
    title: string;
    /** Initial open state — defaults to true */
    defaultOpen?: boolean;
    /** Controlled open state — when provided, component is in controlled mode */
    isOpen?: boolean;
    /** Called when header is clicked in controlled mode */
    onToggle?: () => void;
    /** Extra element rendered in the header row between the title and the caret (e.g. a "Later Month" button) */
    headerRight?: React.ReactNode;
    /**
     * Set to "visible" when children contain absolutely-positioned elements that
     * should extend outside the card boundary (e.g. price-badge pills).
     * Defaults to "hidden".
     */
    overflow?: 'hidden' | 'visible';
    children: React.ReactNode;
    /** Extra classes on the outer card container */
    className?: string;
}

export default function CollapsibleCard({
    title,
    defaultOpen = true,
    isOpen: controlledOpen,
    onToggle,
    headerRight,
    overflow = 'hidden',
    children,
    className = '',
}: CollapsibleCardProps) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const handleToggle = () => {
        if (isControlled) {
            onToggle?.();
        } else {
            setInternalOpen(o => !o);
        }
    };

    return (
        <div className={`border border-[#D9D9D9] rounded-2xl overflow-${overflow} ${className}`}>
            <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-4"
                onClick={handleToggle}
            >
                <p className="text-sm font-medium text-black">{title}</p>
                <div className="flex items-center gap-2">
                    {headerRight}
                    {open ? <CaretUpIcon size={16} /> : <CaretDownIcon size={16} />}
                </div>
            </button>
            {open && children}
        </div>
    );
}
