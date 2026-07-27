const MentorListCardSkeleton = () => (
    <div className="animate-pulse rounded-2xl border border-[#E4E5E7] bg-white p-5 sm:p-6">
        <div className="flex gap-4">
            <div className="size-14 shrink-0 rounded-full bg-[#F3F4F6] sm:size-20" />
            <div className="flex-1 space-y-3">
                <div className="h-5 w-48 rounded bg-[#F3F4F6]" />
                <div className="h-4 w-full max-w-md rounded bg-[#F3F4F6]" />
                <div className="h-3 w-40 rounded bg-[#F3F4F6]" />
            </div>
        </div>
        <div className="mt-4 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-7 w-24 rounded-full bg-[#F3F4F6]" />
            ))}
        </div>
        <hr className="my-4 border-[#EBEBEB]" />
        <div className="flex justify-between">
            <div className="h-6 w-32 rounded bg-[#F3F4F6]" />
            <div className="h-8 w-36 rounded bg-[#F3F4F6]" />
        </div>
    </div>
)

export default MentorListCardSkeleton
