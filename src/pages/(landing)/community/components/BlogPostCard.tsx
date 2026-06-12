import { Link } from "react-router-dom"
import type { BlogPostCardData } from "../../../../types/blog"

export type BlogPost = BlogPostCardData

type BlogPostCardProps = {
    post: BlogPost
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
    return (
        <Link to={`/blog/${post.slug}`} className="block">
            <article className="grid grid-cols-1 md:grid-cols-[1.25fr_3fr] gap-6 items-start py-5 transition-opacity hover:opacity-90">
                <div className="overflow-hidden rounded-xl aspect-[4/2.5] md:aspect-[7/6] lg:aspect-[9/6] bg-[#F5F5F5]">
                    {post.image ? (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FFF2DE] to-[#F5F5F5] text-xs text-[#9CA3AF]">
                            No image
                        </div>
                    )}
                </div>

                <div className="max-w-2xl space-y-4 sm:pt-3">
                    <div className="space-y-0.5">
                        <h3 className="text-base font-semibold text-[#0E0E0E]">
                            {post.title}
                        </h3>
                        <p className="text-sm text-[#29282B]">
                            {post.subtitle}
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <p className="text-sm text-[#29282B] leading-6 line-clamp-2 md:line-clamp-3">
                            {post.description}
                        </p>

                        <p className="text-xs text-[#29282B] pt-1">
                            {post.date} | Views {post.views}
                        </p>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default BlogPostCard
