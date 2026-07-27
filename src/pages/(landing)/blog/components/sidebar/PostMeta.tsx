import { ClockIcon } from "@heroicons/react/24/outline"

type PostMetaProps = {
    date: string
    readTime: string
    light?: boolean
}

const PostMeta = ({ date, readTime, light = false }: PostMetaProps) => (
    <div className={`flex items-center gap-2 text-[10px] ${light ? "text-white/80" : "text-[#9CA3AF]"}`}>
        <span>{date}</span>
        <span className="h-px w-3 bg-current opacity-60" />
        <span className="inline-flex items-center gap-1">
            <ClockIcon className="size-3" />
            {readTime}
        </span>
    </div>
)

export default PostMeta
