import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { PopupModal } from '../ui';
import { CustomInput, CustomSelect, CustomFileInput, TextArea } from '../form';
import { Button } from '../ui';
import { useCreateCommunity, useUpdateCommunity, useDeleteCommunity } from '../../services';
import { CommunityType } from '../../types';
import { TrashIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils';
import { useNavigate } from 'react-router-dom';

interface CreateCommunityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    community?: CommunityType | null;
}

const COMMUNITY_CATEGORIES = [
    'Technology',
    'Business',
    'Education',
    'Health & Wellness',
    'Arts & Culture',
    'Sports',
    'Science',
    'Finance',
    'Marketing',
    'Design',
    'Programming',
    'Leadership',
    'Career Development',
    'Personal Growth',
    'Other'
];

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    community
}) => {

    const isEditMode = !!community;
    const createMutation = useCreateCommunity();
    const updateMutation = useUpdateCommunity();
    const deleteMutation = useDeleteCommunity();

    const navigate = useNavigate()

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Community name is required')
            .min(3, 'Name must be at least 3 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(10, 'Description must be at least 10 characters'),
        category: Yup.string().required('Category is required'),
        is_private: Yup.boolean(),
        rules: Yup.array().of(Yup.string()),
        tags: Yup.array().of(Yup.string()),
        avatar: Yup.mixed().when('$isEditMode', {
            is: false,
            then: (schema) => schema.required('Avatar is required'),
            otherwise: (schema) => schema.nullable()
        }),
        cover_image: Yup.mixed().when('$isEditMode', {
            is: false,
            then: (schema) => schema.required('Cover Image is required'),
            otherwise: (schema) => schema.nullable()
        })
    });

    const initialValues = {
        name: community?.name || '',
        description: community?.description || '',
        category: community?.category || '',
        is_private: community?.is_private || false,
        rules: community?.rules || [''],
        tags: community?.tags || [''],
        cover_image: null, 
        avatar: null
    };

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            const communityData = {
                name: values.name,
                description: values.description,
                category: values.category,
                is_private: values.is_private,
                rules: values.rules.filter((rule: string) => rule.trim() !== ''),
                tags: values.tags.filter((tag: string) => tag.trim() !== ''),
                cover_image: values.cover_image,
                avatar: values.avatar
            };

            if (isEditMode && community) {
                await updateMutation.mutateAsync({ communityId: community.id, data: communityData });
            } else {
                await createMutation.mutateAsync(communityData);
            }

            onSuccess();
            onClose();
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!community) return;

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this community? This action cannot be undone."
        );

        if (confirmDelete) {
            try {
                await deleteMutation.mutateAsync(community.id);
                onSuccess();
                onClose();
                navigate('/mentor/dashboard/communities')
            } catch (error) {
                toast.error(getErrorMessage(error))
            }
        }
    };


    return (
        <PopupModal isOpen={isOpen} onClose={onClose} size="2xl">
            <div className="py-4 sm:py-5">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 text-center sm:text-left">
                    {isEditMode ? 'Edit Community' : 'Create New Community'}
                </h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                    context={{ isEditMode }}>

                    {({ values, setFieldValue, isSubmitting }) => (
                        <Form className="space-y-4 sm:space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CustomInput
                                    name="name"
                                    label="Community Name"
                                    placeholder="Enter community name"
                                />
                                <CustomSelect name="category" label="Category">
                                    <option value="">Select a category</option>
                                    {COMMUNITY_CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </CustomSelect>
                            </div>

                            <TextArea
                                name="description"
                                label="Description"
                                placeholder="Describe your community..."
                                rows={4}
                            />

                            {/* Privacy Setting */}
                            {/* <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="is_private"
                                    checked={values.is_private}
                                    onChange={(e) => setFieldValue('is_private', e.target.checked)}
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="is_private" className="text-sm text-gray-700">
                                    Make this community private
                                </label>
                            </div> */}

                            {/* Images */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CustomFileInput
                                    name="avatar"
                                    label="Community Avatar"
                                />
                                <CustomFileInput
                                    name="cover_image"
                                    label="Cover Image"
                                // description="Upload a cover image for your community"
                                />
                            </div>

                            {/* Rules */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Community Rules
                                </label>
                                <div className="space-y-2">
                                    {values.rules.map((rule: string, index: number) => (
                                        <div key={index} className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={rule}
                                                onChange={(e) => {
                                                    const newRules = [...values.rules];
                                                    newRules[index] = e.target.value;
                                                    setFieldValue('rules', newRules);
                                                }}
                                                placeholder={`Rule ${index + 1}`}
                                                className="flex-1 form-control"
                                            />
                                            {values.rules.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newRules = values.rules.filter((_: string, i: number) => i !== index);
                                                        setFieldValue('rules', newRules);
                                                    }} className="text-error-400 hover:text-error-500">
                                                    <TrashIcon className='size-4' />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setFieldValue('rules', [...values.rules, ''])}
                                        className="text-primary hover:text-primary/80 text-xs">
                                        + Add Rule
                                    </button>
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags
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
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setFieldValue('tags', [...values.tags, ''])}
                                        className="text-primary hover:text-primary/80 text-xs mt-2">
                                        + Add Tag
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                <Button
                                    type="submit"
                                    color="primary"
                                    loading={isSubmitting}
                                    isDisabled={isSubmitting}
                                    fullWidth>
                                    {isEditMode ? 'Update Community' : 'Create Community'}
                                </Button>

                                {isEditMode && (
                                    <Button
                                        type="button"
                                        color="danger"
                                        variant="bordered"
                                        onPress={handleDelete}
                                        loading={deleteMutation.isPending}
                                        fullWidth
                                        isDisabled={deleteMutation.isPending}>
                                        Delete Community
                                    </Button>
                                )}

                                <Button
                                    type="button"
                                    variant="bordered"
                                    onPress={onClose}
                                    isDisabled={isSubmitting}
                                >
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

export default CreateCommunityModal;
