import { Form, Formik, FieldArray, Field } from 'formik';
import { CustomInput, TextArea } from '../../form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, getUserProfile } from '../../../redux/features/authSlice';
import { useState } from 'react';
import { updateProfile } from '../../../services';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../../utils';
import { AppDispatch } from '../../../redux/store';
import { PlusIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Checkbox, Button } from '@heroui/react';
import { workExperienceSchema } from '../../../utils/schema';
import { WorkExperienceType } from '../../../types';

const WorkExperience = () => {
    const [loading, setLoading] = useState(false);
    const profile = useSelector(getUserProfile);
    const dispatch = useDispatch<AppDispatch>();

    console.log()

    const initialValues = {
        work_experiences: profile?.work_experience?.length
            ? profile.work_experience
            : [
                {
                    id: '',
                    employer: '',
                    title: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    is_current: false,
                },
            ],
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={workExperienceSchema}
            enableReinitialize
            onSubmit={async (values) => {
                setLoading(true);

                try {

                    const response = await updateProfile(values);
                    toast.success(response?.message);

                    dispatch(fetchProfile());

                } catch (error) {
                    toast.error(getErrorMessage(error));
                } finally {
                    setLoading(false);
                }
            }}
        >
            {({ values, setFieldValue }) => (
                <Form className="space-y-4 divide-y" autoComplete="off">
                    <FieldArray
                        name="work_experiences"
                        render={(arrayHelpers) => (
                            <>
                                {values.work_experiences.map((_: WorkExperienceType, index: number) => (
                                    <div className='pt-4 space-y-3' key={index}>
                                        <div className="grid grid-cols-2 gap-4">
                                            <CustomInput
                                                label="Employer"
                                                name={`work_experiences[${index}].employer`}
                                                type="text"
                                                placeholder="Company Name"
                                            />
                                            <CustomInput
                                                label="Title"
                                                name={`work_experiences[${index}].title`}
                                                type="text"
                                                placeholder="Job Title"
                                            />
                                        </div>

                                        <TextArea
                                            label="Description"
                                            name={`work_experiences[${index}].description`}
                                            placeholder="Job Description"
                                        />

                                        <div className="inline-flex w-full items-center gap-5">
                                            <CustomInput
                                                formGroupClass='!w-full'
                                                label="Start Date"
                                                name={`work_experiences[${index}].start_date`}
                                                type="date"
                                            />

                                            <Field name={`work_experiences[${index}].is_current`}>
                                                {({ field }: { field: { name: string; value: boolean } }) => (
                                                    <Checkbox
                                                        radius='sm'
                                                        color='primary'
                                                        isSelected={field.value}
                                                        onChange={() => {
                                                            const newValue = !field.value;
                                                            setFieldValue(`work_experiences[${index}].is_current`, newValue);
                                                            if (newValue) {
                                                                setFieldValue(`work_experiences[${index}].end_date`, '');
                                                            }
                                                        }}
                                                        className='!mt-2'
                                                        classNames={{ label: '!text-xs' }}
                                                    >
                                                        Present
                                                    </Checkbox>
                                                )}
                                            </Field>
                                        </div>

                                        {!values.work_experiences[index].is_current && (
                                            <CustomInput
                                                label="End Date"
                                                name={`work_experiences[${index}].end_date`}
                                                type="date"
                                            />
                                        )}

                                        <div className="flex items-center gap-3 justify-end mt-2">
                                            {index !== 0 && (
                                                <Button
                                                    type="button"
                                                    isIconOnly
                                                    size="sm"
                                                    onPress={() => arrayHelpers.remove(index)}
                                                    className="!rounded-lg bg-error-500 text-white"
                                                >
                                                    <TrashIcon className="size-4" />
                                                </Button>
                                            )}

                                            {values.work_experiences.length < 5 && (
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    type="button"
                                                    onPress={() =>
                                                        arrayHelpers.push({
                                                            id: '',
                                                            employer: '',
                                                            title: '',
                                                            description: '',
                                                            start_date: '',
                                                            end_date: '',
                                                            is_current: false,
                                                        })
                                                    }
                                                    className="!rounded-lg bg-green-500 text-white"
                                                >
                                                    <PlusIcon className="size-4" />
                                                </Button>
                                            )}
                                        </div>

                                    </div>
                                ))}
                            </>
                        )}
                    />

                    <Button isLoading={loading} type="submit" className="w-full text-xs py-6 bg-black text-white">
                        Update Work Experience
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default WorkExperience;
