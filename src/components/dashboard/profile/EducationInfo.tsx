import { Form, Formik, FieldArray } from 'formik';
import { CustomInput } from '../../form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, getUserProfile } from '../../../redux/features/authSlice';
import { useState } from 'react';
import { updateProfile } from '../../../services';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../../utils';
import { AppDispatch } from '../../../redux/store';
import { PlusIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import { educationSchema } from '../../../utils/schema';
import { EducationType } from '../../../types';

const EducationInfo = () => {
    const [loading, setLoading] = useState(false);
    const profile = useSelector(getUserProfile);
    const dispatch = useDispatch<AppDispatch>();

    const initialValues = {
        education: profile?.education?.length
            ? profile?.education
            : [
                {
                    id: '',
                    institution: '',
                    degree: '',
                    field_of_study: '',
                    start_date: '',
                    end_date: '',
                },
            ],
    };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={educationSchema}
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
            {({ values }) => (
                <Form className="space-y-4 divide-y" autoComplete="off">
                    <FieldArray
                        name="education"
                        render={(arrayHelpers) => (
                            <>
                                {values.education.map((_: EducationType, index: number) => (
                                    <div className='pt-4' key={index}>

                                        <div className="grid grid-cols-2 gap-4">

                                            <CustomInput
                                                label="Institution"
                                                name={`education[${index}].institution`}
                                                type="text"
                                                placeholder="University Name"
                                            />

                                            <CustomInput
                                                label="Degree"
                                                name={`education[${index}].degree`}
                                                type="text"
                                                placeholder="Bachelor's, Master's, etc."
                                            />

                                        </div>

                                        <CustomInput
                                            label="Field of Study"
                                            name={`education[${index}].field_of_study`}
                                            type="text"
                                            placeholder="Computer Science, Business, etc."
                                        />

                                        <div className="grid grid-cols-2 gap-4">

                                            <CustomInput
                                                label="Start Date"
                                                name={`education[${index}].start_date`}
                                                type="date"
                                            />

                                            <CustomInput
                                                label="End Date"
                                                name={`education[${index}].end_date`}
                                                type="date"
                                            />

                                        </div>

                                        <div className="flex items-center gap-3 justify-end mt-2">

                                            {index !== 0 && (
                                                <Button
                                                    type="button"
                                                    isIconOnly
                                                    size="sm"
                                                    onPress={() => arrayHelpers.remove(index)}
                                                    className={`!rounded-lg bg-error-500 text-white`}>
                                                    <TrashIcon className="size-4" />
                                                </Button>
                                            )}

                                            {values.education.length < 3 && (
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    type="button"
                                                    onPress={() =>
                                                        arrayHelpers.push({
                                                            id: '',
                                                            institution: '',
                                                            degree: '',
                                                            field_of_study: '',
                                                            start_date: '',
                                                            end_date: '',
                                                        })
                                                    }
                                                    className="!rounded-lg bg-green-500 text-white">
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
                        Update Education
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default EducationInfo;
