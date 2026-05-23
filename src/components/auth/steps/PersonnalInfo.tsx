import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import PasswordRequirements from "../PasswordRequirements"
import {
    CustomAutocomplete,
    CustomInput,
    CustomPassword,
    CustomPhoneInput,
    CustomSelect,
} from "../../form"
import { Button } from "../../ui"
import { countries } from "../../../constant"
import { AppDispatch } from "../../../redux/store"
import { getRegistrationData, updateRegData } from "../../../redux/features/authSlice"

const personalInfoRegistrationSchema = Yup.object().shape({
    fullname: Yup.string().required("Full name is required").min(2, "Name is too short"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\+?\d{7,15}$/, "Enter a valid phone number"),
    gender: Yup.string()
        .oneOf(["male", "female", "other"], "Select a valid gender")
        .required("Gender is required"),
    country: Yup.object({
        value: Yup.string().required(),
        label: Yup.string().required(),
    }).required("Country is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/\d/, "Must contain at least one number")
        .matches(/[@$!%*?&#]/, "Must contain at least one special character"),
    acceptTerms: Yup.boolean().oneOf([true], "You must accept the terms"),
})

const inputClass = "rounded-md border-[#CBCAD7]"

const PersonnalInfo = ({ onNextStep }: { onNextStep: () => void }) => {
    const regData = useSelector(getRegistrationData)
    const dispatch = useDispatch<AppDispatch>()

    const initialValues = {
        fullname: regData?.fullname || "",
        email: regData?.email || "",
        phone: regData?.phone || "",
        password: regData?.password || "",
        gender: regData?.gender || "",
        country: regData?.country
            ? { value: regData.country.iso, label: regData.country.name }
            : null,
        acceptTerms: false,
    }

    return (
        <div className="w-full">
            <div className="mb-6 space-y-1">
                <h2 className="font-lora text-xl font-bold text-[#1B1D21]">Personal Information</h2>
                <p className="text-sm font-light text-[#62646A]">
                    Please provide the required details
                </p>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={personalInfoRegistrationSchema}
                enableReinitialize
                onSubmit={(values) => {
                    dispatch(
                        updateRegData({
                            fullname: values.fullname,
                            email: values.email,
                            phone: values.phone,
                            password: values.password,
                            gender: values.gender,
                            country: {
                                iso: values.country?.value || "",
                                name: values.country?.label || "",
                            },
                        }),
                    )
                    onNextStep()
                }}
            >
                {({ values, setFieldValue, errors, touched }) => (
                    <Form className="space-y-5" autoComplete="off">
                        <CustomInput
                            label="Full Name"
                            name="fullname"
                            type="text"
                            placeholder="John Doe"
                            className={inputClass}
                        />

                        <CustomInput
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="johndoe@example.com"
                            className={inputClass}
                        />

                        <CustomPhoneInput
                            className={`${inputClass} py-1.5`}
                            name="phone"
                            label="Phone number"
                            placeholder="Enter phone number"
                        />

                        <CustomSelect label="Gender" name="gender" className={inputClass}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </CustomSelect>

                        <CustomAutocomplete
                            name="country"
                            label="Country"
                            options={countries}
                            returnObject
                        />

                        <div className="space-y-2">
                            <CustomPassword
                                label="Password"
                                name="password"
                                placeholder="Create your password"
                                className={inputClass}
                            />
                            <PasswordRequirements password={values.password} />
                        </div>

                        <label className="flex cursor-pointer items-start gap-2.5">
                            <input
                                type="checkbox"
                                checked={values.acceptTerms}
                                onChange={(e) => setFieldValue("acceptTerms", e.target.checked)}
                                className="mt-0.5 size-4 shrink-0 rounded border-[#CBCAD7] text-primary focus:ring-primary"
                            />
                            <span className="text-xs leading-relaxed text-[#62646A]">
                                I agree to the{" "}
                                <a href="/terms" className="text-primary underline underline-offset-2">
                                    Terms of Service
                                </a>{" "}
                                and acknowledge you&apos;ve read our{" "}
                                <a href="/privacy" className="text-primary underline underline-offset-2">
                                    Privacy Policy
                                </a>
                                .
                            </span>
                        </label>
                        {touched.acceptTerms && errors.acceptTerms && (
                            <p className="-mt-3 text-xs text-red-600">{errors.acceptTerms}</p>
                        )}

                        <Button
                            isDisabled={!values.acceptTerms}
                            type="submit"
                            className="px-20 rounded-md py-6"
                        >
                            Continue
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default PersonnalInfo
