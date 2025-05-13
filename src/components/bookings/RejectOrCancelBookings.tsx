import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, PopupModal } from "../ui";
import { TextArea } from "../form";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils";
import { useCancelBookings, useRejectBookings, useRequestRefund } from "../../services";

interface RejectOrCancelProps {
    open: boolean;
    close: () => void;
    id: string;
    type: "reject" | "cancel" | "refund";
}

const initialValues = {
    reason: "",
};

const validationSchema = Yup.object({
    reason: Yup.string()
        .required("Reason is required")
        .min(10, "Reason must be at least 10 characters long"),
});

const RejectOrCancelBookings = ({ open, close, id, type }: RejectOrCancelProps) => {

    const { mutate: rejectBooking, isPending } = useRejectBookings()
    const { mutate: cancelBooking, isPending: loading } = useCancelBookings()
    const { mutate: requestRefund, isPending: isLoading } = useRequestRefund()

    const handleSubmit = async (values: typeof initialValues) => {
        const payload = { id, reason: values.reason };

        switch (type) {
            case "reject":
                rejectBooking(payload, {
                    onSuccess: () => {
                        toast.success("Booking rejected successfully!");
                        close();
                    },
                    onError: (err) => {
                        toast.error(getErrorMessage(err));
                    },
                });
                break;

            case "cancel":
                cancelBooking(payload, {
                    onSuccess: () => {
                        toast.success("Booking cancelled successfully!");
                        close();
                    },
                    onError: (err) => {
                        toast.error(getErrorMessage(err));
                    },
                });
                break;

            case "refund":
                requestRefund(payload, {
                    onSuccess: () => {
                        toast.success("Refund request submitted successfully!");
                        close();
                    },
                    onError: (err) => {
                        toast.error(getErrorMessage(err));
                    },
                });
                break;
        }
    };

    const getTitle = () => {
        switch (type) {
            case "reject":
                return "Reject Booking";
            case "cancel":
                return "Cancel Booking";
            case "refund":
                return "Request Refund";
            default:
                return "";
        }
    };

    return (
        <PopupModal
            size="xl"
            isOpen={open}
            onClose={close}
            placement="center"
            className="max-h-[95vh]">
            <div className="py-5">

                <h1 className="text-xs sm:text-sm font-medium mb-5 uppercase">{getTitle()}</h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={handleSubmit}>
                    {() => (
                        <Form autoComplete="off" className="space-y-5">

                            <TextArea
                                label={`${type === "reject" ? "Rejection" : "Cancellation"} reason`}
                                name="reason"
                                placeholder={`Enter ${type === "reject" ? "rejection" : "cancellation"} reason`}
                                className="h-28" />

                            <Button
                                fullWidth
                                type="submit"
                                className="py-6 justify-center m-auto"
                                color="primary"
                                loading={isPending || isLoading || loading}>
                                Submit
                            </Button>

                        </Form>
                    )}
                </Formik>
            </div>
        </PopupModal>
    );
};

export default RejectOrCancelBookings;
