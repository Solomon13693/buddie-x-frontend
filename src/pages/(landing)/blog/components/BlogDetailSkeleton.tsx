const BlogDetailSkeleton = () => (
    <div className="space-y-20 bg-[#FAFAFA] pb-20 animate-pulse">
        <div className="bg-[#F0E6DC] py-12">
            <div className="container max-w-2xl space-y-4">
                <div className="h-3 w-48 rounded bg-white/50" />
                <div className="h-10 w-full max-w-lg rounded bg-white/50" />
                <div className="h-4 w-64 rounded bg-white/40" />
                <div className="h-3 w-40 rounded bg-white/40" />
            </div>
        </div>
        <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
                <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-4 w-full rounded bg-[#EBEBEB]" style={{ width: i === 7 ? '70%' : '100%' }} />
                    ))}
                </div>
                <aside className="space-y-6">
                    <div className="h-32 rounded-lg bg-[#EBEBEB]" />
                    <div className="h-24 rounded-lg bg-[#EBEBEB]" />
                    <div className="space-y-3">
                        <div className="h-40 rounded-lg bg-[#EBEBEB]" />
                        <div className="h-20 rounded-lg bg-[#EBEBEB]" />
                    </div>
                </aside>
            </div>
        </div>
    </div>
)

export default BlogDetailSkeleton
