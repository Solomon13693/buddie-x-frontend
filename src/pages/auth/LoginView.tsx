import { Form, Formik } from "formik";
import { AuthLayout, AuthMessage, AuthRedirect } from "../../components/auth"
import { CustomInput, CustomPassword } from "../../components/form";
import { Button } from "../../components/ui";
import { LoginSchema } from "../../utils/schema";
import { AuthType } from "../../types";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils";
import { loginUser } from "../../services";
import { setCookie } from "../../lib";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { fetchProfile, setCredentials } from "../../redux/features/authSlice";

const LoginView = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const initialValues: AuthType = {
        email: '',
        password: '',
    };

    const handleRedirection = (role: string | undefined) => {

        const callbackUrl = queryParams.get('callbackUrl');

        navigate("/mentor/dashboard")

        // console.log(role)

        // if (callbackUrl) {
        //     navigate(callbackUrl)
        //     return
        // }

        // if (role == "mentor") {
       
        // } else {
        //     navigate("/dashboard")
        // }

    };

    return (
        <AuthLayout>

            <div>

                <AuthMessage
                    heading="Welcome Back!"
                    description="Enter your email and password to access your account."
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
                            dispatch(fetchProfile());

                            handleRedirection(data?.role);

                        } catch (error: any) {

                            if (error?.response?.data?.redirect_to_verification as boolean) {
                                setCookie('email', values?.email || '')
                                navigate('/verify');
                            }

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

                            <CustomPassword
                                label="Password"
                                name="password"
                                placeholder="*************"
                            />

                            <Link to='/forgot-password' className="underline text-xs pb-5 float-end">
                                Forget password?
                            </Link>

                            <Button loading={loading} type="submit" className="py-6 w-full" >
                                Log In
                            </Button>

                        </Form>
                    )}
                </Formik>

                <AuthRedirect text='Don’t have an account?' linkText='Sign Up' linkHref='/register' />

            </div>

        </AuthLayout>
    )
}

export default LoginView