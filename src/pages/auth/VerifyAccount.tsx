import { AuthLayout, AuthMessage, ResendCount } from "../../components/auth"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils";
import OtpInput from 'react-otp-input';
import { Button } from "../../components/ui";
import { ResendVerifyCode, verifyAccount } from "../../services";
import { destroyCookie, getCookie } from "../../lib";

const VerifyAccount = () => {

    const [pending, setPending] = useState(false);
    const navigate = useNavigate();

    const [otp, setOtp] = useState('');
    const isOtpValid: boolean = otp.length === 6;

    const [countdown, setCountdown] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(false);

    const [email, setEmail] = useState<string | undefined>(undefined);

    useEffect(() => {
        const emailFromCookie = getCookie('email');
        if (!emailFromCookie) {
            navigate('/login');
        } else {
            setEmail(emailFromCookie);
        }
    }, [navigate]);

    const handleResendClick = async () => {

        setLoading(true);

        try {
            const response = await ResendVerifyCode(email || '')
            toast.success(response?.message)
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setLoading(false);
            setCountdown(countdown);
        }
    };

    const handleVerifyAccount = async () => {

        const payload = {
            email, 
            verification_code: otp
        }

        setPending(true);

        try {

            const response = await verifyAccount(payload)
            toast.success(response?.message)
            destroyCookie('email')
            navigate('/login')

        } catch (error) {

            toast.error(getErrorMessage(error))

        } finally {

            setPending(false);

        }
    };

    return (
        <AuthLayout>

            <div>

                <AuthMessage
                    className="text-center"
                    heading="Verify Your Account!"
                    description="Please enter the verification code sent to your email to verify your account."
                />

                <div className="">

                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        inputType="tel"
                        numInputs={6}
                        inputStyle={{ width: '90px', height: '90px' }}
                        containerStyle="flex items-center gap-x-1 sm:gap-x-2 justify-center"
                        renderInput={(props, index) => (
                            <React.Fragment key={index}>
                                <input {...props} className="form-control max-w-12 max-h-12 text-sm font-semibold text-dark rounded-full" />
                                {index === 2 && <span className="mx-2 hidden md:block">-</span>}
                            </React.Fragment>
                        )}
                    />

                    <Button onPress={handleVerifyAccount} loading={pending} type="submit" className="mt-6 py-6 w-full" isDisabled={!isOtpValid}>
                        Continue
                    </Button>

                    <div className="flex items-center justify-center gap-x-1 text-center pt-5 text-xs">
                        <p className="text-black"> Didn’t get a code? </p>
                        <ResendCount initialCountdown={countdown} loading={loading} onResendClick={handleResendClick} />
                    </div>

                </div>

            </div>

        </AuthLayout >
    )
}

export default VerifyAccount