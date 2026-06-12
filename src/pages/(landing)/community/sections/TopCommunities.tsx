import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useTopCommunities } from '../../../../services/communityPublic';
import type { TopCommunityCard } from '../../../../types/community';

const FALLBACK_IMAGE = '/img/community.svg';

const formatCardDate = (community: TopCommunityCard) => {
    const raw = community.latest_post?.created_at ?? community.updated_at;
    if (!raw) return '';
    try {
        return format(new Date(raw), 'h:mm a, MMM d, yyyy');
    } catch {
        return raw;
    }
};

const communityHref = (community: TopCommunityCard) =>
    `/dashboard/communities/${community.id}`;

const TopCommunitySkeleton = () => (
    <article className="overflow-hidden rounded-lg bg-[#F5F5F5] animate-pulse">
        <div className="aspect-[4/2] bg-[#EBEBEB]" />
        <div className="space-y-1.5 p-5">
            <div className="h-3 w-40 rounded bg-[#EBEBEB]" />
            <div className="h-4 w-full rounded bg-[#EBEBEB]" />
        </div>
    </article>
);

const TopCommunities = () => {
    
    const { communities = [], isLoading, isError } = useTopCommunities(3);

    if (!isLoading && (isError || communities.length === 0)) {
        return null;
    }

    if(!isLoading && (isError || communities.length === 0)) {
        return null;
    }

    return (
        <div className="container">
            <h2 className="text-lg md:text-xl font-medium text-center text-[#0E0E0E] mb-8">
                Top Communities
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => <TopCommunitySkeleton key={i} />)
                    : communities.map((community) => (
                        <Link
                            key={community.id}
                            to={communityHref(community)}
                            className="block overflow-hidden rounded-lg bg-[#F5F5F5] transition-opacity hover:opacity-90"
                        >
                            <article>
                                <div className="aspect-[4/2] overflow-hidden">
                                    <img
                                        src={community.cover_image || FALLBACK_IMAGE}
                                        alt={community.name}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="space-y-1.5 p-5 min-w-0">
                                    <p className="text-xs text-[#9CA3AF]">
                                        {formatCardDate(community)}
                                    </p>
                                    <div className="flex items-baseline gap-1.5 min-w-0">
                                        <span className="shrink-0 max-w-[42%] truncate text-sm font-medium text-[#0E0E0E]">
                                            {community.name}
                                        </span>
                                        {community.latest_post?.title && (
                                            <>
                                                <span className="shrink-0 text-[#9CA3AF]">·</span>
                                                <h3 className="min-w-0 flex-1 text-sm font-medium text-[#0E0E0E] leading-snug line-clamp-1">
                                                    {community.latest_post.title}
                                                </h3>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default TopCommunities;
