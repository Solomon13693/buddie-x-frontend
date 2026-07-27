const BlogPostCardSkeleton = () => (
    <article className="grid grid-cols-1 md:grid-cols-[1.25fr_3fr] gap-6 items-start py-5 animate-pulse">
        <div className="overflow-hidden rounded-xl aspect-[4/2.5] md:aspect-[7/6] lg:aspect-[9/6] bg-[#F0F0F0]" />
        <div className="max-w-2xl space-y-4 sm:pt-3">
            <div className="space-y-2">
                <div className="h-5 w-3/4 max-w-sm rounded bg-[#F0F0F0]" />
                <div className="h-4 w-1/2 max-w-xs rounded bg-[#F0F0F0]" />
            </div>
            <div className="space-y-2">
                <div className="h-4 w-full rounded bg-[#F0F0F0]" />
                <div className="h-4 w-5/6 rounded bg-[#F0F0F0]" />
                <div className="h-3 w-32 rounded bg-[#F0F0F0] mt-2" />
            </div>
        </div>
    </article>
)

export default BlogPostCardSkeleton
