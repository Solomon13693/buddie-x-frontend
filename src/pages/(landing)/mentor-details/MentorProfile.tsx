import { StarIcon } from "@heroicons/react/24/solid"
import { Avatar, Button, Chip } from "@heroui/react"
import { formatCurrency } from "../../../lib/formatCurrency"
import { MentorProfileType, SessionType } from "../../../types"

type MentorProfileProps = {
    mentor: MentorProfileType
    sessions?: SessionType[]
    isSessionsLoading?: boolean
    onBookSession: () => void
}

const formatJoinedDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return ""
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

const MentorProfile = ({
    mentor,
    sessions = [],
    isSessionsLoading = false,
    onBookSession,
}: MentorProfileProps) => {
    const { user, next_availability, average_rating, total_sessions, total_reviews } = mentor
    const { fullname, avatar, title, employer, country, timezone, created_at } = user
    const isOutOfOffice = user.mentor?.out_of_office ?? false

    const durationChips = [...new Set(sessions.map((session) => session.duration))].sort((a, b) => a - b)

    const lowestPrice = sessions.reduce<number | null>((min, session) => {
        const price = parseFloat(String(session.price))
        if (Number.isNaN(price)) return min
        return min === null ? price : Math.min(min, price)
    }, null)

    const locationParts = [
        timezone,
        country?.name ? `from ${country.name}` : "",
        created_at ? `Joined ${formatJoinedDate(created_at)}` : "",
    ].filter(Boolean)


    return (
        <div className="border-b border-[#DADADA] pb-10">

            <div className="container mx-auto max-w-4xl space-y-5">

                <div className="space-y-0.5 text-center">

                    <Avatar src={avatar} size="lg" className="mx-auto mb-3 size-28" />

                    <h1 className="pb-1.5 text-xl font-semibold text-[#141B34]">{fullname}</h1>

                    <p className="text-xs text-[#141B34]">
                        {title}
                        {employer ? ` | ${employer}` : ""}
                    </p>

                    {locationParts.length > 0 && (
                        <span className="text-[11px] text-[#74767E]">{locationParts.join(" · ")}</span>
                    )}
                </div>

                <div className="w-full rounded-xl border border-[#C2C2C3] lg:rounded-2xl">

                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C2C2C3] px-5 py-4">

                        <div>
                            <h2 className="text-baselg:text-xl font-medium">
                                {lowestPrice !== null ? formatCurrency(lowestPrice) : "—"}
                            </h2>
                            <p className="-mt-1 text-xs text-[#62646A]">Starting price</p>
                        </div>

                        <div className="space-y-0.5">
                            <div className="flex flex-wrap items-center gap-2">
                                {isSessionsLoading && (
                                    <Chip size="sm" className="text-[11px]" radius="full">
                                        Loading...
                                    </Chip>
                                )}
                                {!isSessionsLoading &&
                                    durationChips.map((duration) => (
                                        <Chip
                                            key={duration}
                                            size="sm"
                                            className="bg-[#F6D7A7B2] text-[11px] text-[#EF7420]"
                                            radius="full"
                                        >
                                            {duration} min
                                        </Chip>
                                    ))}
                                {!isSessionsLoading && durationChips.length === 0 && (
                                    <Chip size="sm" className="text-[11px]" radius="full" variant="bordered">
                                        No sessions
                                    </Chip>
                                )}
                            </div>
                            <span className="text-[11px] font-light text-[#62646A]">Time Blocks Available</span>
                        </div>

                        <div className="flex flex-col items-start gap-y-0.5 sm:items-end">
                            <div className="inline-flex items-center gap-2">
                                <StarIcon className="size-4 text-[#FF9900]" />
                                <h4 className="text-sm font-medium">{average_rating?.toFixed(2) ?? "0"}</h4>
                            </div>
                            <p className="text-[12px] font-light text-[#62646A]">
                                {total_sessions} Sessions / {total_reviews} reviews
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center gap-2">
                            {next_availability && (
                                <div className="flex flex-col items-center gap-y-0.5 rounded-md bg-[#D0D6DF] p-0.5 pt-1">
                                    <p className="text-[10px] text-[#74767E]">
                                        {next_availability.day.slice(0, 3).toUpperCase()}
                                    </p>
                                    <div className="flex items-center justify-center rounded-md bg-white px-2.5 py-1 text-[10px] font-medium">
                                        {next_availability.date
                                            ? new Date(next_availability.date).getDate()
                                            : next_availability.start_time?.slice(0, 5) || "—"}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-0.5">
                                <h2 className="text-xs font-medium text-[#141B34]">Next availability</h2>
                                <p className="text-[11px] text-[#74767E]">
                                    {next_availability?.display || "No availability set"}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-0.5 text-right">
                            <h2 className="text-xs font-medium text-[#141B34]">Check availability</h2>
                            <p className="text-[11px] text-[#74767E]">Select a time slot that works for you</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 lg:px-5">
                    <Button
                        size="sm"
                        color="primary"
                        radius="sm"
                        className="h-9 px-5 text-[12px]"
                        onPress={onBookSession}
                        isDisabled={isOutOfOffice || (!isSessionsLoading && sessions.length === 0)}
                    >
                        {isOutOfOffice ? "Out of Office" : "Book Session"}
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default MentorProfile
