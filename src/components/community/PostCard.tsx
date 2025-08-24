import React, { useState } from 'react';
import { CommunityPostType, CommunityType } from '../../types';
import { useLikePost, useDeletePost } from '../../services';
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  TrashIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { formatDistanceToNow } from 'date-fns';
import CreatePostModal from './CreatePostModal';

interface PostCardProps {
  post: CommunityPostType;
  onViewDetails?: (postId: string) => void;
  showCommunityName?: boolean;
  isPostDetails?: boolean;
  community: CommunityType
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  community,
  onViewDetails,
  showCommunityName = false,
  isPostDetails = false
}) => {

  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<CommunityPostType | null>(null);

  const handleLike = () => likeMutation.mutate(post.id);
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );

    if (confirmDelete) {
      deleteMutation.mutate(post.id);
    }
  };
  const handleEdit = () => {
    setEditingPost(post);
    setIsEditModalOpen(true);
  };
  const handleViewDetails = () => onViewDetails?.(post.id);

  const shouldTruncate = !isPostDetails;
  const truncatedContent =
    shouldTruncate && post.content.length > 200
      ? post.content.substring(0, 200) + '...'
      : post.content;

  const handleDropdownChange = (key: string) => {
    if (key === 'edit') handleEdit();
    if (key === 'delete') handleDelete();
  };

  return (
    <>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow transition-all duration-200 group w-full">

        {/* ========= HEADER ========= */}
        <div className="flex items-start flex-wrap  justify-between mb-5 space-y-3">

          {/* Author Info */}
          <div className="flex items-center space-x-3 min-w-0">

            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-sm">
                  {post.author.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-full">

              <div className="flex items-center space-x-2 mb-0">
                <h4 className="font-semibold text-gray-900 text-sm">
                  {post.author.name}
                </h4>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full flex-shrink-0">
                  {post.author.role}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </span>
                {showCommunityName && (
                  <>
                    <span>•</span>
                    <span className="text-primary font-medium truncate">
                      {post.community_name}
                    </span>
                  </>
                )}
              </div>

            </div>

          </div>

          {/* ========= EDIT / DELETE (Author Only) ========= */}
          <div className="flex items-center gap-3">
            {/* Author can edit their own post */}
            {post.is_author && (
              <button
                onClick={() => handleDropdownChange('edit')}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-xs">
                <PencilSquareIcon className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}

            {/* Author can delete their own post, or Admin can delete any post */}
            {(post.is_author || community.is_admin) && (
              <button
                onClick={() => handleDropdownChange('delete')}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs">
                <TrashIcon className="size-4" />
                <span>Delete</span>
              </button>
            )}
          </div>


        </div>

        {/* ========= CONTENT ========= */}
        <div className="mb-4">

          <h3 onClick={handleViewDetails} className="font-semibold text-gray-900 text-sm md:text-base mb-3 hover:text-primary/90 cursor-pointer">
            {post.title}
          </h3>

          <p className={`text-gray-600 text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${shouldTruncate ? 'line-clamp-3' : ''
            }`}>
            {truncatedContent}
          </p>

          {shouldTruncate && post.content.length > 200 && (
            <button
              onClick={handleViewDetails}
              className="text-primary hover:text-primary/80 text-xs font-medium mt-2">
              Read more...
            </button>
          )}

        </div>

        {/* ========= IMAGES ========= */}
        {post.images && post.images.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {post.images.map((image, index) => (
                <img key={index} src={image} alt={`Post image ${index + 1}`} className="w-full h-36 sm:h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* ========= TAGS ========= */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ========= FOOTER ========= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 space-y-3 sm:space-y-0">

          <div className="flex items-center space-x-4">

            <button onClick={handleLike} disabled={likeMutation.isPending}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
              {post.is_liked ? (
                <HeartSolidIcon className="size-5 text-red-500" />
              ) : (
                <HeartIcon className="size-5" />
              )}
              <span className="text-xs">{post.likes_count}</span>
            </button>

            <button onClick={handleViewDetails} className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors">
              <ChatBubbleOvalLeftIcon className="size-5" />
              <span className="text-xs ">{post.comments_count}</span>
            </button>

          </div>

        </div>

      </div>

      {editingPost && (
        <CreatePostModal
          community={community}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingPost(null);
          }}
          post={post}
        />
      )}

    </>
  );
};

export default PostCard;
