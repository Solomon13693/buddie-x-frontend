import { XMarkIcon } from "@heroicons/react/24/solid"
import { Avatar, Button, Skeleton } from "@heroui/react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { DrawerComponent, TimeSelector } from "../../../components"
import HtmlClampText from "../../../components/common/HtmlClampText"
import { formatCurrency } from "../../../lib/formatCurrency"
import DateSelector from "../../../components/DateSelector"
import { bookSession, useAvailableDates, useAvailableTime } from "../../../services"
import { RootState } from "../../../redux/store"
import { getErrorMessage } from "../../../utils"
import { MentorProfileType, SessionType } from "../../../types"

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const DateCalendarSkeleton = () => (
    <div className="w-full animate-pulse" aria-hidden>
        <div className="mb-6 grid grid-cols-3 items-center">
            <Skeleton className="mx-auto size-8 rounded-full" />
            <Skeleton className="mx-auto h-4 w-28 rounded-md" />
            <Skeleton className="mx-auto size-8 rounded-full" />
        </div>
        <div className="grid w-full grid-cols-7 gap-y-3">
            {WEEKDAY_LABELS.map((day) => (
                <Skeleton key={day} className="mx-auto h-3 w-6 rounded" />
            ))}
            {Array.from({ length: 35 }).map((_, index) => (
                <Skeleton key={index} className="mx-auto size-8 rounded-full" />
            ))}
        </div>
    </div>
)

const TimeSlotsSkeleton = () => (
    <div className="grid grid-cols-2 gap-2 animate-pulse" aria-hidden>
        {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-full rounded-md" />
        ))}
    </div>
)

interface MentorSideDrawerProps {
    isOpen: boolean
    onClose: () => void
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"
    mentor?: MentorProfileType
    sessions?: SessionType[]
    isSessionsLoading?: boolean
    initialSessionId?: string
}

const MentorSideDrawer = (props: MentorSideDrawerProps) => {
    const {
        isOpen,
        onClose,
        size = "lg",
        mentor,
        sessions = [],
        isSessionsLoading = false,
        initialSessionId = "",
    } = props

    const navigate = useNavigate()
    const location = useLocation()
    const { token } = useSelector((state: RootState) => state.auth)

    const [selectedSessionId, setSelectedSessionId] = useState("")
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [isBooking, setIsBooking] = useState(false)

    const { user } = mentor ?? {}
    const { fullname, avatar, bio, mentor: mentorAccount } = user ?? {}
    const { id: mentorId = "", out_of_office: isOutOfOffice = false } = mentorAccount ?? {}

    const selectedSession = sessions.find((session) => session.id === selectedSessionId)
    const {
        description: sessionDescription,
        frequency = "one-time",
        sessions_count: sessionsCount = 1,
        price: sessionPrice,
    } = selectedSession ?? {}

    const dateString = selectedDate ? selectedDate.toLocaleDateString("en-CA") : ""

    const availableDatesResponse = useAvailableDates(mentorId, selectedSessionId)
    const { data: availableDates = [], isLoading: isDatesLoading } = availableDatesResponse

    const availableTimesResponse = useAvailableTime(mentorId, selectedSessionId, dateString)
    const { data: availableTimes = [], isLoading: isTimesLoading } = availableTimesResponse

    useEffect(() => {
        if (!isOpen) {
            setSelectedSessionId("")
            setSelectedDate(null)
            setSelectedTime(null)
            return
        }
        setSelectedSessionId(initialSessionId || "")
        setSelectedDate(null)
        setSelectedTime(null)
    }, [isOpen, initialSessionId])

    useEffect(() => {
        setSelectedDate(null)
        setSelectedTime(null)
    }, [selectedSessionId])

    const meetingDescription =
        sessionDescription || bio || `Book a session with ${fullname || "this mentor"}.`

    const handleSessionSelect = (sessionId: string) => {
        setSelectedSessionId(sessionId)
    }

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date)
        setSelectedTime(null)
    }

    const handleContinue = async () => {
        if (!selectedSessionId || !selectedTime) return

        if (!token) {
            toast.error("Login to continue")
            const callbackUrl = encodeURIComponent(location.pathname + location.search)
            navigate(`/login?callbackUrl=${callbackUrl}`, { replace: true })
            return
        }

        try {
            setIsBooking(true)
            const response = await bookSession({
                date_and_time: selectedTime,
                mentor_session_id: selectedSessionId,
            })

            if (response?.url) {
                window.open(response.url, "_blank")
            }
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setIsBooking(false)
        }
    }

    const isContinueDisabled =
        !selectedSessionId || !selectedDate || !selectedTime || isBooking

    return (
        <DrawerComponent
            isOpen={isOpen}
            onClose={onClose}
            position="right"
            size={size}
            showCloseButton={false}
            header={
                <div className="relative flex w-full items-center justify-center md:justify-between">
                    <h2 className="text-base font-semibold">Book a consultation</h2>
                    <Button
                        onPress={onClose}
                        isIconOnly
                        radius="full"
                        size="sm"
                        className="absolute right-0 bg-gray-200 text-black md:static">
                        <XMarkIcon className="size-4" />
                    </Button>
                </div>
            }
            footer={
                <div className="mb-0 flex flex-col items-center justify-center space-y-2 pb-0">
                    <Button size="sm" color="primary" radius="sm" className="h-10 w-full max-w-[350px] bg-black text-[12px] text-white" isDisabled={isContinueDisabled} isLoading={isBooking} onPress={handleContinue}>
                        Continue{sessionPrice != null ? ` ${formatCurrency(sessionPrice)}` : ""}
                    </Button>
                    {/* <p className="text-[12px] font-light text-[#74767E]">
                        The selected date and time will be held for 1 hour.
                    </p> */}
                </div>
            }
        >
            <div className="space-y-10 py-3 px-3">
                <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:text-left">
                    <Avatar
                        src={avatar}
                        size="lg"
                        classNames={{
                            base: "shrink-0",
                            img: "shrink-0",
                        }}
                    />
                    <div className="space-y-0.5">
                        <h2 className="text-sm font-semibold text-[#29282B]">During our meeting</h2>
                        <HtmlClampText content={meetingDescription} lines={3} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2 border-b border-[#DADADA] pb-6">
                        <h2 className="text-xs font-medium text-[#29282B] text-center md:text-left">Select available session</h2>

                        {isSessionsLoading && (
                            <div className="grid grid-cols-2 gap-2">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <Skeleton key={index} className="h-[72px] rounded-md" />
                                ))}
                            </div>
                        )}

                        {!isSessionsLoading && sessions.length === 0 && (
                            <p className="text-xs text-[#62646A] text-center md:text-left">No sessions available.</p>
                        )}

                        {!isSessionsLoading && sessions.length > 0 && (
                            <div className="grid grid-cols-1 gap-2">
                                {sessions.map((session) => {
                                    const isSelected = selectedSessionId === session.id
                                    return (
                                        <button
                                            key={session.id}
                                            type="button"
                                            onClick={() => handleSessionSelect(session.id || "")}
                                            className={`rounded-lg border p-3 text-left text-xs transition-colors ${
                                                isSelected
                                                    ? "border-black bg-black text-white"
                                                    : "border-[#E9ECF0] text-[#404145] hover:border-gray-300"
                                            }`} >
                                            <span className="block font-medium leading-snug">{session.title}</span>
                                            <span className={`mt-1 block text-[11px] ${
                                                    isSelected ? "text-white/80" : "text-[#62646A]"
                                                }`}>
                                                {session.duration} Mins ·{" "}
                                                <span className={isSelected ? "text-white" : "font-semibold text-[#29282B]"}>
                                                    {formatCurrency(session.price)}
                                                </span>
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div className="space-y-5 border-b border-[#DADADA] pb-6">
                        <h2 className="text-xs font-medium text-[#29282B] text-center md:text-left">Select a date and time</h2>

                        {!selectedSessionId && (
                            <p className="text-[11px] text-[#74767E] text-center md:text-left">Select a session to view available dates.</p>
                        )}

                        {selectedSessionId && isDatesLoading && <DateCalendarSkeleton />}

                        {selectedSessionId && !isDatesLoading && (
                            <DateSelector
                                initialDate={selectedDate}
                                availableDates={availableDates}
                                disablePastDates
                                frequency={frequency}
                                sessionsCount={sessionsCount}
                                isOutOfOffice={isOutOfOffice}
                                onDateSelect={handleDateSelect}
                            />
                        )}
                    </div>

                    <div className="space-y-5 border-b border-[#DADADA] pb-6">
                        <h2 className="text-xs font-medium text-[#29282B] text-center md:text-left">Choose a time</h2>

                        {!selectedDate && (
                            <p className="text-[11px] text-[#74767E] text-center md:text-left">Select a date to see available times.</p>
                        )}

                        {selectedDate && isTimesLoading && <TimeSlotsSkeleton />}

                        {selectedDate && !isTimesLoading && availableTimes.length > 0 && (
                            <TimeSelector
                                timeArray={availableTimes}
                                selectedTime={selectedTime || ""}
                                onTimeSelect={(time) => setSelectedTime(time)}
                            />
                        )}

                        {selectedDate && !isTimesLoading && availableTimes.length === 0 && (
                            <p className="text-center text-[11px] text-[#74767E]">
                                No available times found for the selected date.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </DrawerComponent>
    )
}

export default MentorSideDrawer
