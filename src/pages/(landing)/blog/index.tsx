import { Link, useParams } from "react-router-dom"
import { Button } from "@heroui/react"
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
        <div className="space-y-20 bg-[#FAFAFA] pb-20">
            <BlogDetailsBanner post={post} />

            <div className="container">
                <div className="grid min-h-0 grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px]">
                    <PostContent article={post.article} />
                    <aside className="min-h-0 min-w-0 w-full lg:sticky lg:top-24 lg:z-10 lg:self-start">
                        <BlogPostSideBar excludeSlug={post.slug} />
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default BlogView
