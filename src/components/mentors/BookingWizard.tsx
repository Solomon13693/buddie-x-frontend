import React, { useState } from "react";
import DateStep from "./steps/DateStep";
import TimeStep from "./steps/TimeStep";
import { FrequencyType } from "../../types";
import { getSessionFrequencyText } from "../../utils";
import { Alert } from "@heroui/react";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import moment from "moment";

interface StepNavigationProps {
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    selectedTime: string | null;
    setSelectedTime: (time: string | null) => void;
    availableDates: any;
    sessions_count: number;
    frequency: FrequencyType;
    mentorId: string;
    sessionId: string;
}

interface Step {
    id: string;
    label: string;
    component: React.ComponentType<StepNavigationProps>;
}

const steps: Step[] = [
    { id: "date", label: "Select Date", component: DateStep },
    { id: "time", label: "Select Time", component: TimeStep },
];

const BookingWizard = ({
    availableDates,
    sessions_count,
    frequency,
    sessionId,
    mentorId
}: {
    availableDates: any;
    sessions_count: number;
    frequency: FrequencyType;
    sessionId: string;
    mentorId: string;
}) => {

    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const totalSteps = steps.length;
    const CurrentComponent = steps[currentStepIndex].component;

    const goToNextStep = () => {
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    const goToDateStep = () => {
        setCurrentStepIndex(0);
        setSelectedTime(null);
    };

    const frequencyText = getSessionFrequencyText(frequency, selectedDate, selectedTime || '');

    return (
        <div className="p-5 space-y-1 border border-slate-200 rounded-xl">

            <div className="mb-3 text-gray-600 text-xs text-right font-medium">
                Step {currentStepIndex + 1} of <span className="font-medium">{totalSteps}</span>
            </div>

            {(selectedDate || selectedTime) && (
                <div className="mb-6 bg-accent-50 rounded-lg p-3 space-y-2">
                    <p className="text-[12px] text-gray-700">This session is set for</p>

                    {selectedDate && (
                        <div className="flex items-center gap-x-2">
                            <CalendarIcon className="w-5 h-5 text-off-black" />
                            <p className="text-xs font-medium text-black">
                                {moment(selectedDate).format("dddd, Do MMMM")}
                            </p>
                            {currentStepIndex === 1 && (
                                <button
                                    className="text-primary-500 text-xs underline"
                                    onClick={goToDateStep}>
                                    Change Date
                                </button>
                            )}
                        </div>
                    )}

                    {selectedTime && (
                        <div className="flex items-center gap-x-2">
                            <ClockIcon className="w-5 h-5 text-off-black" />
                            <p className="text-xs font-medium text-black">
                                {moment(selectedTime).format("h:mm A")}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {frequencyText && (
                <div className="py-3">
                    <Alert variant="flat" color="primary" classNames={{ base: '!text-xs font-medium py-2' }}>
                        {frequencyText}
                    </Alert>
                </div>
            )}

            <CurrentComponent
                goToNextStep={goToNextStep}
                goToPreviousStep={goToPreviousStep}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                availableDates={availableDates}
                sessions_count={sessions_count}
                frequency={frequency}
                mentorId={mentorId}
                sessionId={sessionId}
            />

        </div>
    );
};

export default BookingWizard;
