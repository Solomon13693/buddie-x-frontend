import { FollowUs, LatestPosts, SidebarSubscription } from "./sidebar"

type BlogPostSideBarProps = {
    excludeSlug?: string
}

const BlogPostSideBar = ({ excludeSlug }: BlogPostSideBarProps) => {
    return (
        <aside className="space-y-8">
            <FollowUs />
            <SidebarSubscription />
            <LatestPosts excludeSlug={excludeSlug} />
        </aside>
    )
}

export default BlogPostSideBar
