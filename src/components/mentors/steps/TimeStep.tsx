import React, { useState } from "react";
import { Button } from "../../ui";
import { bookSession, useAvailableTime } from "../../../services";
import TimeSelector from "../../TimeSelector";
import { Spinner } from "@heroui/react";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";

interface TimeStepProps {
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    selectedDate: Date | null;
    setSelectedTime: (time: string | null) => void;
    selectedTime: string | null;
    mentorId: string;
    sessionId: string;
}

const TimeStep: React.FC<TimeStepProps> = ({
    selectedDate,
    setSelectedTime,
    selectedTime,
    mentorId,
    sessionId,
}) => {

    const { token } = useSelector((state: RootState) => state.auth)
    const location = useLocation()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    if (!selectedDate) {
        return <div className="text-center text-gray-500">Please select a date first.</div>;
    }

    const dateString = selectedDate.toLocaleDateString('en-CA'); 
    console.log(dateString)
    const { data: availableTimes, isLoading } = useAvailableTime(mentorId, sessionId, dateString);

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handlePayment = async () => {

        if (!selectedTime || !mentorId) {
            return;
        }

        if (!token) {
            toast.error('Login to continue');
            const callbackUrl = encodeURIComponent(location.pathname + location.search);
            navigate(`/login?callbackUrl=${callbackUrl}`, { replace: true });
            return; 
        }

        const payload = {
            date_and_time: selectedTime,
            mentor_session_id: sessionId,
        };

        try {

            setLoading(true)

            const response = await bookSession(payload)

            if (response?.url) {
                window.open(response.url, "_blank");
            }

        } catch (error) {

            toast.error(getErrorMessage(error))

        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="space-y-10 pt-6">

            {isLoading ? (
                <div className="flex justify-center py-4">
                    <Spinner size="lg" />
                </div>
            ) : availableTimes?.length ? (
                <TimeSelector
                    timeArray={availableTimes}
                    selectedTime={selectedTime || ""}
                    onTimeSelect={handleTimeSelect}
                />
            ) : (
                <div className="p-3 space-y-4 flex flex-col items-center text-center bg-gray-50 rounded-lg">
                    <i className="text-5xl ri-time-line"></i>
                    <p className="text-xs text-gray-500">
                        No available times found for the selected date.
                    </p>
                </div>
            )}

            {availableTimes && (
                <Button loading={loading} onPress={handlePayment} className="bg-black text-white w-full py-6"
                    isDisabled={!selectedTime}>
                    Continue to payment
                </Button>
            )}

        </div>
    );
};

export default TimeStep;
