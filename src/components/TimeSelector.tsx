import moment from "moment";
import React from "react";

interface TimeSelectorProps {
    selectedTime: string;
    onTimeSelect?: (time: string) => void;
    timeArray: string[];
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ selectedTime, onTimeSelect, timeArray }) => {

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 lg:grid-cols-4">
            {timeArray?.map((rawTime) => {
                const formattedTime = moment(rawTime).format("h:mm A");
                return (
                    <button
                        key={rawTime}
                        onClick={() => onTimeSelect?.(rawTime)}
                        className={`p-2 text-xs text-center rounded-md transition-colors 
                            ${selectedTime === rawTime
                                ? "bg-black text-white "
                                : "border border-slate-400 text-slate-500"
                            }`}>
                        <div className="">{formattedTime}</div>
                    </button>
                );
            })}
        </div>
    );
};

export default TimeSelector;
