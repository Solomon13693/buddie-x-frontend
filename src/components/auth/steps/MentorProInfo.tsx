import { Form, Formik } from "formik"
import { CustomInput, CustomSelect, TextArea } from "../../form"
import { Button } from "../../ui"
import { AuthType } from "../../../types"
import { mentorProInfo } from "../../../utils/schema"
import { useDispatch, useSelector } from "react-redux"
import { getRegistrationData, updateRegData } from "../../../redux/features/authSlice"

const inputClass = "rounded-md border-[#CBCAD7]"

const mentorProInfoFields = {
    title: true,
    employer: true,
    linkedin_url: true,
    yrs_of_experience: true,
    months_of_experience: true,
    level: true,
    bio: true,
} as const

const MentorProInfo = ({ onNextStep }: { onNextStep: () => void }) => {
    const regData = useSelector(getRegistrationData)
    const dispatch = useDispatch()

    const initialValues: AuthType = {
        title: regData?.title || "",
        employer: regData?.employer || "",
        level: regData?.level || "",
        linkedin_url: regData?.linkedin_url || "",
        yrs_of_experience:
            regData?.yrs_of_experience !== undefined && regData?.yrs_of_experience !== null
                ? regData.yrs_of_experience
                : "",
        months_of_experience:
            regData?.months_of_experience !== undefined && regData?.months_of_experience !== null
                ? regData.months_of_experience
                : "",
        bio: regData?.bio || "",
    }

    return (
        <div className="w-full">
            <div className="mb-6 space-y-1">
                <h2 className="font-lora text-xl font-bold text-[#1B1D21]">Professional Information</h2>
                <p className="text-sm font-light text-[#62646A]">Please provide the required details</p>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={mentorProInfo}
                enableReinitialize
                onSubmit={(values) => {
                    dispatch(
                        updateRegData({
                            ...values,
                            yrs_of_experience: Number(values.yrs_of_experience),
                            months_of_experience: Number(values.months_of_experience),
                        }),
                    )
                    onNextStep()
                }}
            >
                {({ setTouched, handleSubmit }) => (
                    <Form
                        className="space-y-5"
                        autoComplete="off"
                        onSubmit={(event) => {
                            setTouched(mentorProInfoFields)
                            handleSubmit(event)
                        }}
                    >
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
                            placeholder="eg. Apple, UCLA, etc"
                            className={inputClass}
                        />

                        <CustomInput
                            label="LinkedIn URL"
                            name="linkedin_url"
                            type="text"
                            placeholder="linkedin.com/in/example"
                            className={inputClass}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <CustomInput
                                label="Years of experience"
                                name="yrs_of_experience"
                                type="number"
                                min={0}
                                max={50}
                                placeholder="1 year"
                                className={inputClass}
                            />

                            <CustomInput
                                label="Months of experience"
                                name="months_of_experience"
                                type="number"
                                min={0}
                                max={11}
                                placeholder="3 months"
                                className={inputClass}
                            />
                        </div>

                        <CustomSelect label="Level of experience" name="level" className={inputClass}>
                            <option value="">Select Level</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Mid Level">Mid Level</option>
                            <option value="Senior">Senior</option>
                        </CustomSelect>

                        <TextArea
                            label="Brief Introduction"
                            name="bio"
                            className={`h-28 ${inputClass}`}
                            placeholder="Write a brief introduction about yourself"
                            maxLength={500}
                        />

                        <Button type="submit" className="px-20 rounded-md py-6">
                            Continue
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default MentorProInfo
