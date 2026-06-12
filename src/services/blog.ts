import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { axiosNoAuth } from '../lib';
import type {
    BlogPostApi,
    BlogPostCardData,
    BlogPostDetail,
    LatestPostData,
    PaginatedBlogPosts,
} from '../types/blog';

type BlogListParams = {
    page?: number;
    perPage?: number;
    search?: string;
    sortBy?: 'newest' | 'oldest';
    excludeSlug?: string;
};

export const formatBlogDate = (date?: string) => {
    if (!date) return '';
    try {
        return format(new Date(date), 'MMM do, yyyy');
    } catch {
        return date;
    }
};

export const computeReadTime = (article?: string) => {
    const text = (article ?? '').replace(/<[^>]+>/g, ' ').trim();
    const words = text ? text.split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return minutes === 1 ? '1 minute read' : `${minutes} minute read`;
};

export const mapToBlogPostCard = (post: BlogPostApi): BlogPostCardData => ({
    slug: post.slug,
    image: post.image,
    title: post.title,
    subtitle: post.subtitle ?? '',
    description: post.excerpt ?? '',
    date: formatBlogDate(post.created_at),
    views: post.views ?? 0,
});

export const mapToLatestPost = (post: BlogPostApi, featured = false): LatestPostData => ({
    slug: post.slug,
    title: post.title,
    description: post.excerpt ?? '',
    date: formatBlogDate(post.created_at),
    readTime: post.read_time ?? computeReadTime(post.article),
    image: post.image,
    featured,
});

export const mapToBlogPostDetail = (post: BlogPostApi): BlogPostDetail => ({
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle ?? '',
    article: post.article ?? '',
    image: post.image,
    views: post.views ?? 0,
    readTime: post.read_time ?? computeReadTime(post.article),
    author: post.created_by?.fullname || post.created_by?.email || 'Buddie-X',
    date: formatBlogDate(post.created_at),
});

export const getBlogPosts = async (params: BlogListParams = {}) => {
    const response = await axiosNoAuth.get<{ data: PaginatedBlogPosts }>('blog', { params });
    return response.data.data;
};

export const getBlogPost = async (slug: string) => {
    const response = await axiosNoAuth.get<{ data: BlogPostApi }>(`blog/${slug}`);
    return response.data.data;
};

export const useBlogPosts = (params: BlogListParams = {}) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['blog-posts', params],
        queryFn: () => getBlogPosts(params),
        staleTime: 60_000,
    });

    return {
        posts: (data?.data ?? []).map(mapToBlogPostCard),
        total: data?.total ?? 0,
        isLoading,
        isError,
    };
};

export const useBlogPost = (slug?: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['blog-post', slug],
        queryFn: () => getBlogPost(slug!),
        enabled: !!slug,
        staleTime: 60_000,
    });

    return {
        post: data ? mapToBlogPostDetail(data) : null,
        raw: data,
        isLoading,
        isError,
    };
};

export const useLatestBlogPosts = (excludeSlug?: string, limit = 3) => {
    const { data, isLoading } = useQuery({
        queryKey: ['blog-latest', excludeSlug, limit],
        queryFn: () => getBlogPosts({ perPage: limit + (excludeSlug ? 1 : 0), excludeSlug }),
        staleTime: 60_000,
    });

    const posts = (data?.data ?? [])
        .filter((p) => p.slug !== excludeSlug)
        .slice(0, limit)
        .map((p, index) => mapToLatestPost(p, index === 0));

    return { posts, isLoading };
};
