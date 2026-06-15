import { ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import type { BlogPostDetail } from "../../../../types/blog"

type BlogDetailsBannerProps = {
    post: BlogPostDetail
}

const BlogDetailsBanner = ({ post }: BlogDetailsBannerProps) => {
    return (
        <section className="relative overflow-hidden bg-[linear-gradient(166.37deg,_#FBA852_-17.29%,_#BE764F_47.52%)] py-8 text-white">
            <div className="container">
                <nav className="inline-flex items-center gap-2 flex-wrap text-xs text-white/80 py-2">
                    <Link to="/" className="hover:text-white">Home</Link>
                    <span className="mx-2">&gt;</span>
                    <Link to="/blog" className="hover:text-white">Blog</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-white/90 line-clamp-1">{post.title}</span>
                </nav>
            </div>
        </section>
    )
}

export default BlogDetailsBanner
