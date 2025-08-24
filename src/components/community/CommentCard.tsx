import React, { useState } from 'react';
import { CommunityCommentType } from '../../types';
import { useLikeComment, useDeleteComment, useUpdateComment, useCreateComment } from '../../services';
import {
  HeartIcon,
  TrashIcon,
  PencilSquareIcon,
  ChatBubbleOvalLeftIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../ui';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils';

interface CommentCardProps {
  comment: CommunityCommentType;
  onReply?: (commentId: string) => void;
  onEdit?: (comment: CommunityCommentType) => void;
  onDelete?: (commentId: string) => void;
  showReplies?: boolean;
  postId: string;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  showReplies = true,
  postId
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState('');
  const [editError, setEditError] = useState('');
  const [replyError, setReplyError] = useState('');
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showReplySuccess, setShowReplySuccess] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyContent, setEditingReplyContent] = useState('');
  const editTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  const replyTextareaRef = React.useRef<HTMLTextAreaElement>(null);

  const likeMutation = useLikeComment();
  const deleteMutation = useDeleteComment();
  const updateCommentMutation = useUpdateComment();
  const createCommentMutation = useCreateComment();

  const handleLike = () => {
    likeMutation.mutate(comment.id);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this comment? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    if (onDelete) {
      onDelete(comment.id);
    } else {
      deleteMutation.mutate(comment.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(comment);
    } else {
      setIsEditing(true);
      setEditContent(comment.content);
      setTimeout(() => editTextareaRef.current?.focus(), 100);
    }
  };

  const handleSaveEdit = async () => {
    if (editContent.trim() === '') return;

    setEditError('');
    try {
      await updateCommentMutation.mutateAsync({
        commentId: comment.id,
        content: editContent.trim()
      });
      setIsEditing(false);
      setShowEditSuccess(true);
      setTimeout(() => setShowEditSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating comment:', error);
      setEditError('Failed to update comment. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleReply = () => {
    if (onReply) {
      onReply(comment.id);
    } else {
      setIsReplying(!isReplying);
      setTimeout(() => {
        replyTextareaRef.current?.focus();
      }, 100);
    }
  };

  const handleSubmitReply = async () => {
    if (replyContent.trim() === '') return;

    setReplyError('');
    try {

      await createCommentMutation.mutateAsync({
        content: replyContent.trim(),
        post_id: postId,
        parent_id: comment.id
      });

      setIsReplying(false);
      setReplyContent('');
      setShowReplySuccess(true);
      setTimeout(() => setShowReplySuccess(false), 3000);
    } catch (error) {
      toast.error(getErrorMessage(error))
      setReplyError('Failed to post reply. Please try again.');
    }
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyContent('');
  };

  const handleEditReply = (reply: CommunityCommentType) => {
    setEditingReplyId(reply.id);
    setEditingReplyContent(reply.content);
  };

  const handleSaveReplyEdit = async () => {
    if (!editingReplyId || editingReplyContent.trim() === '') return;

    try {
      await updateCommentMutation.mutateAsync({
        commentId: editingReplyId,
        content: editingReplyContent.trim()
      });
      setEditingReplyId(null);
      setEditingReplyContent('');
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  };

  const handleCancelReplyEdit = () => {
    setEditingReplyId(null);
    setEditingReplyContent('');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
          {comment.author.avatar ? (
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-xs">
              {comment.author.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h4 className="font-medium text-gray-900 text-sm">{comment.author.name}</h4>
              <span className="px-2 py-1 bg-primary/10 text-primary text-[12px] rounded-full w-fit">
                {comment.author.role}
              </span>
              <span className="text-[12px] text-gray-500">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                {comment.updated_at !== comment.created_at && (
                  <span className="text-gray-400 ml-1">(edited)</span>
                )}
              </span>
            </div>
          </div>

          {/* Edit Mode */}
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                ref={editTextareaRef}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full text-xs p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
                placeholder="Edit your comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    e.preventDefault();
                    handleSaveEdit();
                  }
                  if (e.key === 'Escape') {
                    handleCancelEdit();
                  }
                }}
                disabled={updateCommentMutation.isPending}
              />
              {editError && (
                <div className="text-red-500 text-xs bg-red-50 p-2 rounded">
                  {editError}
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  color="primary"
                  onPress={handleSaveEdit}
                  loading={updateCommentMutation.isPending}
                  isDisabled={updateCommentMutation.isPending}
                  className="flex items-center gap-1 text-[12px] rounded-lg">
                  Save
                </Button>
                <Button
                  size="sm"
                  color="secondary"
                  onPress={handleCancelEdit}
                  isDisabled={updateCommentMutation.isPending}
                  className="flex items-center gap-1 text-[12px] rounded-lg">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-700 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>

              {showEditSuccess && (
                <div className="text-green-600 text-xs bg-green-50 p-2 rounded mt-2 flex items-center gap-1">
                  <CheckIcon className="w-4 h-4" />
                  Comment updated successfully!
                </div>
              )}

              {showReplySuccess && (
                <div className="text-green-700 text-sm bg-green-50 p-3 rounded-lg mt-3 border border-green-200 flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium">Reply posted successfully!</span>
                </div>
              )}

              {/* Comment Actions */}
              <div className="flex items-cente gap-3 flex-wrap mt-3">
                <button
                  onClick={handleLike}
                  disabled={likeMutation.isPending}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                  aria-label={`${comment.is_liked ? 'Unlike' : 'Like'} comment`}>
                  {comment.is_liked ? (
                    <HeartSolidIcon className="size-4 text-red-500" />
                  ) : (
                    <HeartIcon className="size-4" />
                  )}
                  <span className="text-xs">{comment.likes_count}</span>
                </button>

                <button
                  onClick={handleReply}
                  className='flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors'
                  aria-label="Reply to comment">
                  <ChatBubbleOvalLeftIcon className="size-4" />
                  <span className="text-xs font-medium">
                    Reply
                    {comment.replies && comment.replies.length > 0 && (
                      <span className="ml-1 text-gray-400">({comment.replies.length})</span>
                    )}
                  </span>
                </button>

                {comment.is_author && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-xs"
                      aria-label="Edit comment">
                      <PencilSquareIcon className="size-4" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs"
                      aria-label="Delete comment">
                      <TrashIcon className="size-4" />
                      <span>Delete</span>
                    </button>
                  </>
                )}
              </div>

              {/* Reply Form */}
              {isReplying && (
                <div className="mt-4">
                  <textarea
                    ref={replyTextareaRef}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply here..."
                    className="form-control"
                    rows={3}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.ctrlKey) {
                        e.preventDefault();
                        handleSubmitReply();
                      }
                      if (e.key === 'Escape') {
                        handleCancelReply();
                      }
                    }}
                    disabled={createCommentMutation.isPending}
                  />
                  {replyError && (
                    <div className="text-red-500 text-xs bg-red-50 p-3 rounded-lg mt-3 border border-red-200">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {replyError}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 mt-3">

                    <Button size="sm" color="secondary" onPress={handleCancelReply} isDisabled={createCommentMutation.isPending}
                      className="flex items-center gap-1 border border-gray-300 rounded-lg !text-[11px]">
                      Cancel
                    </Button>

                    <Button size="sm" color="primary" onPress={handleSubmitReply} loading={createCommentMutation.isPending}
                      isDisabled={createCommentMutation.isPending}
                      className="flex items-center gap-1 rounded-lg !text-[11px]">
                      Post Reply
                    </Button>

                  </div>

                </div>
              )}
            </>
          )}

          {/* Replies */}
          {showReplies && comment.replies && comment.replies.length > 0 && (
            <div className="mt-6 space-y-3">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="ml-2 sm:ml-4 border-l-2 border-gray-100 pl-3 sm:pl-4">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                      {reply.author.avatar ? (
                        <img
                          src={reply.author.avatar}
                          alt={reply.author.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold text-xs">
                          {reply.author.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                        <h5 className="font-medium text-gray-900 text-sm">{reply.author.name}</h5>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full w-fit">
                          {reply.author.role}
                        </span>
                        <span className="text-[12px] text-gray-500">
                          {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                          {reply.updated_at !== reply.created_at && (
                            <span className="text-gray-400 ml-1">(edited)</span>
                          )}
                        </span>
                      </div>

                      {/* Reply Edit Mode */}
                      {editingReplyId === reply.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editingReplyContent}
                            onChange={(e) => setEditingReplyContent(e.target.value)}
                            className="w-full text-xs p-2 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            rows={2}
                            placeholder="Edit your reply..."
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.ctrlKey) {
                                e.preventDefault();
                                handleSaveReplyEdit();
                              }
                              if (e.key === 'Escape') {
                                handleCancelReplyEdit();
                              }
                            }}
                            disabled={updateCommentMutation.isPending}
                          />
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              color="primary"
                              onPress={handleSaveReplyEdit}
                              loading={updateCommentMutation.isPending}
                              isDisabled={updateCommentMutation.isPending}
                              className="flex items-center gap-1 rounded-lg text-[12px]"
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              color="secondary"
                              onPress={handleCancelReplyEdit}
                              isDisabled={updateCommentMutation.isPending}
                              className="flex items-center gap-1 rounded-lg text-[12px]"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-700 text-xs leading-relaxed">
                            {reply.content}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <button
                              onClick={() => likeMutation.mutate(reply.id)}
                              disabled={likeMutation.isPending}
                              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                              aria-label={`${reply.is_liked ? 'Unlike' : 'Like'} reply`}>
                              {reply.is_liked ? (
                                <HeartSolidIcon className="size-4 text-red-500" />
                              ) : (
                                <HeartIcon className="size-4" />
                              )}
                              <span className="text-xs">{reply.likes_count}</span>
                            </button>

                            {reply.is_author && (
                              <>
                                <button
                                  onClick={() => handleEditReply(reply)}
                                  className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-xs"
                                  aria-label="Edit reply"
                                >
                                  <PencilSquareIcon className="size-4" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => deleteMutation.mutate(reply.id)}
                                  className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs"
                                  aria-label="Delete reply"
                                >
                                  <TrashIcon className="size-4" />
                                  <span>Delete</span>
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CommentCard;
