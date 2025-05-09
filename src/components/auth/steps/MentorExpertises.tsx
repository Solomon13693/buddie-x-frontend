import { Form, Formik } from "formik";
import { CustomAutocomplete } from "../../form";
import { Button } from "../../ui";
import { AuthType } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { mentorExpertiseSchema } from "../../../utils/schema";
import { getRegistrationData, resetRegistrationData, updateRegData } from "../../../redux/features/authSlice";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils";
import { registerUser } from "../../../services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../lib";

const MentorExpertises = () => {

    const navigate = useNavigate();

    const regData = useSelector(getRegistrationData)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const { expertises = [], skills = [], industries = [], tools = [] } = useSelector((state: any) => state.general);

    const initialValues: Partial<AuthType> = {
        expertise: regData?.expertise || [],
        skills: regData?.skills || [],
        industries: regData?.industries || [],
        tools: regData?.tools || [],
    };

    return (
        <div className="flex-col flex justify-center h-full 2xl:h-[70vh]">

            <div className="pb-6">
                <h3 className="pt-3 font-bold text-lg font-lora">Expertises and Skills</h3>
                <p className="pt-1 text-slate-400 font-light text-sm">Please provide the required details</p>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={mentorExpertiseSchema}
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

                }}
            >
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

                        <Button loading={loading} type="submit" className="py-6 w-full">
                            Continue
                        </Button>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default MentorExpertises;
