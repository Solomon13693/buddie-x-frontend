import { Skeleton } from "@heroui/react"

const ExploreCategoriesSkeleton = () => (
    <div className="flex min-w-max items-center gap-x-6 border-b border-[#DADBDD] pb-2 animate-pulse md:w-full md:justify-between">
        {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-20 shrink-0 rounded" />
        ))}
    </div>
)

export default ExploreCategoriesSkeleton
