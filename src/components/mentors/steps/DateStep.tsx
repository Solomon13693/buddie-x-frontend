import React from "react";
import DateSelector from "../../DateSelector";
import { FrequencyType } from "../../../types";
import { Button } from "../../ui";

interface DateStepProps {
    goToNextStep: () => void;
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    availableDates: any;
    sessions_count: number;
    frequency: FrequencyType;
    isOutOfOffice?: boolean;
}

const DateStep: React.FC<DateStepProps> = ({
    goToNextStep,
    selectedDate,
    setSelectedDate,
    availableDates,
    sessions_count,
    frequency,
    isOutOfOffice = false,
}) => {

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const handleContinue = () => {
        if (selectedDate) {
            goToNextStep();
        }
    };

    return (
        <div className="space-y-12">

            <DateSelector
                initialDate={selectedDate ? new Date(selectedDate) : null}
                availableDates={availableDates}
                disablePastDates={true}
                sessionsCount={sessions_count}
                frequency={frequency}
                onDateSelect={handleDateSelect}
                isOutOfOffice={isOutOfOffice}
            />

            <Button className="bg-black text-white w-full py-6"
                onPress={handleContinue}
                isDisabled={!selectedDate}>
                Continue
            </Button>

        </div>
    );
};

export default DateStep;
