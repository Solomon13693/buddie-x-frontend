import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { PopupModal } from '../ui';
import { CustomInput, TextArea } from '../form';
import { Button } from '../ui';
import { useCreatePost, useUpdatePost } from '../../services';
import { CommunityType, CommunityPostType } from '../../types';
import { getErrorMessage } from '../../utils';
import toast from 'react-hot-toast';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  community: CommunityType;
  post?: CommunityPostType | null;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  content: Yup.string().required('Content is required').min(10, 'Content must be at least 10 characters'),
  tags: Yup.array().of(Yup.string())
});

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  community,
  post
}) => {
  const isEditMode = !!post;
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();

  const initialValues = {
    title: post?.title || '',
    content: post?.content || '',
    tags: post?.tags || [''],
    images: [] as File[]
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {

      const postData = {
        title: values.title,
        content: values.content,
        community_id: community.id,
        tags: values.tags.filter((tag: string) => tag.trim() !== ''),
        images: values.images
      };

      if (isEditMode && post) {
        await updateMutation.mutateAsync({ postId: post.id, data: postData });
      } else {
        await createMutation.mutateAsync(postData);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PopupModal isOpen={isOpen} onClose={onClose} size="2xl">
      <div className="py-4 sm:py-5">

        <h1 className="text-base sm:text-lg font-semibold text-gray-900 mb-6 text-center sm:text-left">
          {isEditMode ? 'Edit Post' : 'Create New Post'}
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-4 sm:space-y-6">

              {/* Title */}
              <CustomInput
                name="title"
                label="Post Title"
                placeholder="Enter post title"
              />

              {/* Content */}
              <TextArea
                name="content"
                label="Post Content"
                placeholder="Write your post content..."
                rows={6}
              />

              {/* Image Upload */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images (Optional)
                </label>

                <label htmlFor="image-upload"
                  className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center block">

                  <div className="flex flex-col items-center space-y-2">

                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-primary hover:text-primary/80">
                          Click to upload
                        </span>{' '}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>

                  </div>

                </label>

                <input id="image-upload" type="file" multiple accept="image/*" onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setFieldValue('images', files);
                  }}
                  className="hidden"
                />

                {/* Image Preview */}
                {values.images.length > 0 && (
                  <div className="mt-4">
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                      {values.images.map((file: File, index: number) => (
                        <div key={index} className="relative">
                          <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`}className="w-full h-24 sm:h-32 object-cover rounded-lg" />
                          <button type="button" onClick={() => {
                              const newImages = values.images.filter((_: File, i: number) => i !== index);
                              setFieldValue('images', newImages);
                            }}
                            className="absolute top-1 right-1 sm:top-2 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600">
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>


              {/* Tags */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (Optional)
                </label>

                <div className="space-y-2">

                  {values.tags.map((tag: string, index: number) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => {
                          const newTags = [...values.tags];
                          newTags[index] = e.target.value;
                          setFieldValue('tags', newTags);
                        }}
                        placeholder={`Tag ${index + 1}`}
                        className="flex-1 form-control"
                      />

                      <div className="flex items-center gap-2">

                        {values.tags.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newTags = values.tags.filter((_: string, i: number) => i !== index);
                              setFieldValue('tags', newTags);
                            }} className="text-error-400 hover:text-error-500">
                            <TrashIcon className='size-4' />
                          </button>

                        )}

                      </div>

                    </div>

                  ))}

                  <div className="flex justify-end mt-3">
                    <button
                      type="button"
                      onClick={() => setFieldValue('tags', [...values.tags, ''])}
                      className="text-primary hover:text-primary/80 text-xs bg-gray-200 size-7 rounded-full
                      flex items-center justify-center">
                      <PlusIcon className='size-5' />
                    </button>
                  </div>

                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  type="submit"
                  color="primary"
                  loading={isSubmitting}
                  isDisabled={isSubmitting}>
                  {isEditMode ? 'Update Post' : 'Create Post'}
                </Button>

                <Button
                  type="button"
                  variant="bordered"
                  onPress={onClose}
                  isDisabled={isSubmitting}>
                  Cancel
                </Button>
                
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </PopupModal>
  );
};

export default CreatePostModal;
