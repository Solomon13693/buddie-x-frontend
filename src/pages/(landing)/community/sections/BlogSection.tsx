import { Button } from "@heroui/react"
import { Link } from "react-router-dom"
import { useBlogPosts } from "../../../../services/blog"
import { BlogPostCard } from "../components"
import BlogPostCardSkeleton from "../../blog/components/BlogPostCardSkeleton"

const COMMUNITY_BLOG_LIMIT = 10

const BlogSection = () => {
    const { posts, isLoading } = useBlogPosts({ perPage: COMMUNITY_BLOG_LIMIT })

    return (
        <div className="container">
            <h2 className="text-lg md:text-xl font-medium text-center text-[#0E0E0E] mb-4">
                Blog
            </h2>

            {isLoading ? (
                <div className="divide-y divide-[#E5E7EB]">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <BlogPostCardSkeleton key={i} />
                    ))}
                </div>
            ) : posts.length === 0 ? null : (
                <div className="divide-y divide-[#E5E7EB]">
                    {posts.map((post) => (
                        <BlogPostCard key={post.slug} post={post} />
                    ))}
                </div>
            )}

            <div className="flex justify-center pt-8">
                <Button
                    as={Link}
                    to="/blog"
                    variant="bordered"
                    className="h-10 px-8 text-xs text-[#EF7420] border-1 border-[#EF7420]"
                    radius="sm"
                >
                    See All Content
                </Button>
            </div>
        </div>
    )
}

export default BlogSection
