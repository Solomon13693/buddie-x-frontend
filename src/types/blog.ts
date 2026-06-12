export type BlogCategoryApi = {
    id: string;
    name: string;
    slug: string;
    is_active?: boolean;
};

export type BlogAuthorApi = {
    id: string;
    fullname?: string;
    email?: string;
};

export type BlogPostApi = {
    id: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    excerpt?: string | null;
    article?: string;
    image: string;
    status?: string;
    is_featured?: boolean;
    views?: number;
    read_time?: string;
    category?: BlogCategoryApi | null;
    created_by?: BlogAuthorApi | null;
    created_at?: string;
    updated_at?: string;
};

export type PaginatedBlogPosts = {
    data: BlogPostApi[];
    total: number;
    perPage: number;
    page: number;
};

export type BlogPostCardData = {
    slug: string;
    image: string;
    title: string;
    subtitle: string;
    description: string;
    date: string;
    views: number;
};

export type LatestPostData = {
    slug: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    image?: string;
    featured: boolean;
};

export type BlogPostDetail = {
    slug: string;
    title: string;
    subtitle: string;
    article: string;
    image: string;
    views: number;
    readTime: string;
    author: string;
    date: string;
};
