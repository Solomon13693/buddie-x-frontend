import { Link, useParams } from "react-router-dom"
import { Button } from "@heroui/react"
import { ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline"
import EmptyState from "../../../components/EmptyState"
import { useBlogPost } from "../../../services/blog"
import { BlogDetailsBanner, BlogPostSideBar, PostContent } from "./components"
import BlogDetailSkeleton from "./components/BlogDetailSkeleton"

const BlogView = () => {
    const { slug = "" } = useParams()
    const { post, isLoading, isError } = useBlogPost(slug)

    if (isLoading) {
        return <BlogDetailSkeleton />
    }

    if (isError || !post) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-6 bg-[#FAFAFA] py-20">
                <EmptyState emptyText="This article could not be found." />
                <Button
                    as={Link}
                    to="/blog"
                    variant="bordered"
                    className="h-10 px-8 text-xs text-[#EF7420] border-1 border-[#EF7420]"
                    radius="sm"
                >
                    Back to Blog
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-10 bg-[#FAFAFA] pb-20">
            <BlogDetailsBanner post={post} />

            <div className="container">
                <div className="grid min-h-0 grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px]">
                    <div className="space-y-6">
                        {post.image && (
                            <div className="rounded-2xl ring-1 ring-[#E6E8EC] overflow-hidden max-h-[480px]">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <h1 className="text-xl sm:text-3xl font-semibold tracking-tight leading-snug text-[#0E0E0E]">
                                {post.title}
                            </h1>
                            {post.subtitle && (
                                <p className="text-sm text-[#676767]">{post.subtitle}</p>
                            )}
                            <div className="inline-flex items-center gap-3 flex-wrap text-xs text-[#9CA3AF] pt-1">
                                <span>by {post.author}</span>
                                <span>—</span>
                                <span className="inline-flex items-center gap-1">
                                    <ClockIcon className="size-3.5" />
                                    {post.readTime}
                                </span>
                                <span>—</span>
                                <span className="inline-flex items-center gap-1">
                                    <ChartBarIcon className="size-3.5" />
                                    {post.views >= 1000
                                        ? `${(post.views / 1000).toFixed(1)}K views`
                                        : `${post.views} views`}
                                </span>
                            </div>
                        </div>

                        <hr className="border-[#E6E8EC]" />

                        <PostContent article={post.article} />
                    </div>
                    <aside className="min-h-0 min-w-0 w-full lg:sticky lg:top-24 lg:z-10 lg:self-start">
                        <BlogPostSideBar excludeSlug={post.slug} />
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default BlogView
