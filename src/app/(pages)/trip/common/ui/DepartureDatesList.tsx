'use client';

export interface DepartureDateItem {
    id: string;
    date: Date | string;
    /** Optional label shown below the date, e.g. "4 seats" */
    seatsLabel?: string;
    /** Optional badge sitting on the box's bottom border, e.g. a batch add-on "+₹500". Doesn't change box size. */
    badge?: string;
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
        <div className={`flex gap-3 overflow-x-auto scrollbar-hide pb-3 ${className}`}>
            {items.map((item) => {
                const d = new Date(item.date);
                const istDay = Number(d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }).split('-')[2]);
                const istMonth = d.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', month: 'short' });
                const isSelected = item.id === selectedId;
                return (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={`relative flex-shrink-0 border rounded-[14px] py-3 px-4 text-center transition-colors cursor-pointer flex flex-col items-center justify-center gap-1
                            ${isSelected ? 'bg-[#EEA0FF] border-transparent' : 'border-black bg-white'}`}
                    >
                        <span className="text-sm text-black text-center leading-tight">
                            {istDay}
                            <br />
                            <span className="text-base">{istMonth}</span>
                        </span>
                        {item.seatsLabel && (
                            <span className="text-xs text-zinc-500">{item.seatsLabel}</span>
                        )}
                        {item.badge && (
                            <span className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full px-[7px] py-0.5 text-xs font-semibold leading-4 text-black bg-[#FFD976]">
                                {item.badge}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
