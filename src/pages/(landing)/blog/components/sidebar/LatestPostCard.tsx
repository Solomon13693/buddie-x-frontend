import { Link } from "react-router-dom"
import type { LatestPostData } from "../../../../../types/blog"
import PostMeta from "./PostMeta"

type LatestPostCardProps = {
    post: LatestPostData
}

const LatestPostCard = ({ post }: LatestPostCardProps) => {
    if (post.featured) {
        return (
            <Link
                to={`/blog/${post.slug}`}
                className="block overflow-hidden rounded-lg relative min-h-[168px] p-4"
            >
                {post.image && (
                    <img
                        src={post.image}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                    />
                )}
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 flex min-h-[136px] flex-col justify-between gap-3">
                    <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-white leading-snug">
                            {post.title}
                        </h4>
                        <p className="text-[10px] text-white/90 leading-5 line-clamp-3">
                            {post.description}
                        </p>
                    </div>
                    <PostMeta date={post.date} readTime={post.readTime} light />
                </div>
            </Link>
        )
    }

    return (
        <Link
            to={`/blog/${post.slug}`}
            className="block rounded-lg bg-white p-4 space-y-2 transition-opacity hover:opacity-90"
        >
            <h4 className="text-xs font-semibold text-[#0E0E0E] leading-snug">
                {post.title}
            </h4>
            <p className="text-[10px] text-[#6B7280] leading-5 line-clamp-3">
                {post.description}
            </p>
            <PostMeta date={post.date} readTime={post.readTime} />
        </Link>
    )
}

export default LatestPostCard
