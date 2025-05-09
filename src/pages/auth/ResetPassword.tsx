import { Form, Formik } from "formik";
import { AuthLayout, AuthMessage } from "../../components/auth"
import { CustomInput, CustomPassword } from "../../components/form";
import { Button } from "../../components/ui";
import { resetPasswordSchema } from "../../utils/schema";
import { AuthType } from "../../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils";
import { resetPassword } from "../../services";
import { destroyCookie, getCookie } from "../../lib";

const ResetPassword = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState<string | undefined>(undefined);

    useEffect(() => {
        const emailFromCookie = getCookie('email');
        if (!emailFromCookie) {
            navigate('/forgot-password');
        } else {
            setEmail(emailFromCookie);
        }
    }, [navigate]);

    const initialValues: AuthType = {
        token: '',
        password: '',
        password_confirmation: '',
    };

    return (
        <AuthLayout>

            <div>

                <AuthMessage
                    heading="Reset Your Password"
                    description="Enter your new password and confirm it to reset your account password."
                />


                <Formik
                    initialValues={initialValues}
                    validationSchema={resetPasswordSchema}
                    enableReinitialize
                    onSubmit={async (values) => {

                        setLoading(true)

                        try {

                            const payload = {
                                email,
                                ...values
                            }

                            const response = await resetPassword(payload)
                            toast.success(response?.message)
                            destroyCookie('email')

                            navigate('/login')

                        } catch (error: any) {
                            toast.error(getErrorMessage(error))
                        } finally {
                            setLoading(false)
                        }

                    }}>

                    {() => (

                        <Form className="space-y-4" autoComplete="off">

                            <CustomInput
                                label="OTP"
                                name="token"
                                type="text"
                                placeholder="*********"
                            />

                            <CustomPassword
                                label="Password"
                                name="password"
                                placeholder="*************"
                            />

                            <CustomPassword
                                label="Confirm Password"
                                name="password_confirmation"
                                placeholder="*************"
                            />

                            <Button loading={loading} type="submit" className="py-6 w-full" >
                                Submit
                            </Button>

                        </Form>
                    )}
                </Formik>

            </div>

        </AuthLayout>
    )
}

export default ResetPassword