import { useParams } from 'react-router-dom';
import { Container, GoBack, Pagination } from '../components';
import { PostCard, CommentCard } from '../components/community';
import { useGetPostDetails, useGetPostComments, useCreateComment, useGetCommunityDetails } from '../services';
import { Button } from '../components/ui';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useGoBack } from '../lib';
import { useQueryParams } from '../utils';
import { useRef, useState } from 'react';

const PostDetailsView = () => {

  const { communityId, postId } = useParams<{ communityId: string; postId: string }>();

  const goback = useGoBack();

  const { searchParams } = useQueryParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("perPage")) || 5;

  const { data: community, isLoading: loading } = useGetCommunityDetails(communityId || '');
  const { data: post, isLoading, error } = useGetPostDetails(postId || '');
  const { data: commentsData, isLoading: commentsLoading } = useGetPostComments(postId || '', page, limit);
  const createCommentMutation = useCreateComment();
  const commentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [showCommentSuccess, setShowCommentSuccess] = useState(false);
  const [commentError, setCommentError] = useState('');

  const pagination = commentsData?.pagination
  const comments = commentsData?.data || [];

  const handleCreateComment = async (content: string, parentId?: string) => {
    if (!postId) return;

    setCommentError('');
    try {
      await createCommentMutation.mutateAsync({
        post_id: postId,
        content,
        parent_id: parentId
      });
      // Clear the textarea after successful comment creation
      if (commentTextareaRef.current) {
        commentTextareaRef.current.value = '';
      }
      setShowCommentSuccess(true);
      setTimeout(() => setShowCommentSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating comment:', error);
      setCommentError('Failed to post comment. Please try again.');
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-[90vh] bg-gray-50">
        <Container>
          <div className="py-4 sm:py-6 lg:py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="bg-white rounded-xl p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center">
        <Container>
          <div className="flex justify-center mx-auto flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowLeftIcon className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Post Not Found</h2>
            <p className="text-gray-600 text-sm mb-4">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <button onClick={goback} className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 text-sm">
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-5 p-2 md:p-4">

      <GoBack label='Back to Community' />

      {/* Post Details */}
      <div className="mb-6 sm:mb-8">
        <PostCard
          post={post}
          isPostDetails={true}
          community={community}
          showCommunityName={true}
        />
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">

        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base font-semibold text-gray-900">
            Comments ({comments.length})
          </h3>
        </div>

        {/* Add Comment */}
        <div className="mb-5 p-3 bg-gray-50 rounded-lg">

          <textarea
            ref={commentTextareaRef}
            placeholder="Write a comment..."
            className="w-full text-xs p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                const content = e.currentTarget.value.trim();
                if (content) {
                  handleCreateComment(content);
                }
              }
            }}
          />

          <div className="flex justify-between items-center flex-wrap gap-3 mt-3">
            <span className="text-xs text-gray-500">
              Press Ctrl+Enter to post
            </span>
            <Button
              size="sm"
              color="primary"
              className='rounded-lg text-[12.5px]'
              onPress={() => {
                if (commentTextareaRef.current) {
                  const content = commentTextareaRef.current.value.trim();
                  if (content) {
                    handleCreateComment(content);
                  }
                }
              }}
              loading={createCommentMutation.isPending}
              isDisabled={createCommentMutation.isPending}>
              Post Comment
            </Button>
          </div>

          {commentError && (
            <div className="text-red-500 text-xs bg-red-50 p-2 rounded mt-3">
              {commentError}
            </div>
          )}

          {showCommentSuccess && (
            <div className="text-green-600 text-xs bg-green-50 p-2 rounded mt-3 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Comment posted successfully!
            </div>
          )}

        </div>

        {/* Comments List */}
        {commentsLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm md:text-base">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-4">

            {comments.map((comment: any) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                postId={postId || ''}
              />
            ))}

            <Pagination className="mt-10" perPage={limit} total={pagination.total || 0} />

          </div>
        )}
      </div>

    </div>
  );
};

export default PostDetailsView;
