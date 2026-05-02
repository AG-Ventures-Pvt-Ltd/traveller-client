// Skeleton loaders for each booking step

function SkeletonBlock({ className }: { className: string }) {
    return <div className={`bg-zinc-200 rounded animate-pulse ${className}`} />;
}

// ── Reservation step ─────────────────────────────────────────────────────────

export function ReservationSkeleton() {
    return (
        <div className="px-4 pb-4 flex flex-col gap-4">
            {/* TripOverviewCard */}
            <div className="border border-[#D9D9D9] rounded-2xl px-[18px] pt-5 pb-4 flex flex-col gap-5">
                <SkeletonBlock className="h-4 w-3/4" />
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <SkeletonBlock className="h-3 w-20" />
                        <SkeletonBlock className="h-3 w-14" />
                    </div>
                    <SkeletonBlock className="h-6 w-16 rounded-full" />
                    <div className="flex flex-col gap-1 items-end">
                        <SkeletonBlock className="h-3 w-20" />
                        <SkeletonBlock className="h-3 w-14" />
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <SkeletonBlock className="h-3 w-20" />
                    <SkeletonBlock className="h-8 w-8 rounded-full" />
                    <SkeletonBlock className="h-5 w-7" />
                    <SkeletonBlock className="h-8 w-8 rounded-full" />
                </div>
            </div>

            {/* Traveler Details collapsible */}
            <div className="border border-[#D9D9D9] rounded-2xl px-4 py-4 flex flex-col gap-3">
                <SkeletonBlock className="h-4 w-36" />
                <SkeletonBlock className="h-10 w-full rounded-lg" />
                <SkeletonBlock className="h-10 w-full rounded-lg" />
                <SkeletonBlock className="h-10 w-full rounded-lg" />
            </div>

            {/* Package Options collapsible */}
            <div className="border border-[#D9D9D9] rounded-2xl px-4 py-4 flex flex-col gap-3">
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-14 w-full rounded-xl" />
            </div>

            {/* Stay / Transport / Activity / Food collapsibles */}
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-[#D9D9D9] rounded-2xl px-4 py-4">
                    <SkeletonBlock className="h-4 w-28" />
                </div>
            ))}
        </div>
    );
}

// ── Review step ───────────────────────────────────────────────────────────────

export function ReviewSkeleton() {
    return (
        <div className="px-4 pb-4 flex flex-col gap-4">
            {/* Traveler card (Figma design) */}
            <div className="border border-[#D9D9D9] rounded-[16px] flex items-center gap-[26px] px-[19px] py-[21px]">
                <SkeletonBlock className="h-6 w-6 rounded" />
                <div className="flex flex-col gap-[7px] flex-1">
                    <SkeletonBlock className="h-4 w-36" />
                    <SkeletonBlock className="h-3 w-28" />
                    <SkeletonBlock className="h-3 w-24" />
                </div>
            </div>

            {/* Summary card */}
            <div className="mx-5 rounded-2xl border border-zinc-300 overflow-hidden flex flex-col">
                {/* Trip header */}
                <div className="flex items-start gap-3 px-4 pt-5 pb-4">
                    <div className="flex flex-col gap-2 flex-1">
                        <SkeletonBlock className="h-5 w-3/4" />
                        <SkeletonBlock className="h-3 w-1/3" />
                    </div>
                    <SkeletonBlock className="w-24 h-24 rounded-xl flex-shrink-0" />
                </div>

                <div className="mx-4 border-t border-zinc-200" />

                {/* Trip meta */}
                <div className="flex flex-col gap-3 px-4 py-4">
                    {[1, 2, 3, 4].map((i) => (
                        <SkeletonBlock key={i} className="h-3 w-full" />
                    ))}
                </div>

                <div className="mx-4 border-t border-zinc-200" />

                {/* Pricing rows */}
                <div className="flex flex-col gap-2.5 px-4 py-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between">
                            <SkeletonBlock className="h-3 w-24" />
                            <SkeletonBlock className="h-3 w-16" />
                        </div>
                    ))}
                    <div className="flex justify-between pt-1">
                        <SkeletonBlock className="h-6 w-28" />
                        <SkeletonBlock className="h-6 w-20" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Coupons step ──────────────────────────────────────────────────────────────

export function CouponsSkeleton() {
    return (
        <div className="px-4 pb-4 flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="border border-[#D9D9D9] rounded-2xl p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <SkeletonBlock className="h-5 w-5 rounded" />
                        <SkeletonBlock className="h-4 w-36" />
                    </div>
                    <SkeletonBlock className="h-3 w-3/4" />
                    <SkeletonBlock className="h-3 w-1/4" />
                </div>
            ))}
        </div>
    );
}
