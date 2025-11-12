import React, { useState } from "react";
import { PopupModal, Button } from "../ui";
import DateStep from "../mentors/steps/DateStep";
import TimeSelector from "../TimeSelector";
import { useAvailableDates, useGetSessionDetails, useAvailableTime, useRescheduleSessionMentor, useRescheduleSessionMentee } from "../../services";
import { BookingType } from "../../types";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils";
import { Spinner } from "@heroui/react";

interface RescheduleModalProps {
    open: boolean;
    close: () => void;
    booking: BookingType;
    role: "mentor" | "mentee";
    onSuccess?: () => void;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
    open,
    close,
    booking,
    role,
    onSuccess
}) => {
    const [currentStep, setCurrentStep] = useState<"date" | "time">("date");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mentor_id = (booking?.mentor as any)?.mentor_id || booking?.mentor?.id || '';
    const session_id = booking?.session?.id || '';
    const booking_id = booking?.id;

    const { data: availableDates, isLoading: datesLoading } = useAvailableDates(mentor_id || '', session_id || '');
    const { response: sessionData, isLoading: sessionLoading } = useGetSessionDetails(mentor_id || '', session_id || '');

    const { frequency, sessions_count } = sessionData || {};
    const isOutOfOffice = (booking?.mentor as any)?.out_of_office || false;

    const rescheduleMentor = useRescheduleSessionMentor();
    const rescheduleMentee = useRescheduleSessionMentee();

    const handleReschedule = async () => {
        if (!selectedDate || !selectedTime) {
            toast.error("Please select both date and time");
            return;
        }

        setIsSubmitting(true);

        try {
            const mutation = role === "mentor" ? rescheduleMentor : rescheduleMentee;

            mutation.mutate(
                {
                    sessionId: booking_id,
                    dateAndTime: selectedTime
                },
                {
                    onSuccess: (data) => {
                        toast.success(data?.message || "Session rescheduled successfully");
                        close();
                        setSelectedDate(null);
                        setSelectedTime(null);
                        setCurrentStep("date");
                        
                        if (onSuccess) {
                            onSuccess();
                        }
                    },
                    onError: (error) => {
                        toast.error(getErrorMessage(error));
                    },
                    onSettled: () => {
                        setIsSubmitting(false);
                    }
                }
            );
        } catch (error) {
            toast.error(getErrorMessage(error));
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setSelectedDate(null);
            setSelectedTime(null);
            setCurrentStep("date");
            close();
        }
    };

    const goToTimeStep = () => {
        if (selectedDate) {
            setCurrentStep("time");
        }
    };

    const goToDateStep = () => {
        setCurrentStep("date");
        setSelectedTime(null);
    };

    return (
        <PopupModal
            size="2xl"
            isOpen={open}
            onClose={handleClose}
            placement="center"
            className="max-h-[95vh] bg-[#fafcfc]"
        >
            <div className="py-6 space-y-6 mt-3">
                <div>
                    <h2 className="text-black font-medium text-base sm:text-lg mb-2">
                        Reschedule Session
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm">
                        Select a new date and time for this session
                    </p>
                </div>

                {(datesLoading || sessionLoading) ? (
                    <div className="flex justify-center py-8">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <>
                        <div className="max-h-[60vh] overflow-y-auto">
                            {currentStep === "date" ? (
                                <DateStep
                                    goToNextStep={goToTimeStep}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    availableDates={availableDates}
                                    sessions_count={sessions_count}
                                    frequency={frequency}
                                    isOutOfOffice={isOutOfOffice}
                                />
                            ) : (
                                <TimeStepContent
                                    selectedDate={selectedDate}
                                    selectedTime={selectedTime}
                                    setSelectedTime={setSelectedTime}
                                    mentorId={mentor_id || ''}
                                    sessionId={session_id || ''}
                                    goToDateStep={goToDateStep}
                                    handleReschedule={handleReschedule}
                                    isSubmitting={isSubmitting}
                                    role={role}
                                    rescheduleMentor={rescheduleMentor}
                                    rescheduleMentee={rescheduleMentee}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </PopupModal>
    );
};

const TimeStepContent: React.FC<{
    selectedDate: Date | null;
    selectedTime: string | null;
    setSelectedTime: (time: string | null) => void;
    mentorId: string;
    sessionId: string;
    goToDateStep: () => void;
    handleReschedule: () => void;
    isSubmitting: boolean;
    role: "mentor" | "mentee";
    rescheduleMentor: ReturnType<typeof useRescheduleSessionMentor>;
    rescheduleMentee: ReturnType<typeof useRescheduleSessionMentee>;
}> = ({
    selectedDate,
    selectedTime,
    setSelectedTime,
    mentorId,
    sessionId,
    goToDateStep,
    handleReschedule,
    isSubmitting,
    role,
    rescheduleMentor,
    rescheduleMentee,
}) => {
    if (!selectedDate) {
        return <div className="text-center text-gray-500 py-8">Please select a date first.</div>;
    }

    const dateString = selectedDate.toLocaleDateString('en-CA');
    const { data: availableTimes, isLoading: timesLoading } = useAvailableTime(mentorId, sessionId, dateString);

    if (timesLoading) {
        return (
            <div className="flex justify-center py-8">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!availableTimes || availableTimes.length === 0) {
        return (
            <div className="p-3 space-y-4 flex flex-col items-center text-center bg-gray-50 rounded-lg">
                <i className="text-5xl ri-time-line"></i>
                <p className="text-xs text-gray-500">
                    No available times found for the selected date.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <TimeSelector
                timeArray={availableTimes}
                selectedTime={selectedTime || ""}
                onTimeSelect={(time) => setSelectedTime(time)}
            />
            <div className="flex gap-3 pt-4 border-t">
                <Button
                    variant="light"
                    className="flex-1"
                    onClick={goToDateStep}
                    isDisabled={isSubmitting}
                >
                    Back
                </Button>
                <Button
                    color="primary"
                    className="flex-1"
                    onClick={handleReschedule}
                    loading={isSubmitting || (role === "mentor" ? rescheduleMentor.isPending : rescheduleMentee.isPending)}
                    isDisabled={isSubmitting || !selectedDate || !selectedTime || (role === "mentor" ? rescheduleMentor.isPending : rescheduleMentee.isPending)}
                >
                    Reschedule Session
                </Button>
            </div>
        </div>
    );
};

export default RescheduleModal;

