import { Form, Formik } from "formik";
import { CustomAutocomplete, CustomInput, CustomSelect } from "../../form";
import { Button } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, getUserProfile } from "../../../redux/features/authSlice";
import { useState } from "react";
import { updateProfile } from "../../../services";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils";
import { AppDispatch } from "../../../redux/store";
import { MenteeProfileSchema } from "../../../utils/schema";


const MenteeProfile = () => {

    const dispatch = useDispatch<AppDispatch>()
    const profile = useSelector(getUserProfile)
    const [loading, setLoading] = useState(false)

    const { expertises = [], skills = [], industries = [] } = useSelector((state: any) => state.general);

    const initialValues = {
        title: profile?.title || '',
        employer: profile?.employer || '',
        level: profile?.level || '',
        expertise: profile?.expertise || [],
        skills: profile?.skills || [],
        industries: profile?.industries || [],
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={MenteeProfileSchema}
            enableReinitialize
            onSubmit={async (values) => {

                setLoading(true)

                try {

                    const response = await updateProfile(values)
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
                        label="Title"
                        name="title"
                        type="text"
                        placeholder="Eg. Product Designer, Student"
                    />

                    <CustomInput
                        label="Company/School"
                        name="employer"
                        type="text"
                        placeholder="Eg. Apple, UCLA, etc"
                    />

                    <CustomAutocomplete
                        name="expertise"
                        label="Expertise"
                        options={expertises.map((item: any) => ({
                            value: item.name,
                            label: item.name,
                        }))}
                        multiple
                    />

                    <CustomAutocomplete
                        name="skills"
                        label="Skills"
                        options={skills.map((item: any) => ({
                            value: item.name,
                            label: item.name,
                        }))}
                        multiple
                    />

                    <CustomAutocomplete
                        name="industries"
                        label="Industries"
                        options={industries.map((item: any) => ({
                            value: item.name,
                            label: item.name,
                        }))}
                        multiple
                    />

                    <CustomSelect label="Level of experience" name="level">
                        <option value="">Select Level</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior">Senior</option>
                    </CustomSelect>


                    <Button loading={loading} type="submit" className="py-6 w-full bg-black" >
                        Continue
                    </Button>

                </Form>
            )}
        </Formik>
    )
}

export default MenteeProfile