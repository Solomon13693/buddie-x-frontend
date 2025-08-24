import { Form, Formik } from "formik";
import { AuthLayout, AuthMessage, AuthRedirect } from "../../components/auth"
import { CustomInput } from "../../components/form";
import { Button } from "../../components/ui";
import { forgotPasswordSchema } from "../../utils/schema";
import { AuthType } from "../../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils";
import { forgotPassword } from "../../services";
import { setCookie } from "../../lib";

const ForgotPassword = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues: AuthType = {
        email: '',
    };

    return (
        <AuthLayout>

            <div>

                <AuthMessage
                    heading="Forgot Your Password?"
                    description="Enter your email address to receive a password reset link."
                />


                <Formik
                    initialValues={initialValues}
                    validationSchema={forgotPasswordSchema}
                    enableReinitialize
                    onSubmit={async (values) => {

                        setLoading(true)

                        try {

                            const response = await forgotPassword(values.email || '')

                            toast.success(response?.message)

                            setCookie('email', values?.email || '')
                            console.log("Navigrating", values.email)
                            navigate('/reset-password')

                        } catch (error: any) {
                            console.log(error)
                            toast.error(getErrorMessage(error))
                        } finally {
                            setLoading(false)
                        }

                    }}>

                    {() => (

                        <Form className="space-y-4" autoComplete="off">

                            <CustomInput
                                label="Email address"
                                name="email"
                                type="email"
                                placeholder="jonedoe@example.com"
                            />

                            <Button loading={loading} type="submit" className="py-6 w-full" >
                                Submit
                            </Button>

                        </Form>
                    )}
                </Formik>

                <AuthRedirect text='Back to' linkText='Login' linkHref='/login' />

            </div>

        </AuthLayout>
    )
}

export default ForgotPassword