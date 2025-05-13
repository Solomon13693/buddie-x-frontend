import { ZoomDetailType } from "../../types";
import EmptyState from "../EmptyState";
import { PopupModal } from "../ui";
import moment from "moment";

const BookingMeeting = ({ open, close, zoom_details }: { open: boolean; close: () => void; zoom_details: ZoomDetailType[] }) => {
    const now = moment();

    const isWithin10Minutes = (startTime: moment.Moment) => {
        const diffMinutes = startTime.diff(now, "minutes");
        return diffMinutes <= 10 && diffMinutes >= 0; // Meeting is within 10 minutes
    };

    return (
        <PopupModal
            size="4xl"
            isOpen={open}
            onClose={close}
            placement="center"
            className="max-h-[95vh]"
        >
            <div className="py-5">
                <h1 className="text-xs sm:text-sm font-medium mb-5 uppercase">Meeting Details</h1>

                {zoom_details.length > 0 ? (
                    zoom_details.map((detail) => {

                        const startTime = moment(detail.start_time);
                        const isPast = now.isAfter(startTime);
                        const isWithin10Min = isWithin10Minutes(startTime);
                        const isWithinDay = now.diff(startTime, "days") >= 1;

                        return (
                            <div key={detail.meeting_id} className='grid grid-cols-2 gap-2 mb-2 p-3 border rounded-lg bg-white'>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[#6E7E8D] text-xs">Start Time</label>
                                    <h1 className="font-medium text-xs">
                                        {startTime.format("MMMM Do YYYY, h:mm A")}
                                    </h1>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[#6E7E8D] text-xs">Meeting ID</label>
                                    <h1 className="font-medium text-xs">{detail.meeting_id}</h1>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[#6E7E8D] text-xs">Passcode</label>
                                    <h1 className="font-medium text-xs">{detail.passcode}</h1>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[#6E7E8D] text-xs">Join URL</label>
                                    <a href={isPast || isWithin10Min || isWithinDay ? undefined : detail.join_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`font-medium truncate text-xs underline ${isPast || isWithinDay ? "pointer-events-none text-gray-400" : ""
                                            }`}>
                                        {detail.join_url}
                                    </a>
                                </div>
                                
                            </div>
                        );
                    })
                ) : (
                    <>
                    
                    <EmptyState emptyText="No meeting details available." />

                    </>
                )}
            </div>
        </PopupModal>
    );
};

export default BookingMeeting;
