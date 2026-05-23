import { Form, Formik } from "formik"
import { CustomAutocomplete } from "../../form"
import { Button } from "../../ui"
import { AuthType } from "../../../types"
import { useDispatch, useSelector } from "react-redux"
import { mentorExpertiseSchema } from "../../../utils/schema"
import { getRegistrationData, resetRegistrationData, updateRegData } from "../../../redux/features/authSlice"
import toast from "react-hot-toast"
import { buildRegisterPayload, getErrorMessage } from "../../../utils"
import { registerUser } from "../../../services"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { setCookie } from "../../../lib"

type GeneralOption = { name: string }

const mapOptions = (items: GeneralOption[]) =>
    items.map((item) => ({ value: item.name, label: item.name }))

const MentorExpertises = () => {
    const navigate = useNavigate()
    const regData = useSelector(getRegistrationData)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const { expertises = [], skills = [], industries = [], tools = [] } = useSelector(
        (state: { general: Record<string, GeneralOption[]> }) => state.general,
    )

    const initialValues: Partial<AuthType> = {
        expertise: regData?.expertise || [],
        skills: regData?.skills || [],
        industries: regData?.industries || [],
        tools: regData?.tools || [],
    }

    return (
        <div className="w-full">
            <div className="mb-6 space-y-1">
                <h2 className="font-lora text-xl font-bold text-[#1B1D21]">Expertises and Skills</h2>
                <p className="text-sm font-light text-[#62646A]">Please provide the required details</p>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={mentorExpertiseSchema}
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
                        <CustomAutocomplete
                            name="expertise"
                            label="Expertise"
                            placeholder="Select"
                            options={mapOptions(expertises)}
                            multiple
                            formGroupClass="mb-0"
                        />

                        <CustomAutocomplete
                            name="skills"
                            label="Skills"
                            placeholder="Select"
                            options={mapOptions(skills)}
                            multiple
                            formGroupClass="mb-0"
                        />

                        <CustomAutocomplete
                            name="industries"
                            label="Industries"
                            placeholder="Select"
                            options={mapOptions(industries)}
                            multiple
                            formGroupClass="mb-0"
                        />

                        <CustomAutocomplete
                            name="tools"
                            label="Tools"
                            placeholder="Select"
                            options={mapOptions(tools)}
                            multiple
                            formGroupClass="mb-0"
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

export default MentorExpertises
