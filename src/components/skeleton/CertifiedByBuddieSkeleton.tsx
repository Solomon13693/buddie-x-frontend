import { Skeleton } from "@heroui/react"

const CertifiedByBuddieSkeleton = () => (
    <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-[0px_4px_30px_0px_#9E9D9D1A] sm:p-8 lg:p-10 animate-pulse">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full space-y-3 text-center lg:text-left">
                <Skeleton className="mx-auto h-7 w-64 rounded lg:mx-0" />
                <Skeleton className="mx-auto h-4 w-full max-w-xl rounded lg:mx-0" />
                <Skeleton className="mx-auto h-4 w-4/5 max-w-lg rounded lg:mx-0" />
            </div>
            <div className="flex w-full justify-center gap-3 lg:w-auto">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-[180px] w-[150px] shrink-0 rounded-xl sm:h-[200px] sm:w-[170px]"
                    />
                ))}
            </div>
        </div>
    </div>
)

export default CertifiedByBuddieSkeleton
