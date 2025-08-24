export interface CommunityType {
  id: string;
  name: string;
  description: string;
  cover_image?: string;
  avatar?: string;
  category: string;
  is_private: boolean;
  member_count: number;
  post_count: number;
  created_at: string;
  updated_at: string;
  created_by: {
    id: string;
    name: string;
    avatar?: string;
    role: 'mentor' | 'mentee';
  };
  is_member: boolean;
  is_admin: boolean;
  rules?: string[];
  tags?: string[];
}

export interface CommunityPostType {
  id: string;
  title: string;
  content: string;
  images?: string[];
  community_id: string;
  community_name: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'mentor' | 'mentee';
  };
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  is_author: boolean;
  created_at: string;
  updated_at: string;
  tags?: string[];
}

export interface CommunityCommentType {
  id: string;
  content: string;
  post_id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'mentor' | 'mentee';
  };
  likes_count: number;
  is_liked: boolean;
  is_author: boolean;
  created_at: string;
  updated_at: string;
  replies?: CommunityCommentType[];
}

export interface CommunityMemberType {
  id: string;
  name: string;
  avatar?: string;
  role: 'mentor' | 'mentee';
  joined_at: string;
  is_admin: boolean;
  is_moderator: boolean;
}

export interface CreateCommunityData {
  name: string;
  description: string;
  category: string;
  is_private: boolean;
  cover_image?: File;
  avatar?: File;
  rules?: string[];
  tags?: string[];
}

export interface UpdateCommunityData {
  name?: string;
  description?: string;
  category?: string;
  is_private?: boolean;
  cover_image?: File;
  avatar?: File;
  rules?: string[];
  tags?: string[];
}

export interface CreatePostData {
  title: string;
  content: string;
  community_id: string;
  images?: File[];
  tags?: string[];
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  images?: File[];
  tags?: string[];
}

export interface CreateCommentData {
  content: string;
  post_id: string;
  parent_id?: string;
}

export interface CommunityStatsType {
  total_communities: number;
  joined_communities: number;
  created_communities: number;
  total_posts: number;
  total_comments: number;
}
