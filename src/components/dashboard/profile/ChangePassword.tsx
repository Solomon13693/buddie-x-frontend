import { Form, Formik } from 'formik';
import { CustomPassword } from '../../form';
import { Button } from '../../ui';
import { useState } from 'react';
import { updatePassword } from '../../../services';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../../utils';
import { changePasswordSchema } from '../../../utils/schema';

const ChangePassword = () => {

    const [loading, setLoading] = useState(false);

    const initialValues = {
        old_password: '',
        password: '',
        password_confirmation: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={changePasswordSchema}
            onSubmit={async (values, { resetForm }) => {
                setLoading(true);
            
                try {
                    const response = await updatePassword(values);
                    toast.success(response?.message);
                    resetForm(); 
                } catch (error) {
                    toast.error(getErrorMessage(error));
                } finally {
                    setLoading(false);
                }
                
            }}>            
            {() => (
                <Form className="space-y-4" autoComplete="off">

                    <CustomPassword
                        label="Old Password"
                        name="old_password"
                        placeholder="Enter your current password"
                    />

                    <CustomPassword
                        label="New Password"
                        name="password"
                        placeholder="Enter a new password"
                    />

                    <CustomPassword
                        label="Confirm New Password"
                        name="password_confirmation"
                        placeholder="Confirm the new password"
                    />

                    <Button loading={loading} type="submit" className="py-6 w-full bg-black text-white">
                        Submit
                    </Button>

                </Form>
            )}
        </Formik>
    );
};

export default ChangePassword;
