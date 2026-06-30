import { Form, Formik } from "formik";
import { CustomAutocomplete } from "../../form";
import { Button } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, getUserProfile } from "../../../redux/features/authSlice";
import { useState } from "react";
import { updateProfile } from "../../../services";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils";
import { AppDispatch } from "../../../redux/store";
import { ProfileExpertiseSchema } from "../../../utils/schema";


const ProfileExpertise = () => {

    const dispatch = useDispatch<AppDispatch>()
    const profile = useSelector(getUserProfile)
    const [loading, setLoading] = useState(false)

    const { expertises = [], skills = [], industries = [], tools = [] } = useSelector((state: any) => state.general);

    const initialValues = {
        expertise: profile?.expertise || [],
        skills: profile?.skills || [],
        industries: profile?.industries || [],
        tools: profile?.mentor?.tools || [],
    };


    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={ProfileExpertiseSchema}
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

                    <CustomAutocomplete
                        name="tools"
                        label="Tools"
                        options={tools.map((item: any) => ({
                            value: item.name,
                            label: item.name,
                        }))}
                        multiple
                    />

                    <Button loading={loading} type="submit" className="py-6 w-full bg-black" >
                        Continue
                    </Button>

                </Form>
            )}
        </Formik>
    )
}

export default ProfileExpertise