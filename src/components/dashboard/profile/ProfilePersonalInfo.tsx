import { Form, Formik } from 'formik';
import { CustomAutocomplete, CustomInput, CustomPhoneInput, CustomSelect, TextArea } from '../../form';
import { Button } from '../../ui';
import { countries, languages } from '../../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, getUserProfile } from '../../../redux/features/authSlice';
import { profilePersonalInfoSchema } from '../../../utils/schema';
import { useState } from 'react';
import { updateProfile } from '../../../services';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../../utils';
import { AppDispatch } from '../../../redux/store';

const ProfilePersonalInfo = () => {

    const [ loading, setLoading ] = useState(false)
    const profile = useSelector(getUserProfile)
    const dispatch = useDispatch<AppDispatch>()

    const initialValues: any = {
        fullname: profile?.fullname || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        gender: profile?.gender || '',
        country: profile?.country
            ? { value: profile.country.iso, label: profile.country.name }
            : null,
        bio: profile?.bio || '',
        languages: profile?.languages || [],
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={profilePersonalInfoSchema}
            enableReinitialize
            onSubmit={async (values) => {

                setLoading(true)

                const payload = {
                    ...values,
                    country: {
                        iso: values.country?.value || '',
                        name: values.country?.label || '',
                    },
                };

                try {

                    const response = await updateProfile(payload)
                    toast.success(response?.message)

                        dispatch(fetchProfile());

                } catch (error) {
                    toast.error(getErrorMessage(error))
                } finally {
                    setLoading(false)
                }

            }}>

            {() => (

                <Form className="space-y-4" autoComplete="off">

                    <CustomInput
                        label="Full name"
                        name="fullname"
                        type="text"
                        placeholder="Jone Doe"
                    />

                    <CustomInput
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="jonedoe@example.com"
                        disabled
                    />

                    <CustomPhoneInput className='py-1.5' name="phone" label="Phone number" placeholder="Enter phone number" />

                    <CustomSelect label="Gender" name="gender">
                        <option value=""> Select Gender </option>
                        <option value="male"> Male </option>
                        <option value="female"> Female </option>
                    </CustomSelect>

                    <CustomAutocomplete
                        name="country"
                        label="Country"
                        options={countries}
                        returnObject
                    />

                    <CustomAutocomplete
                        name="languages"
                        label="Languages spoken"
                        options={languages.map((item: any) => ({
                            value: item.name,
                            label: item.name,
                        }))}
                        multiple
                    />

                    <TextArea
                        label="About"
                        name="bio"
                        className="h-24"
                        placeholder="Write a brief introduction about yourself"
                    />

                    <Button loading={loading} type="submit" className="bg-black py-6 w-full" >
                        Update
                    </Button>

                </Form>
            )}
        </Formik>
    )
}

export default ProfilePersonalInfo