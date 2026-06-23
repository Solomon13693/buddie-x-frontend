import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CustomInput, TextArea } from '../components/form';
import { Button } from '../components/ui';
import { GoBack } from '../components';
import { useGetCommunities, useCreatePost, useJoinCommunity } from '../services';
import { getErrorMessage } from '../utils';
import toast from 'react-hot-toast';
import { PlusIcon, TrashIcon, PhotoIcon } from '@heroicons/react/24/outline';

const validationSchema = Yup.object({
    community_id: Yup.string().required('Please select a community'),
    title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
    content: Yup.string().required('Question is required').min(10, 'Please write at least 10 characters'),
    tags: Yup.array().of(Yup.string()),
});

const AskQuestionView = () => {
    const navigate = useNavigate();
    const createPost = useCreatePost();
    const joinCommunity = useJoinCommunity();

    const { data: communitiesData, isLoading: communitiesLoading } = useGetCommunities(1, 100);
    const communities = communitiesData?.data || [];

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            // Auto-join the community so the user can post
            try { await joinCommunity.mutateAsync(values.community_id); } catch (_) {}

            await createPost.mutateAsync({
                title: values.title,
                content: values.content,
                community_id: values.community_id,
                tags: values.tags.filter((t: string) => t.trim() !== ''),
                images: values.images,
            });
            toast.success('Your question has been posted!');
            navigate(`../communities/${values.community_id}`);
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen space-y-6 p-2 md:p-4">

            <GoBack label="Back" />

            <div className="bg-white rounded-xl p-5 sm:p-8">

                <h1 className="text-lg font-semibold text-gray-900 mb-1">Ask a Question</h1>
                <p className="text-xs text-gray-400 mb-6">
                    Share your question with a community and get answers from mentors and peers.
                </p>

                <Formik
                    initialValues={{ community_id: '', title: '', content: '', tags: [''], images: [] as File[] }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, isSubmitting, errors, touched }) => (
                        <Form className="space-y-5">

                            {/* Community Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Community <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={values.community_id}
                                    onChange={(e) => setFieldValue('community_id', e.target.value)}
                                    className="form-control w-full"
                                    disabled={communitiesLoading}
                                >
                                    <option value="">
                                        {communitiesLoading ? 'Loading communities...' : 'Select a community'}
                                    </option>
                                    {communities.map((c: any) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                                {touched.community_id && errors.community_id && (
                                    <p className="text-xs text-red-500 mt-1">{errors.community_id as string}</p>
                                )}
                            </div>

                            <CustomInput
                                name="title"
                                label="Question Title"
                                placeholder="e.g. How do I transition from engineering to product management?"
                            />

                            <TextArea
                                name="content"
                                label="Details"
                                placeholder="Give more context — what have you tried, what are you struggling with?"
                                rows={6}
                            />

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags <span className="text-gray-400 font-normal">(Optional)</span>
                                </label>
                                <div className="space-y-2">
                                    {values.tags.map((tag: string, index: number) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={tag}
                                                onChange={(e) => {
                                                    const newTags = [...values.tags];
                                                    newTags[index] = e.target.value;
                                                    setFieldValue('tags', newTags);
                                                }}
                                                placeholder="e.g. career, product"
                                                className="flex-1 form-control"
                                            />
                                            {values.tags.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setFieldValue('tags', values.tags.filter((_: string, i: number) => i !== index))}
                                                    className="text-red-400 hover:text-red-500"
                                                >
                                                    <TrashIcon className="size-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            onClick={() => setFieldValue('tags', [...values.tags, ''])}
                                            className="text-primary hover:text-primary/80 text-xs bg-gray-100 size-7 rounded-full flex items-center justify-center"
                                        >
                                            <PlusIcon className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Images <span className="text-gray-400 font-normal">(Optional)</span>
                                </label>
                                <label
                                    htmlFor="ask-image-upload"
                                    className="cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-primary/40 transition-colors"
                                >
                                    <PhotoIcon className="w-8 h-8 text-gray-300" />
                                    <p className="text-xs text-gray-500">
                                        <span className="text-primary font-medium">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                </label>
                                <input
                                    id="ask-image-upload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setFieldValue('images', Array.from(e.target.files || []))}
                                />
                                {values.images.length > 0 && (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                                        {values.images.map((file: File, index: number) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setFieldValue('images', values.images.filter((_: File, i: number) => i !== index))}
                                                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Button
                                    type="submit"
                                    color="primary"
                                    loading={isSubmitting}
                                    isDisabled={isSubmitting}
                                >
                                    Post Question
                                </Button>
                                <Button
                                    type="button"
                                    variant="bordered"
                                    onPress={() => navigate(-1)}
                                    isDisabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AskQuestionView;
