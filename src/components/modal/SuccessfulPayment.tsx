import { useNavigate } from "react-router-dom";
import { Button, PopupModal } from "../ui";

interface PaymentStatusModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    status: "success" | "cancelled"; 
    onConfirm?: () => void; 
}

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({
    open,
    setOpen,
    status,
}) => {

    const isSuccess = status === "success";

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        if (isSuccess) {
            navigate("/dashboard/bookings");
        }
    };

    return (
        <PopupModal
            size="2xl"
            isOpen={open}
            onClose={() => setOpen(true)}
            placement="center"
            backdrops="blur"
            showCloseButton={false}
            className="max-h-[95vh] px-6 py-8 rounded-lg shadow-lg bg-white">

            <div className="flex flex-col items-center text-center space-y-4">

                <img
                    src={isSuccess ? "/img/success.gif" : "/img/sad_face.svg"}
                    alt={isSuccess ? "Payment successful" : "Payment cancelled"}
                    width={isSuccess ? 150 : 100}
                    height={isSuccess ? 150 : 100}
                    className="mx-auto pb-2"
                />

                <h2 className="text-lg font-semibold text-gray-900">
                    {isSuccess ? "Payment Successful!" : "Payment Cancelled"}
                </h2>

                <p className="text-gray-700 max-w-sm text-sm pb-5">
                    {isSuccess
                        ? "Your session booking was successful. Thank you for your payment."
                        : "Your payment was cancelled. You can try again or contact support if you need help."}
                </p>

                <Button
                    className="bg-black text-white w-full py-6 text-xs"
                    onPress={handleClose}>
                    {isSuccess ? "Go to Bookings" : "Close"}
                </Button>

            </div>
        </PopupModal>
    );
};

export default PaymentStatusModal;
