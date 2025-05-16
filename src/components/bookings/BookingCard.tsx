import { useState } from "react";
import { Button, User } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, ChevronRightIcon, CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import { BookingType } from "../../types";
import RejectOrCancelBookings from "./RejectOrCancelBookings";
import { useDisclosure } from "@mantine/hooks";
import { useApproveBooking, useMarkAsCompleted, useMarkAsInProgress } from "../../services";
import ConfirmationModal from "../modal/ConfirmationModal";
import BookingMeeting from "./BookingMeeting";
import { Link, useNavigate } from "react-router-dom";
import { setSelectedChat } from "../../redux/features/chatSlice";
import { useDispatch } from "react-redux";
import UploadSessionResources from "./UploadSessionResources";
import BookingResourcesModal from "./BookingResourcesModal";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils";

type RoleType = "mentor" | "mentee";

const BookingCard = ({ role, item }: { role: RoleType; item: BookingType }) => {

    const [showDetails, setShowDetails] = useState(false);

    const [openedReject, { open: openReject, close: closeReject }] = useDisclosure();
    const [openedCancel, { open: openCancel, close: closeCancel }] = useDisclosure();
    const [openedRefund, { open: openRefund, close: closeRefund }] = useDisclosure();
    const [opened, { open, close }] = useDisclosure()
    const [openedR, { open: openR, close: closeR }] = useDisclosure()
    const [openedT, { open: openT, close: closeT }] = useDisclosure()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        id,
        status,
        zoom_details,
        date_and_time,
        rejection_reason,
        cancellation_reason,
        mentor,
        user,
        session,
        created_at,
        payment_status,
        resources
    } = item;

    const { fullname: mentorName, email: mentorEmail, avatar: mentorAvatar, slug } = mentor;
    const { fullname: userName, email: userEmail, avatar: userAvatar } = user;
    const { title, sessions_count, frequency, duration } = session;

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmData, setConfirmData] = useState({
        title: "",
        description: "",
        onConfirm: () => { },
        confirmText: "",
        confirmClassName: "",
    });

    const { mutate: approveBooking, isPending: approving } = useApproveBooking();
    const { mutate: markAsInProgress, isPending: markingInProgress } = useMarkAsInProgress();
    const { mutate: markCompleted, isPending: markingCompleted } = useMarkAsCompleted();

    const handleConfirmation = (
        title: string,
        description: string,
        onConfirm: () => void,
        confirmText: string,
        confirmClassName: string
    ) => {
        setConfirmData({ title, description, onConfirm, confirmText, confirmClassName });
        setConfirmOpen(true);
    };

    const handleApprove = () => {
        handleConfirmation(
            "Approve Booking",
            "Are you sure you want to approve this booking?",
            () => approveBooking(id, {
                onSuccess: () => {
                    toast.success("Booking approved successfully.");
                    setConfirmOpen(false);
                },
                onError: (err) => {
                    toast.error(getErrorMessage(err));
                }
            }),
            "Approve",
            "bg-primary text-white"
        );
    };

    const handleMarkInProgress = () => {
        handleConfirmation(
            "Mark as In Progress",
            "Are you sure you want to mark this booking as in progress?",
            () => markAsInProgress(id, {
                onSuccess: () => {
                    toast.success("Booking marked as in progress.");
                    setConfirmOpen(false);
                },
                onError: (err) => {
                    toast.error(getErrorMessage(err));
                }
            }),
            "Mark as In Progress",
            "!bg-black text-white"
        );
    };

    const handleMarkCompleted = () => {
        handleConfirmation(
            "Mark as Completed",
            "Are you sure you want to mark this booking as completed?",
            () => markCompleted(id, {
                onSuccess: () => {
                    toast.success("Booking marked as completed.");
                    setConfirmOpen(false);
                },
                onError: (err) => {
                    toast.error(getErrorMessage(err));
                }
            }),
            "Mark as Completed",
            "!bg-black text-white"
        );
    };

    const handleMessageUser = () => {

        let payload

        if (role === 'mentor') {

            payload = {
                id: user?.id,
                fullname: user?.fullname,
                avatar: user?.avatar
            }

            dispatch(setSelectedChat({
                selectedChat: null,
                receiverUser: payload
            }))

            navigate('/mentor/dashboard/messages')

        } else {

            payload = {
                id: mentor?.id,
                fullname: mentor.fullname,
                avatar: mentor?.avatar
            }

            dispatch(setSelectedChat({
                selectedChat: null,
                receiverUser: payload
            }))

            navigate('/dashboard/messages')

        }

    }


    return (
        <>

            <div className={`p-3 rounded-xl border border-slate-200 ${showDetails ? "" : "border-l-3 border-l-primary"
                } space-y-3`}>

                <div className="flex items-center justify-between gap-2 flex-wrap">

                    <h2 className="text-black text-xs sm:text-sm font-medium">
                        {status === "pending" || status === "in_progress" ? (
                            <>
                                <span className="text-primary">{title}</span> mentorship session with{" "}
                                {role === "mentor" ? (
                                    <span className="text-primary">{userName}</span>
                                ) : (
                                    <Link target='_blank' to={`/mentors/${slug}`}>
                                        <span className="text-primary">{mentorName}</span>
                                    </Link>
                                )}
                            </>
                        ) : status === "confirmed" ? (
                            <>
                                Approved session with{" "}
                                {role === "mentor" ? (
                                    <span className="text-primary">{userName}</span>
                                ) : (
                                    <Link target='_blank' to={`/mentors/${slug}`}>
                                        <span className="text-primary">{mentorName}</span>
                                    </Link>
                                )}
                            </>
                        ) : status === "completed" ? (
                            <>
                                Completed session with{" "}
                                {role === "mentor" ? (
                                    <span className="text-primary">{userName}</span>
                                ) : (
                                    <Link target='_blank' to={`/mentors/${slug}`}>
                                        <span className="text-primary">{mentorName}</span>
                                    </Link>
                                )}
                            </>
                        ) : status === "rejected" ? (
                            <>
                                Rejected session with{" "}
                                {role === "mentor" ? (
                                    <span className="text-primary">{userName}</span>
                                ) : (
                                    <Link target='_blank' to={`/mentors/${slug}`}>
                                        <span className="text-primary">{mentorName}</span>
                                    </Link>
                                )}
                            </>
                        ) : status === "cancelled" ? (
                            <>
                                Cancelled session with{" "}
                                {role === "mentor" ? (
                                    <span className="text-primary">{userName}</span>
                                ) : (
                                    <Link target='_blank' to={`/mentors/${slug}`}>
                                        <span className="text-primary">{mentorName}</span>
                                    </Link>
                                )}
                            </>
                        ) : null}
                    </h2>

                    <button onClick={() => setShowDetails(!showDetails)} className="inline-flex items-center gap-1 cursor-pointer">
                        <span className="text-gray-500 text-xs font-medium">Details</span>
                        {showDetails ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="size-4" />}
                    </button>

                </div>


                <div className="flex items-center gap-3">

                    <div className="inline-flex items-center gap-2">
                        <CalendarDaysIcon className="w-5 h-5" />
                        <span className="text-xs">{new Date(date_and_time[0]).toDateString()}</span>
                    </div>

                    <div className="inline-flex items-center gap-2">
                        <ClockIcon className="w-5 h-5" />

                        {(() => {
                            const startTime = new Date(date_and_time[0]);
                            const duration = Number(session.duration);

                            const endTime = new Date(startTime.getTime() + duration * 60000);

                            const formatTime = (date: Date) =>
                                date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

                            return (
                                <span className="text-xs">
                                    {formatTime(startTime)} - {formatTime(endTime)}
                                </span>
                            );
                        })()}
                    </div>

                </div>

                <div className="flex items-center flex-wrap gap-2 pt-1">
                    {role === "mentor" ? (
                        <>
                            {status === "pending" && (
                                <>
                                    <Button onPress={handleApprove} size="sm" className="!bg-transparent rounded-md !text-black" variant="light">
                                        Approve
                                    </Button>

                                    <Button onPress={openReject} size="sm" className="!bg-transparent text-error-500 rounded-md" variant="light">
                                        Reject
                                    </Button>
                                </>
                            )}

                            {status === "confirmed" && (
                                <Button color="success" onPress={handleMarkInProgress} size="sm" className="rounded-md !text-success" variant="light">
                                    Mark as In Progress
                                </Button>
                            )}
                        </>
                    ) : (
                        <>

                            {["pending", "confirmed"].includes(status) && (
                                <Button onPress={openCancel} size="sm" color="danger" className="!bg-transparent text-error-500 rounded-md" variant="light">
                                    Cancel
                                </Button>
                            )}

                            {status === "in_progress" && (
                                <Button color="success" onPress={handleMarkCompleted} size="sm" className="rounded-md !text-success" variant="light">
                                    Mark as Completed
                                </Button>
                            )}

                            {payment_status !== 'refunded' &&
                                ["cancelled", "rejected"].includes(status) && (
                                    <Button
                                        onPress={openRefund}
                                        size="sm"
                                        color="danger"
                                        className="!bg-transparent text-error-500 rounded-md"
                                        variant="light"
                                    >
                                        Request Refund
                                    </Button>
                                )
                            }

                        </>
                    )}

                    {role === 'mentor' && ["confirmed", "in_progress", "completed"].includes(status) && (
                        <Button onPress={openR} size="sm" className="rounded-md">
                            Upload Resources
                        </Button>
                    )}


                    <Button onPress={handleMessageUser} size="sm" className="rounded-md">Send message</Button>

                    {["in_progress", "confirmed"].includes(status) && (
                        <Button onPress={open} color="primary" size="sm" className="rounded-md">
                            Meeting Details
                        </Button>
                    )}

                    {["in_progress", 'completed', 'confirmed'].includes(status) && (
                        <Button onPress={openT} color="primary" size="sm" className="rounded-md">Session Resources</Button>
                    )}

                </div>

                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden border-t pt-4 space-y-3">

                            <div className="flex flex-col gap-1">
                                <label className="text-[#6E7E8D] text-xs">
                                    {role === "mentor" ? "Mentee" : "Mentor"}
                                </label>
                                <User
                                    className="!justify-start"
                                    avatarProps={{
                                        src: (role === "mentor" ? userAvatar : mentorAvatar) ?? "",
                                    }}
                                    description={(role === "mentor" ? userEmail : mentorEmail) ?? ""}
                                    name={(role === "mentor" ? userName : mentorName) ?? ""}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[#6E7E8D] text-xs">Session Name</label>
                                <h1 className="font-medium text-sm">{title}</h1>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[#6E7E8D] text-xs">Session Count</label>
                                <h1 className="font-medium text-sm">{sessions_count}</h1>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[#6E7E8D] text-xs">Sessions Frequency</label>
                                <h1 className="font-medium text-sm">{frequency}</h1>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[#6E7E8D] text-xs">Sessions Duration</label>
                                <h1 className="font-medium text-sm">{duration}</h1>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[#6E7E8D] text-xs">Payment Status</label>
                                <h1 className="font-medium text-sm capitalize"> { payment_status } </h1>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-[#6E7E8D] text-xs">Booked Date</label>
                                <h1 className="font-medium text-sm">{new Date(created_at).toDateString()}</h1>
                            </div>

                            <div className="flex flex-col gap-1">
                                {role === "mentor" && cancellation_reason && (
                                    <>
                                        <label className="text-[#6E7E8D] text-xs">Cancellation Reason</label>
                                        <p className="font-medium text-xs">{cancellation_reason}</p>
                                    </>
                                )}

                                {role !== "mentor" && rejection_reason && (
                                    <>
                                        <label className="text-[#6E7E8D] text-xs">Rejection Reason</label>
                                        <p className="font-medium text-xs">{rejection_reason}</p>
                                    </>
                                )}
                            </div>


                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            {/* MEETING DETAILS */}
            <BookingMeeting zoom_details={zoom_details} open={opened} close={close} />

            {/* UPLOAD SESSION RESOURCES */}
            <UploadSessionResources sessionId={id} open={openedR} close={closeR} />

            {/* SESSION RESOURCES */}
            <BookingResourcesModal open={openedT} close={closeT} resources={resources ?? []} />

            {/* Reject Modal */}
            <RejectOrCancelBookings
                open={openedReject}
                close={closeReject}
                id={id}
                type="reject"
            />

            {/* Cancel Modal */}
            <RejectOrCancelBookings
                open={openedCancel}
                close={closeCancel}
                id={id}
                type="cancel"
            />

            {/* Refund Modal */}
            <RejectOrCancelBookings
                open={openedRefund}
                close={closeRefund}
                id={id}
                type="refund"
            />

            <ConfirmationModal
                loading={approving || markingInProgress || markingCompleted}
                open={confirmOpen}
                setOpen={setConfirmOpen}
                title={confirmData.title}
                description={confirmData.description}
                onConfirm={confirmData.onConfirm}
                confirmText={confirmData.confirmText}
                confirmClassName={confirmData.confirmClassName}
            />

        </>
    );
};

export default BookingCard;
