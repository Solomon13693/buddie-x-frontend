import { Skeleton } from "@heroui/react"

const MarketPlaceCardSkeleton = () => {
    return (
        <div className="space-y-3.5 rounded-2xl border border-[#E6E8EC80] bg-white p-5">
            <div className="flex items-start gap-3">
                <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <Skeleton className="h-4 w-[55%] max-w-[200px] rounded" />
                    <Skeleton className="h-3 w-[40%] max-w-[140px] rounded" />
                </div>
            </div>

            <div className="space-y-2">
                <Skeleton className="h-6 w-24 rounded-md" />
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-[92%] rounded" />
                <Skeleton className="h-3 w-[70%] rounded" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-3 w-32 rounded" />
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-[88%] rounded" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-3 w-28 rounded" />
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-7 w-16 rounded-md" />
                    <Skeleton className="h-7 w-14 rounded-md" />
                    <Skeleton className="h-7 w-20 rounded-md" />
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <Skeleton className="size-5 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
            </div>

            <hr className="border-[#DADADA]" />

            <div className="flex items-center justify-between gap-3">
                <div className="flex items-end gap-1">
                    <Skeleton className="h-8 w-24 rounded" />
                    <Skeleton className="mb-1 h-3 w-16 rounded" />
                </div>
                <Skeleton className="h-9 w-[88px] rounded-md" />
            </div>
        </div>
    )
}

export default MarketPlaceCardSkeleton
