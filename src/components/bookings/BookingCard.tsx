import { useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, User } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, ChevronRightIcon, CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import { BookingType } from "../../types";
import RejectOrCancelBookings from "./RejectOrCancelBookings";
import { useDisclosure } from "@mantine/hooks";
import { useApproveBooking, useMarkAsCompleted, useMarkAsInProgress, useApproveSessionMentee, useCompleteSession } from "../../services";
import ConfirmationModal from "../modal/ConfirmationModal";
import moment from "moment";
import BookingMeeting from "./BookingMeeting";
import { Link, useNavigate } from "react-router-dom";
import { setSelectedChat } from "../../redux/features/chatSlice";
import { useDispatch } from "react-redux";
import UploadSessionResources from "./UploadSessionResources";
import BookingResourcesModal from "./BookingResourcesModal";
import ReviewModal from "./ReviewModal";
import RescheduleModal from "./RescheduleModal";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils";
import { formatCurrency } from "../../lib/formatCurrency";

type RoleType = "mentor" | "mentee";

const BookingCard = ({ role, item }: { role: RoleType; item: BookingType }) => {

    const [showDetails, setShowDetails] = useState(false);

    const [openedReject, { open: openReject, close: closeReject }] = useDisclosure();
    const [openedCancel, { open: openCancel, close: closeCancel }] = useDisclosure();
    const [openedRefund, { open: openRefund, close: closeRefund }] = useDisclosure();
    const [opened, { open, close }] = useDisclosure()
    const [openedR, { open: openR, close: closeR }] = useDisclosure()
    const [openedT, { open: openT, close: closeT }] = useDisclosure()
    const [openedReview, { open: openReview, close: closeReview }] = useDisclosure()
    const [openedReschedule, { open: openReschedule, close: closeReschedule }] = useDisclosure()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    const {
        id,
        status,
        has_reviewed,
        zoom_details,
        date_and_time,
        rejection_reason,
        cancellation_reason,
        rescheduled_by,
        mentor,
        user,
        session,
        created_at,
        payment_status,
        price,
        resources,
        refund_request_status,
    } = item;

    const { fullname: mentorName, handle: mentorHandle, avatar: mentorAvatar, slug, mentor_id } = mentor as any;
    const { fullname: userName, email: userEmail, avatar: userAvatar, handle: userHandle } = user;
    const { title, sessions_count, frequency, duration } = session;
    
    const mentorRecordId = mentor_id;

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmData, setConfirmData] = useState({
        title: "",
        description: "",
        onConfirm: () => { },
        confirmText: "",
        confirmClassName: "",
    });

    const { mutate: approveBooking, isPending: approving } = useApproveBooking();
    const { mutate: approveSessionMentee, isPending: approvingMentee } = useApproveSessionMentee();
    const { mutate: markAsInProgress, isPending: markingInProgress } = useMarkAsInProgress();
    const { mutate: markCompleted, isPending: markingCompleted } = useMarkAsCompleted();
    const { mutate: completeSessionMentor, isPending: completingSessionMentor } = useCompleteSession();

    // Mentors: can complete only after 24 hours since last session date. Mentees: can complete as soon as in_progress.
    const canCompleteSession = (): boolean => {
        if (status !== "in_progress" || !date_and_time || date_and_time.length === 0) return false;
        if (role === "mentee") return true;
        const lastSessionDate = moment(date_and_time[date_and_time.length - 1]);
        return moment().diff(lastSessionDate, "hours") >= 24;
    };

    const canComplete = canCompleteSession();

    const [completeCountdown, setCompleteCountdown] = useState<string>("");
    const invalidatedRef = useRef(false);
    
    useEffect(() => {
        if (role !== "mentor" || status !== "in_progress" || !date_and_time?.length) return;
        invalidatedRef.current = false;
        const lastSessionDate = moment(date_and_time[date_and_time.length - 1]);
        const unlockAt = lastSessionDate.clone().add(24, "hours");
        const update = () => {
            const now = moment();
            if (now.isSameOrAfter(unlockAt)) {
                setCompleteCountdown("");
                if (!invalidatedRef.current) {
                    invalidatedRef.current = true;
                    queryClient.invalidateQueries({ queryKey: ["bookings"] });
                }
                return;
            }
            const d = moment.duration(unlockAt.diff(now));
            const days = Math.floor(d.asDays());
            const hours = d.hours();
            const mins = d.minutes();
            const parts = [];
            if (days > 0) parts.push(`${days}d`);
            parts.push(`${hours}h`);
            parts.push(`${mins}m`);
            setCompleteCountdown(parts.join(" "));
        };
        update();
        const id = setInterval(update, 60_000);
        return () => clearInterval(id);
    }, [role, status, date_and_time, queryClient]);

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
        const isRescheduled = status === "rescheduled";
        const approveAction = () => {
            if (role === "mentor") {
                approveBooking(id, {
                    onSuccess: () => {
                        toast.success(isRescheduled ? "Rescheduled session approved successfully." : "Booking approved successfully.");
                        setConfirmOpen(false);
                    },
                    onError: (err) => {
                        toast.error(getErrorMessage(err));
                        setConfirmOpen(false);
                    }
                });
            } else {
                approveSessionMentee(id, {
                    onSuccess: () => {
                        toast.success("Rescheduled session approved successfully.");
                        setConfirmOpen(false);
                    },
                    onError: (err) => {
                        toast.error(getErrorMessage(err));
                        setConfirmOpen(false);
                    }
                });
            }
        };

        handleConfirmation(
            isRescheduled ? "Approve Rescheduled Session" : "Approve Booking",
            isRescheduled 
                ? "Are you sure you want to approve this rescheduled session?"
                : "Are you sure you want to approve this booking?",
            approveAction,
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
                                    userHandle ? (
                                        <Link target='_blank' to={`/mentee/${userHandle}`}>
                                            <span className="text-primary">{userName}</span>
                                        </Link>
                                    ) : (
                                        <span className="text-primary">{userName}</span>
                                    )
                                ) : (
                                    <Link target='_blank' to={`/mentor/${slug}`}>
                                        <span className="text-primary">{mentorName}</span>
                                    </Link>
                                )}
                            </>
                        ) : status === "rescheduled" ? (
                            <>
                                Rescheduled session with{" "}
                                {role === "mentor" ? (
                                    userHandle ? (
                                        <Link target='_blank' to={`/mentee/${userHandle}`}>
                                            <span className="text-primary">{userName}</span>
                                        </Link>
                                    ) : (
                                        <span className="text-primary">{userName}</span>
                                    )
                                ) : (
                                    <Link target='_blank' to={`/mentor/${slug}`}>
                                        <span className="text-primary">{mentorName}</span>
                                    </Link>
                                )}
                            </>
                        ) : status === "confirmed" ? (
                            <>
                                Approved session with{" "}
                                {role === "mentor" ? (
                                    userHandle ? (
                                        <Link target='_blank' to={`/mentee/${userHandle}`}>
                                            <span className="text-primary">{userName}</span>
                                        </Link>
                                    ) : (
                                        <span className="text-primary">{userName}</span>
                                    )
                                ) : (
                                    <Link target='_blank' to={`/mentor/${slug}`}>
                                        <span className="text-primary">{mentorName}</span>
                                    </Link>
                                )}
                            </>
                        ) : status === "completed" ? (
                            <>
                                Completed session with{" "}
                                {role === "mentor" ? (
                                    userHandle ? (
                                        <Link target='_blank' to={`/mentee/${userHandle}`}>
                                            <span className="text-primary">{userName}</span>
                                        </Link>
                                    ) : (
                                        <span className="text-primary">{userName}</span>
                                    )
                                ) : (
                                    <Link target='_blank' to={`/mentor/${slug}`}>
                                        <span className="text-primary">{mentorName}</span>
                                    </Link>
                                )}
                            </>
                        ) : status === "rejected" ? (
                            <>
                                Rejected session with{" "}
                                {role === "mentor" ? (
                                    userHandle ? (
                                        <Link target='_blank' to={`/mentee/${userHandle}`}>
                                            <span className="text-primary">{userName}</span>
                                        </Link>
                                    ) : (
                                        <span className="text-primary">{userName}</span>
                                    )
                                ) : (
                                    <Link target='_blank' to={`/mentor/${slug}`}>
                                        <span className="text-primary">{mentorName}</span>
                                    </Link>
                                )}
                            </>
                        ) : status === "cancelled" ? (
                            <>
                                Cancelled session with{" "}
                                {role === "mentor" ? (
                                    userHandle ? (
                                        <Link target='_blank' to={`/mentee/${userHandle}`}>
                                            <span className="text-primary">{userName}</span>
                                        </Link>
                                    ) : (
                                        <span className="text-primary">{userName}</span>
                                    )
                                ) : (
                                    <Link target='_blank' to={`/mentor/${slug}`}>
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
                            // date_and_time from API is UTC; show in viewer's local timezone (UK mentor → 11am, Nigeria mentee → 12pm for same moment)
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

                            {status === "rescheduled" && rescheduled_by === "mentee" && (
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
                                <>
                                    <Button color="success" onPress={handleMarkInProgress} size="sm" className="rounded-md !text-success" variant="light">
                                        Mark as In Progress
                                    </Button>
                                    <Button onPress={openReschedule} size="sm" color="primary" className="rounded-md" variant="light">
                                        Reschedule
                                    </Button>
                                </>
                            )}

                            {["pending", "rescheduled"].includes(status) && (
                                <Button onPress={openReschedule} size="sm" color="primary" className="rounded-md" variant="light">
                                    Reschedule
                                </Button>
                            )}

                            {status === "in_progress" && canComplete && (
                                <Button
                                    color="success"
                                    onPress={() => handleConfirmation(
                                        "Complete Session",
                                        "Are you sure you want to mark this session as completed? Your wallet will be credited.",
                                        () => completeSessionMentor(id, {
                                            onSuccess: () => {
                                                toast.success("Session marked as completed and your wallet has been credited.");
                                                setConfirmOpen(false);
                                            },
                                            onError: (err: unknown) => {
                                                toast.error(getErrorMessage(err));
                                                setConfirmOpen(false);
                                            }
                                        }),
                                        "Complete",
                                        "bg-success"
                                    )}
                                    size="sm"
                                    className="rounded-md !text-success"
                                    variant="light"
                                    isLoading={completingSessionMentor}
                                >
                                    Complete Session
                                </Button>
                            )}
                            {status === "in_progress" && !canComplete && (
                                <Button size="sm" className="rounded-md" variant="flat" isDisabled>
                                    Complete Session {completeCountdown ? `(${completeCountdown} left)` : "(24h after end)"}
                                </Button>
                            )}
                        </>
                    ) : (
                        <>

                            {status === "rescheduled" && rescheduled_by === "mentor" && (
                                <>
                                    <Button onPress={handleApprove} size="sm" className="!bg-transparent rounded-md !text-black" variant="light">
                                        Approve
                                    </Button>
                                </>
                            )}

                            {["pending", "confirmed", "rescheduled"].includes(status) && (
                                <>
                                    {status !== "rescheduled" && (
                                        <Button onPress={openCancel} size="sm" color="danger" className="!bg-transparent text-error-500 rounded-md" variant="light">
                                            Cancel
                                        </Button>
                                    )}
                                    <Button onPress={openReschedule} size="sm" color="primary" className="rounded-md" variant="light">
                                        Reschedule
                                    </Button>
                                </>
                            )}

                            {status === "in_progress" && canComplete && (
                                <Button color="success" onPress={handleMarkCompleted} size="sm" className="rounded-md !text-success" variant="light">
                                    Mark as Completed
                                </Button>
                            )}
                            {status === "in_progress" && !canComplete && (
                                <Button size="sm" className="rounded-md" variant="flat" isDisabled>
                                    Mark as Completed (24h after end)
                                </Button>
                            )}

                            {payment_status !== 'refunded' &&
                                ["cancelled", "rejected"].includes(status) && (
                                    refund_request_status === 'pending' ? (
                                        <Button
                                            size="sm"
                                            color="default"
                                            className="rounded-md"
                                            variant="flat"
                                            isDisabled
                                        >
                                            Refund requested
                                        </Button>
                                    ) : refund_request_status === 'approved' ? (
                                        <Button
                                            size="sm"
                                            color="default"
                                            className="rounded-md"
                                            variant="flat"
                                            isDisabled
                                        >
                                            Refund approved
                                        </Button>
                                    ) : (
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
                                )
                            }

                            {status === "completed" && (
                                has_reviewed ? (
                                    <Button
                                        size="sm"
                                        color="default"
                                        className="rounded-md"
                                        variant="flat"
                                        isDisabled
                                    >
                                        Review submitted
                                    </Button>
                                ) : (
                                    <Button
                                        onPress={openReview}
                                        size="sm"
                                        color="primary"
                                        className="rounded-md"
                                        variant="solid"
                                    >
                                        Review Mentor
                                    </Button>
                                )
                            )}

                        </>
                    )}

                    {["confirmed", "in_progress", "completed"].includes(status) && (
                        <Button onPress={openR} size="sm" className="rounded-md">
                            {role === "mentee" ? "Upload document" : "Upload Resources"}
                        </Button>
                    )}


                    <Button onPress={handleMessageUser} size="sm" className="rounded-md">Send message</Button>

                    {["in_progress", "confirmed"].includes(status) && (
                        <Button onPress={open} color="primary" size="sm" className="rounded-md">
                            Meeting Details
                        </Button>
                    )}

                    {["in_progress", 'completed', 'confirmed', 'rescheduled'].includes(status) && (
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
                                <div className="flex items-center justify-between">
                                    <User
                                        className="!justify-start"
                                        avatarProps={{
                                            src: (role === "mentor" ? userAvatar : mentorAvatar) ?? "",
                                        }}
                                        description={
                                            role === "mentor"
                                                ? (userHandle ? `@${userHandle}` : userEmail ?? "")
                                                : (mentorHandle ? `@${mentorHandle}` : (mentor as any).email ?? "")
                                        }
                                        name={(role === "mentor" ? userName : mentorName) ?? ""}
                                    />
                                    {role === "mentor" && userHandle && (
                                        <Link to={`/mentee/${userHandle}`}>
                                            <Button size="sm" variant="flat" className="cursor-pointer text-xs">
                                                View Profile
                                            </Button>
                                        </Link>
                                    )}
                                    {role === "mentee" && slug && (
                                        <Link to={`/mentor/${slug}`} target="_blank">
                                            <Button size="sm" variant="flat" className="cursor-pointer text-xs">
                                                View Profile
                                            </Button>
                                        </Link>
                                    )}
                                </div>
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
                                <h1 className="font-medium text-sm capitalize">
                                    {payment_status} {' '}
                                    {payment_status === "paid" && price != null && price !== "" && (
                                        <span className="text-[#6E7E8D] font-normal text-xs">
                                            { formatCurrency(price) }
                                        </span>
                                    )}
                                </h1>
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
            <UploadSessionResources sessionId={id} open={openedR} close={closeR} role={role} />

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

            {/* Review Modal */}
            {role === "mentee" && mentorRecordId && (
                <ReviewModal
                    open={openedReview}
                    close={closeReview}
                    mentor_id={mentorRecordId}
                    onSuccess={() => queryClient.invalidateQueries({ queryKey: ['mentee_bookings'] })}
                />
            )}

            {/* Reschedule Modal */}
            <RescheduleModal
                open={openedReschedule}
                close={closeReschedule}
                booking={item}
                role={role}
                onSuccess={() => {
                    // Bookings will be refreshed automatically via query invalidation
                }}
            />

            <ConfirmationModal
                loading={approving || approvingMentee || markingInProgress || markingCompleted || completingSessionMentor}
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
