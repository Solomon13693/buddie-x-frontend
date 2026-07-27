import moment from "moment";
import React from "react";

interface TimeSelectorProps {
    selectedTime: string;
    onTimeSelect?: (time: string) => void;
    timeArray: string[];
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ selectedTime, onTimeSelect, timeArray }) => {

    return (
        <div className="grid grid-cols-2 gap-2 mt-4">
            {timeArray?.map((rawTime) => {
                const formattedTime = moment(rawTime).format("h:mm A");
                return (
                    <button
                        key={rawTime}
                        onClick={() => onTimeSelect?.(rawTime)}
                        className={`p-2 text-[12px] font-medium text-center rounded-md transition-colors 
                            ${selectedTime === rawTime
                                ? "bg-black text-white "
                                : "border border-[#B5B6BA] text-[#404145]"
                            }`}>
                        <div className="">{formattedTime}</div>
                    </button>
                );
            })}
        </div>
    );
};

export default TimeSelector;
