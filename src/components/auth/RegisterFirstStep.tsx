import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import AccountType from "./AccountType"
import AuthRedirect from "./AuthRedirect"
import PasswordRequirements from "./PasswordRequirements"
import {
    CustomAutocomplete,
    CustomInput,
    CustomPassword,
    CustomPhoneInput,
    CustomSelect,
} from "../form"
import { Button } from "../ui"
import { countries } from "../../constant"
import { AppDispatch } from "../../redux/store"
import { getRegistrationData, updateRegData } from "../../redux/features/authSlice"

type Role = "mentee" | "mentor"

const inputClass = "rounded-md border-[#CBCAD7]"

const registerFirstStepSchema = Yup.object().shape({
    role: Yup.string().oneOf(["mentee", "mentor"]).required("Select a role"),
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

type RegisterFirstStepProps = {
    onNextStep: (role: Role) => void
}

const RegisterFirstStep = ({ onNextStep }: RegisterFirstStepProps) => {
    const regData = useSelector(getRegistrationData)
    const dispatch = useDispatch<AppDispatch>()

    const initialValues = {
        role: (regData?.role as Role) || "",
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
            <div className="mb-8 space-y-3">
                <h1 className="max-w-sm font-lora text-xl font-bold leading-snug text-[#1B1D21] sm:text-2xl">
                    Empowering individuals through mentorship and learning.
                </h1>

                <AuthRedirect
                    text="Already have an account?"
                    linkText="Login"
                    linkHref="/login"
                    className="text-left text-[#49475A]"
                />

                <p className="text-sm font-light text-[#62646A]">
                    Are you ready to mentor or be mentored?
                </p>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={registerFirstStepSchema}
                enableReinitialize
                onSubmit={(values) => {
                    dispatch(
                        updateRegData({
                            role: values.role as Role,
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
                    onNextStep(values.role as Role)
                }}
            >
                {({ values, setFieldValue, errors, touched }) => (
                    <Form className="space-y-5" autoComplete="off">
                        <div>
                            <p className="mb-3 text-sm text-[#49475A]">
                                You&apos;re creating an account as?
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <AccountType
                                    value="mentor"
                                    title="As a Mentor"
                                    isSelected={values.role === "mentor"}
                                    onSelect={(role) => setFieldValue("role", role)}
                                />
                                <AccountType
                                    value="mentee"
                                    title="As a Mentee"
                                    isSelected={values.role === "mentee"}
                                    onSelect={(role) => setFieldValue("role", role)}
                                />
                            </div>
                            {touched.role && errors.role && (
                                <p className="mt-1.5 text-xs text-red-600">{errors.role}</p>
                            )}
                        </div>

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
                                <a href="/terms-of-service" className="text-primary underline underline-offset-2">
                                    Terms of Service
                                </a>{" "}
                                and acknowledge I&apos;ve read the{" "}
                                <a href="/privacy-policy" className="text-primary underline underline-offset-2">
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
                            className="px-20 rounded-md py-6">
                            Continue
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default RegisterFirstStep
