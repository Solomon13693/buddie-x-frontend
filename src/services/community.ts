import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../lib";

import {
  CreateCommunityData,
  UpdateCommunityData,
  CreatePostData,
  UpdatePostData,
  CreateCommentData,
} from "../types";

// Community CRUD Operations
export const useGetCommunities = (page = 1, limit = 10, search = '', category = '') => {
  return useQuery({
    queryKey: ['communities', page, limit, search, category],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(category && { category })
      });
      const response = await axios.get(`/communities?${params}`);
      return response.data?.data;
    }
  });
};

export const useGetMyCommunities = () => {
  return useQuery({
    queryKey: ['my-communities'],
    queryFn: async () => {
      const response = await axios.get('/communities/my');
      return response.data;
    }
  });
};

export const useGetCommunityDetails = (communityId: string) => {
  return useQuery({
    queryKey: ['community', communityId],
    queryFn: async () => {
      const response = await axios.get(`/communities/${communityId}`);
      return response.data?.data;
    },
    enabled: !!communityId
  });
};

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCommunityData) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('is_private', data.is_private ? '1' : '0');

      if (data.cover_image) {
        formData.append('cover_image', data.cover_image);
      }
      if (data.avatar) {
        formData.append('avatar', data.avatar);
      }

      // ✅ Append arrays correctly
      if (data.rules && data.rules.length > 0) {
        data.rules.forEach((rule, index) => {
          formData.append(`rules[${index}]`, rule);
        });
      }

      if (data.tags && data.tags.length > 0) {
        data.tags.forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag);
        });
      }

      const response = await axios.post('/communities', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      queryClient.invalidateQueries({ queryKey: ['my-communities'] });
    }
  });
};

export const useUpdateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ communityId, data }: { communityId: string; data: UpdateCommunityData }) => {
      const formData = new FormData();

      if (data.name) formData.append('name', data.name);
      if (data.description) formData.append('description', data.description);
      if (data.category) formData.append('category', data.category);
      if (data.is_private !== undefined) formData.append('is_private', data.is_private ? '1' : '0');

      if (data.cover_image) {
        formData.append('cover_image', data.cover_image);
      }
      if (data.avatar) {
        formData.append('avatar', data.avatar);
      }

      // ✅ Append arrays correctly
      if (data.rules && data.rules.length > 0) {
        data.rules.forEach((rule, index) => {
          formData.append(`rules[${index}]`, rule);
        });
      }

      if (data.tags && data.tags.length > 0) {
        data.tags.forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag);
        });
      }

      const response = await axios.post(`/communities/${communityId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: (_, { communityId }) => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      queryClient.invalidateQueries({ queryKey: ['community', communityId] });
      queryClient.invalidateQueries({ queryKey: ['my-communities'] });
    }
  });
};

export const useDeleteCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (communityId: string) => {
      const response = await axios.delete(`/communities/${communityId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      queryClient.invalidateQueries({ queryKey: ['my-communities'] });
    }
  });
};

// Community Membership Operations
export const useJoinCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (communityId: string) => {
      const response = await axios.post(`/communities/${communityId}/join`);
      return response.data;
    },
    onSuccess: (_, communityId) => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      queryClient.invalidateQueries({ queryKey: ['community', communityId] });
      queryClient.invalidateQueries({ queryKey: ['my-communities'] });
    }
  });
};

export const useLeaveCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (communityId: string) => {
      const response = await axios.post(`/communities/${communityId}/leave`);
      return response.data;
    },
    onSuccess: (_, communityId) => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      queryClient.invalidateQueries({ queryKey: ['community', communityId] });
      queryClient.invalidateQueries({ queryKey: ['my-communities'] });
    }
  });
};

export const useGetCommunityMembers = (communityId: string, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['community-members', communityId, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      const response = await axios.get(`/communities/${communityId}/members?${params}`);
      return response.data?.data;
    },
    enabled: !!communityId
  });
};

// Community Posts Operations
export const useGetCommunityPosts = (communityId: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['community-posts', communityId, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      const response = await axios.get(`/communities/${communityId}/posts?${params}`);
      return response.data?.data;
    },
    enabled: !!communityId
  });
};

export const useGetPostDetails = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const response = await axios.get(`/posts/${postId}`);
      return response.data?.data;
    },
    enabled: !!postId
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostData) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('community_id', data.community_id);

      if (data.images) {
        data.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }

      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag);
        });
      }

      const response = await axios.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['community-posts', data.community_id] });
      queryClient.invalidateQueries({ queryKey: ['community', data.community_id] });
    }
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, data }: { postId: string; data: UpdatePostData }) => {
      const formData = new FormData();

      if (data.title) formData.append('title', data.title);
      if (data.content) formData.append('content', data.content);
      if (data.images) {
        data.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }

      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag);
        });
      }

      const response = await axios.post(`/posts/${postId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    }
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await axios.delete(`/posts/${postId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    }
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await axios.post(`/posts/${postId}/like`);
      return response.data;
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    }
  });
};

// Comments Operations
export const useGetPostComments = (postId: string, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['post-comments', postId, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      const response = await axios.get(`/comments/${postId}?${params}`);
      return response.data?.data;
    },
    enabled: !!postId
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCommentData) => {
      const response = await axios.post('/comments', data);
      return response.data;
    },
    onSuccess: (_, data) => {
      // Invalidate all post-comments queries to ensure replies are updated
      queryClient.invalidateQueries({ queryKey: ['post-comments'] });
      queryClient.invalidateQueries({ queryKey: ['post', data.post_id] });
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    }
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId, content }: { commentId: string; content: string }) => {
      const response = await axios.put(`/comments/${commentId}`, { content });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all post-comments queries to ensure updates are reflected
      queryClient.invalidateQueries({ queryKey: ['post-comments'] });
    }
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      const response = await axios.delete(`/comments/${commentId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-comments'] });
    }
  });
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      const response = await axios.post(`/comments/${commentId}/like`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-comments'] });
    }
  });
};

// Community Stats
export const useGetCommunityStats = () => {
  return useQuery({
    queryKey: ['community-stats'],
    queryFn: async () => {
      const response = await axios.get('/communities/stats');
      return response.data;
    }
  });
};
