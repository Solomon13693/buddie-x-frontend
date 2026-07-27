import { useLatestBlogPosts } from "../../../../../services/blog"
import EmptyState from "../../../../../components/EmptyState"
import LatestPostCard from "./LatestPostCard"
import LatestPostsSkeleton from "./LatestPostsSkeleton"

type LatestPostsProps = {
    excludeSlug?: string
}

const LATEST_COUNT = 3

const LatestPosts = ({ excludeSlug }: LatestPostsProps) => {
    const { posts, isLoading } = useLatestBlogPosts(excludeSlug, LATEST_COUNT)

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#0E0E0E]">The Latest</h3>

            {isLoading ? (
                <LatestPostsSkeleton />
            ) : posts.length === 0 ? (
                <EmptyState
                    img="/img/Inbox_empty.svg"
                    emptyText="No other posts yet."
                    widht={80}
                    height={80}
                />
            ) : (
                <div className="space-y-3">
                    {posts.map((post) => (
                        <LatestPostCard key={post.slug} post={post} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default LatestPosts
