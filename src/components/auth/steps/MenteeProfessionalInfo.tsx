import { Form, Formik } from "formik"
import { CustomInput, TextArea } from "../../form"
import { Button } from "../../ui"
import { AuthType } from "../../../types"
import { menteeProInfo } from "../../../utils/schema"
import { useDispatch, useSelector } from "react-redux"
import { getRegistrationData, resetRegistrationData, updateRegData } from "../../../redux/features/authSlice"
import { useState } from "react"
import { registerUser } from "../../../services"
import toast from "react-hot-toast"
import { buildRegisterPayload, getErrorMessage } from "../../../utils"
import { useNavigate } from "react-router-dom"
import { setCookie } from "../../../lib"

const inputClass = "rounded-md border-[#CBCAD7]"

const MenteeProfessionalInfo = () => {
    const navigate = useNavigate()
    const regData = useSelector(getRegistrationData)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const initialValues: AuthType = {
        title: regData.title || "",
        employer: regData.employer || "",
        bio: regData.bio || "",
    }

    return (
        <div className="w-full">
            <div className="mb-6 space-y-1">
                <h2 className="font-lora text-xl font-bold text-[#1B1D21]">Professional Information</h2>
                <p className="text-sm font-light text-[#62646A]">
                    Please provide the required details
                </p>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={menteeProInfo}
                enableReinitialize
                onSubmit={async (values) => {
                    const payload = buildRegisterPayload({ ...regData, ...values })
                    setLoading(true)

                    try {
                        const response = await registerUser(payload)
                        toast.success(response?.message)
                        const email = payload?.email || ""
                        setCookie("email", email)
                        dispatch(resetRegistrationData())
                        navigate("/verify", { state: { email } })
                    } catch (error) {
                        toast.error(getErrorMessage(error))
                        dispatch(updateRegData(payload))
                    } finally {
                        setLoading(false)
                    }
                }}
            >
                {() => (
                    <Form className="space-y-5" autoComplete="off">
                        <CustomInput
                            label="Title"
                            name="title"
                            type="text"
                            placeholder="Eg. Product Designer, Student"
                            className={inputClass}
                        />

                        <CustomInput
                            label="Company/School"
                            name="employer"
                            type="text"
                            placeholder="Eg. Apple, UCLA, etc"
                            className={inputClass}
                        />

                        <TextArea
                            label="Short Bio"
                            name="bio"
                            className={`h-24 ${inputClass}`}
                            placeholder="Write a brief introduction about yourself"
                        />

                        <Button loading={loading} type="submit" className="px-20 rounded-md py-6">
                            Create Account
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default MenteeProfessionalInfo
