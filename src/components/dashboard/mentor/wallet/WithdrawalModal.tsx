import { Form, Formik } from "formik";
import { Button, PopupModal } from "../../../ui";
import { CustomInput, CustomPassword } from "../../../form";
import { withdrawalSchema } from "../../../../utils/schema";
import { usePlaceWithdrawal } from "../../../../services";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../../utils";

const WithdrawalModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {

    const initialValues = {
        amount: "",
        password: ""
    };

    const { mutate, isPending } = usePlaceWithdrawal()

    return (
        <PopupModal
            size='lg'
            isOpen={open}
            onClose={onClose}
            placement='center'
            showCloseButton={false}
            className='max-h-[95vh]'>

            <div className="py-2">

                <h1 className="text-xs sm:text-sm font-medium mb-5">
                    Withdraw
                </h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={withdrawalSchema}
                    onSubmit={async (values) => {

                        mutate(values, {
                            onSuccess: () => {
                                toast.success('Withdrawal request submitted successfully');
                                onClose()
                            },
                            onError: (error) => {
                                toast.error(getErrorMessage(error));
                            }
                        });

                    }}>
                    {() => (
                        <Form autoComplete="off" className="space-y-5">

                            <CustomInput currency label='Amount' name='amount' placeholder='Amount' />

                            <CustomPassword label='Password' name='password' placeholder='*********' />

                            <div className="flex items-center gap-3 pt-5">

                                <Button variant="light" fullWidth onPress={onClose}> Cancel </Button>

                                <Button type="submit" loading={isPending} fullWidth color='success'> Withdraw </Button>

                            </div>

                        </Form>
                    )}
                </Formik>

            </div>

        </PopupModal>
    )
}

export default WithdrawalModal