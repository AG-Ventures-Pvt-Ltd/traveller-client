'use client';

import type { PaymentDetailRow } from '../types';

interface PaymentDetailsCardProps {
    rows: PaymentDetailRow[];
}

export default function PaymentDetailsCard({ rows }: PaymentDetailsCardProps) {
    return (
        <div className="flex flex-col gap-3.5">
            <p className="text-[15px] font-medium text-black tracking-tight">Payment Details</p>
            <div className="border border-[#d9d9d9] rounded-2xl overflow-hidden">
                <div className="flex flex-col gap-2.5 px-3 py-5">
                    {rows.map((row, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="text-[#616161] text-sm">{row.label}</span>
                            <span className={`text-sm font-medium text-right ${row.valueClassName ?? 'text-black'}`}>
                                {row.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
