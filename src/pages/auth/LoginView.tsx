import { Form, Formik } from "formik"
import { useState } from "react"
import { usePageTitle } from "../../hooks/usePageTitle"
import { Link, useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { AuthLayout, AuthMessage, AuthRedirect } from "../../components/auth"
import { CustomInput, CustomPassword } from "../../components/form"
import { Button } from "../../components/ui"
import { setCookie } from "../../lib"
import { fetchProfile, setCredentials } from "../../redux/features/authSlice"
import { AppDispatch } from "../../redux/store"
import { loginUser } from "../../services"
import { AuthType } from "../../types"
import { getErrorMessage } from "../../utils"
import { LoginSchema } from "../../utils/schema"

const LoginView = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    usePageTitle("Log in")

    const initialValues: AuthType = {
        email: "",
        password: "",
    }

    const handleRedirection = (role: string | undefined) => {
        const callbackUrl = queryParams.get("callbackUrl")

        if (callbackUrl) {
            navigate(callbackUrl)
            return
        }

        switch (role) {
            case "mentor":
                navigate("/mentor/dashboard")
                break
            case "mentee":
                navigate("/dashboard")
                break
            default:
                navigate("/")
                break
        }
    }

    return (
        <AuthLayout>
            <div>
                <AuthMessage
                    heading="Welcome back!"
                    description="Login to access all your account"
                />

                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    enableReinitialize
                    onSubmit={async (values) => {
                        setLoading(true)

                        try {
                            const response = await loginUser(values)
                            const { message, token, data } = response

                            toast.success(message)

                            dispatch(setCredentials({ token }))
                            dispatch(fetchProfile())

                            handleRedirection(data?.role)
                        } catch (error: unknown) {
                            const err = error as { response?: { data?: { redirect_to_verification?: boolean } } }

                            if (err?.response?.data?.redirect_to_verification) {
                                setCookie("email", values?.email || "")
                                navigate("/verify")
                            }

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

                            <CustomPassword
                                label="Password"
                                name="password"
                                className="rounded-md border-[#CBCAD7]"
                                placeholder="Enter your password"
                            />

                            <div className="flex justify-end pt-1">
                                <Link
                                    to="/forgot-password"
                                    className="text-xs text-[#62646A] underline-offset-2 hover:text-[#1B1D21] hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <Button loading={loading} type="submit" className="rounded-md w-full py-6">
                                Log in
                            </Button>
                        </Form>
                    )}
                </Formik>

                <AuthRedirect
                    text="Don't have an account?"
                    linkText="Register"
                    linkHref="/register"
                />
            </div>
        </AuthLayout>
    )
}

export default LoginView
