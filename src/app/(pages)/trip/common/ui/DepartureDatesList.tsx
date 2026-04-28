'use client';

export interface DepartureDateItem {
    id: string;
    date: Date | string;
    /** Optional label shown below the date, e.g. "4 seats" */
    seatsLabel?: string;
}

interface DepartureDatesListProps {
    items: DepartureDateItem[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    emptyLabel?: string;
    /** Extra classes appended to the scrollable container (e.g. padding, bleed margins) */
    className?: string;
}

export default function DepartureDatesList({
    items,
    selectedId,
    onSelect,
    emptyLabel = 'Loading dates…',
    className = '',
}: DepartureDatesListProps) {
    if (items.length === 0) {
        return (
            <div className={`flex items-center justify-center h-16 w-full ${className}`}>
                <span className="text-xs text-zinc-400">{emptyLabel}</span>
            </div>
        );
    }

    return (
        <div className={`flex gap-3 overflow-x-auto scrollbar-hide ${className}`}>
            {items.map((item) => {
                const date = new Date(item.date);
                const isSelected = item.id === selectedId;
                return (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={`flex-shrink-0 border rounded-[14px] py-3 px-4 text-center transition-colors cursor-pointer flex flex-col items-center justify-center gap-1
                            ${isSelected ? 'bg-[#EEA0FF] border-transparent' : 'border-black bg-white'}`}
                    >
                        <span className="text-sm text-black text-center leading-tight">
                            {date.getDate()}
                            <br />
                            <span className="text-base">{date.toLocaleString('default', { month: 'short' })}</span>
                        </span>
                        {item.seatsLabel && (
                            <span className="text-xs text-zinc-500">{item.seatsLabel}</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
