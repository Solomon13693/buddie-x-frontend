import { ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import type { BlogPostDetail } from "../../../../types/blog"

type BlogDetailsBannerProps = {
    post: BlogPostDetail
}

const BlogDetailsBanner = ({ post }: BlogDetailsBannerProps) => {
    return (
        <section className="relative overflow-hidden bg-[linear-gradient(166.37deg,_#FBA852_-17.29%,_#BE764F_47.52%)] py-12 text-white">
            <div className="container">
                <div className="max-w-2xl space-y-3 py-2 lg:py-4">
                    <nav className="inline-flex items-center gap-2 flex-wrap text-xs text-white/80 pb-12">
                        <Link to="/" className="hover:text-white">Home</Link>
                        <span className="mx-2">&gt;</span>
                        <Link to="/blog" className="hover:text-white">Blog</Link>
                        <span className="mx-2">&gt;</span>
                        <span className="text-white/90 line-clamp-1">{post.title}</span>
                    </nav>

                    <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-7 sm:leading-10">
                        {post.title}
                    </h1>

                    {post.subtitle && (
                        <p className="text-sm text-white/90 sm:text-base">
                            {post.subtitle}
                        </p>
                    )}

                    <div className="inline-flex items-center gap-3 flex-wrap text-xs text-white/80">
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
            </div>
        </section>
    )
}

export default BlogDetailsBanner
