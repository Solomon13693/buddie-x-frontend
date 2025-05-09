import { Form, Formik } from "formik";
import { CustomAutocomplete, CustomInput, CustomSelect, TextArea } from "../../form";
import { Button } from "../../ui";
import { AuthType } from "../../../types";
import { menteeProInfo } from "../../../utils/schema";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationData, resetRegistrationData, updateRegData } from "../../../redux/features/authSlice";
import { useState } from "react";
import { registerUser } from "../../../services";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../lib";


const MenteeProfessionalInfo = () => {

    const navigate = useNavigate();

    const { expertises = [] } = useSelector((state: any) => state.general)
    const regData = useSelector(getRegistrationData)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const initialValues: AuthType = {
        title: regData.title || '',
        employer: regData.employer || '',
        level: regData.level || '',
        expertise: regData.expertise || [],
        bio: regData.bio || '',
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
                    validationSchema={menteeProInfo}
                    enableReinitialize
                    onSubmit={async (values) => {

                        const payload = {
                            ...regData,
                            ...values,
                        };

                        setLoading(true)

                        try {
                            
                            const response = await registerUser(payload)
                            toast.success(response?.message)
                            setCookie('email', payload?.email || '')
                            dispatch(resetRegistrationData())

                            navigate("/verify");

                        } catch (error) {
                            toast.error(getErrorMessage(error))
                            dispatch(updateRegData(payload))
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

                            <CustomSelect label="Level of experience" name="level">
                                <option value="">Select Level</option>
                                <option value="Entry Level">Entry Level</option>
                                <option value="Mid Level">Mid Level</option>
                                <option value="Senior">Senior</option>
                            </CustomSelect>

                            <CustomAutocomplete
                                name="expertise"
                                label="Expertise"
                                options={expertises.map((item: any) => ({
                                    value: item.name,
                                    label: item.name
                                }))}
                                multiple
                            />

                            <TextArea
                                label="Short Bio"
                                name="bio"
                                className="h-24"
                                placeholder="Write a brief introduction about yourself"
                            />

                            <Button loading={loading} type="submit" className="py-6 w-full" >
                                Continue
                            </Button>

                        </Form>
                    )}
                </Formik>

            </div >

        </>
    )
}

export default MenteeProfessionalInfo