import { Skeleton } from "@heroui/react"

const MentorSessionCardSkeleton = () => {
    return (
        <div className="space-y-3 pt-5">

            <div className="flex items-start justify-between">

                <div className="space-y-1 max-w-[70%]">
                    <Skeleton className="h-4 w-40 rounded" />
                    <Skeleton className="h-3 w-28 rounded" />
                </div>

                <Skeleton className="h-8 w-16 rounded" />
            </div>

            <Skeleton className="h-5 w-20 rounded" />

        </div>
    )
}

export default MentorSessionCardSkeleton
