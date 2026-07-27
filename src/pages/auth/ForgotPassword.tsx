import { Form, Formik } from "formik"
import { useState } from "react"
import { usePageTitle } from "../../hooks/usePageTitle"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { AuthLayout, AuthMessage, AuthRedirect } from "../../components/auth"
import { CustomInput } from "../../components/form"
import { Button } from "../../components/ui"
import { setCookie } from "../../lib"
import { forgotPassword } from "../../services"
import { AuthType } from "../../types"
import { getErrorMessage } from "../../utils"
import { forgotPasswordSchema } from "../../utils/schema"

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    usePageTitle("Forgot password")

    const initialValues: AuthType = {
        email: "",
    }

    return (
        <AuthLayout>
            <div>
                <AuthMessage
                    heading="Forgot your password?"
                    description="Enter your email address and we'll send you a link to reset your password."
                />

                <Formik
                    initialValues={initialValues}
                    validationSchema={forgotPasswordSchema}
                    enableReinitialize
                    onSubmit={async (values) => {
                        setLoading(true)

                        try {
                            const response = await forgotPassword(values.email || "")

                            toast.success(response?.message)

                            setCookie("email", values?.email || "")
                            navigate("/reset-password")
                        } catch (error: unknown) {
                            toast.error(getErrorMessage(error))
                        } finally {
                            setLoading(false)
                        }
                    }}
                >
                    {() => (
                        <Form className="space-y-4" autoComplete="off">
                            <CustomInput
                                label="Email Address"
                                name="email"
                                type="email"
                                className="rounded-md border-[#CBCAD7]"
                                placeholder="Enter your email address"
                            />

                            <Button loading={loading} type="submit" className="w-full rounded-md py-6">
                                Send reset link
                            </Button>
                        </Form>
                    )}
                </Formik>

                <AuthRedirect text="Back to" linkText="Log in" linkHref="/login" />
            </div>
        </AuthLayout>
    )
}

export default ForgotPassword
