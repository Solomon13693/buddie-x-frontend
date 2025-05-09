import { Form, Formik } from "formik";
import { CustomInput, CustomSelect, TextArea } from "../../form";
import { Button } from "../../ui";
import { AuthType } from "../../../types";
import { mentorProInfo } from "../../../utils/schema";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationData, updateRegData } from "../../../redux/features/authSlice";


const MentorProInfo = ({ onNextStep }: { onNextStep: () => void }) => {

    const regData = useSelector(getRegistrationData)
    const dispatch = useDispatch()

    const initialValues: AuthType = {
        title: regData?.title || '',
        employer: regData?.employer || '',
        level: regData?.level || '',
        linkedin_url: regData?.linkedin_url || '',
        yrs_of_experience: regData?.yrs_of_experience || 1,
        months_of_experience: regData?.months_of_experience || 1,
        bio: regData?.bio || '',
    };


    return (
        <>

            <div className="flex-col flex justify-center">

                <div className="pb-6">

                    <h3 className='pt-3 font-bold text-lg font-lora'>Professional Information</h3>

                    <p className='pt-1 text-slate-400 font-light text-sm'>Please provide the required deatils</p>

                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={mentorProInfo}
                    enableReinitialize
                    onSubmit={async (values) => {

                        dispatch(updateRegData(values))
                        onNextStep()

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

                            <TextArea
                                label="Short Bio"
                                name="bio"
                                className="h-24"
                                placeholder="Write a brief introduction about yourself"
                            />

                            <Button type="submit" className="py-6 w-full" >
                                Continue
                            </Button>

                        </Form>
                    )}
                </Formik>

            </div >

        </>
    )
}

export default MentorProInfo