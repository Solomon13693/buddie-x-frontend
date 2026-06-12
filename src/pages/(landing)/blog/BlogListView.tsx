import { BlogPostCard } from '../community/components';
import { useBlogPosts } from '../../../services/blog';
import { useQueryParams } from '../../../utils/useQueryParams';
import { Pagination } from '../../../components';
import EmptyState from '../../../components/EmptyState';
import BlogPostCardSkeleton from './components/BlogPostCardSkeleton';
import BlogListBanner from './components/BlogListBanner';

const PER_PAGE = 12;

const BlogListView = () => {
    const { searchParams } = useQueryParams();
    const page = Number(searchParams.get('page')) || 1;
    const { posts, total, isLoading } = useBlogPosts({ page, perPage: PER_PAGE });

    return (
        <div className="space-y-20 pb-20">
            <BlogListBanner />

            <div className="container">
                {isLoading ? (
                    <div className="divide-y divide-[#E5E7EB] bg-white rounded-xl px-4 md:px-6 shadow-sm">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <BlogPostCardSkeleton key={i} />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="bg-white rounded-xl py-16 flex justify-center shadow-sm">
                        <EmptyState emptyText="No blog posts yet. Check back soon for new articles." />
                    </div>
                ) : (
                    <div className="divide-y divide-[#E5E7EB] rounded-xl px-4 md:px-6 shadow-sm">
                        {posts.map((post) => (
                            <BlogPostCard key={post.slug} post={post} />
                        ))}
                    </div>
                )}

                {total > PER_PAGE && (
                    <Pagination className="mt-10" perPage={PER_PAGE} total={total} />
                )}
            </div>
        </div>
    );
};

export default BlogListView;
