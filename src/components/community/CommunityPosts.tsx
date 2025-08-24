import React, { useState } from 'react';
import { CommunityPostType, CommunityType } from '../../types';
import { Button } from '../ui';
import { PostCard, CreatePostModal } from './';
import { useGetCommunityPosts } from '../../services';
import { PlusIcon } from '@heroicons/react/24/outline';
import Pagination from '../Pagination';
import { useQueryParams } from '../../utils';

interface CommunityPostsProps {
  community: CommunityType;
  onViewPost?: (postId: string) => void;
}

const CommunityPosts: React.FC<CommunityPostsProps> = ({
  community,
  onViewPost,
}) => {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { searchParams } = useQueryParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("perPage")) || 5;

  const { data: postsData, isLoading, refetch } = useGetCommunityPosts(
    community.id,
    page,
    limit
  );

  const posts = postsData?.data || [];
  const totalPosts = postsData?.meta?.total || 0;

  const handleCreatePost = () => {
    setIsCreateModalOpen(true);
  };

  const handlePostSuccess = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
          <Button
            onPress={handleCreatePost}
            isDisabled={!community.is_member}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
          <p className="text-sm text-gray-500 mt-1">
            {totalPosts} posts in this community
          </p>
        </div>
        <Button
          onPress={handleCreatePost}
          size='sm'
          isDisabled={!community.is_member}
          className="w-full sm:w-auto">
          <PlusIcon className="w-4 h-4 mr-2" />
            Create Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="flex items-center justify-center flex-col text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlusIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-500 mb-4 text-sm max-w-md mx-auto">
            {community.is_member
              ? "Be the first to share something with the community!"
              : "Join the community to see and create posts."
            }
          </p>
          {community.is_member && (
            <Button size='sm' onPress={handleCreatePost} className="w-full sm:w-auto !text-xs">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create First Post
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post: CommunityPostType) => (
            <PostCard
              community={community}
              key={post.id}
              post={post}
              onViewDetails={onViewPost}
            />
          ))}

          <Pagination
            initialPage={page}
            total={totalPosts}
            perPage={limit}
          />
        </div>
      )}

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handlePostSuccess}
        community={community}
      />
    </div>
  );
};

export default CommunityPosts;
