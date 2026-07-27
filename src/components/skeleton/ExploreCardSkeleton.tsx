import { Skeleton } from "@heroui/react"

const ExploreCardSkeleton = () => (
    <div className="block rounded-2xl border border-[#E6E8EC80] bg-white p-5 pb-3">
        <div className="space-y-3 animate-pulse">
            <div className="flex items-start justify-between gap-2">
                <Skeleton className="size-14 rounded-full" />
                <div className="flex flex-col items-end gap-1.5">
                    <Skeleton className="h-5 w-12 rounded" />
                    <Skeleton className="h-3 w-28 rounded" />
                </div>
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/5 rounded" />
                <Skeleton className="h-3 w-4/5 rounded" />
                <Skeleton className="h-3 w-full rounded" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-md" />
            </div>
            <div className="flex items-center gap-1.5">
                <Skeleton className="h-9 w-7 shrink-0 rounded" />
                <div className="flex-1 space-y-1">
                    <Skeleton className="h-2.5 w-20 rounded" />
                    <Skeleton className="h-2.5 w-32 rounded" />
                </div>
            </div>
        </div>
        <hr className="my-2.5 border-[#DADADA]" />
        <div className="flex items-center justify-between pt-1.5">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-7 w-24 rounded" />
        </div>
    </div>
)

export default ExploreCardSkeleton
