import ExploreCardSkeleton from "./ExploreCardSkeleton"
import { Skeleton } from "@heroui/react"

const ExploreTechSectionSkeleton = () => (
    <div className="space-y-4 rounded-xl border border-[#E4E5E7] bg-white p-5 animate-pulse">
        <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-48 rounded" />
            <div className="flex gap-3">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="size-8 rounded-full" />
            </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <ExploreCardSkeleton key={index} />
            ))}
        </div>
    </div>
)

export default ExploreTechSectionSkeleton
