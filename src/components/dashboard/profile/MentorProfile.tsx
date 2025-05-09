import { Form, Formik } from "formik";
import { CustomInput, CustomSelect } from "../../form";
import { Button } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, getUserProfile } from "../../../redux/features/authSlice";
import { mentorProfileSchema } from "../../../utils/schema";
import { useState } from "react";
import { updateProfile } from "../../../services";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils";
import { AppDispatch } from "../../../redux/store";


const MentorProfile = () => {

    const dispatch = useDispatch<AppDispatch>()
    const profile = useSelector(getUserProfile)
    const [loading, setLoading] = useState(false)

    const initialValues = {
        title: profile?.title || '',
        employer: profile?.employer || '',
        level: profile?.level || '',
        linkedin_url: profile?.social_links?.linkedin || '',
        twitter_url: profile?.social_links?.twitter || '',
        website_url: profile?.social_links?.website || '',
        yrs_of_experience: profile?.mentor?.yrs_of_experience || 1,
        months_of_experience: profile?.mentor?.months_of_experience || 1,
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={mentorProfileSchema}
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

                    <CustomInput
                        label="LinkedIn URL"
                        name="linkedin_url"
                        type="url"
                        placeholder="inkedin.com/in/example"
                    />

                    <CustomInput
                        label="Twitter URL"
                        name="twitter_url"
                        type="url"
                        placeholder="twitter.com/example"
                    />

                    <CustomInput
                        label="Website/Portfolio"
                        name="website_url"
                        type="url"
                    />

                    <div className="grid grid-cols-2 gap-3">

                        <CustomInput
                            label="Years of experience"
                            name="yrs_of_experience"
                            type="number"
                            min={1}
                            max={30}
                        />

                        <CustomInput
                            label="Months of experience"
                            name="months_of_experience"
                            type="number"
                            min={1}
                            max={12}
                        />

                    </div>

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

export default MentorProfile