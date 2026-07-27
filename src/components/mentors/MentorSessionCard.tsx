"use client"

import { Button, Skeleton } from "@heroui/react"
import type { SessionType } from "../../types"
import { formatCurrency } from "../../lib/formatCurrency"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const frequencyLabels: Record<"one-time" | "fortnightly" | "weekly" | "monthly", string> = {
    "one-time": "One-time",
    fortnightly: "Every 2 weeks",
    weekly: "Weekly",
    monthly: "Monthly",
}

type MentorSessionCardProps = {
    session: SessionType;
    full?: boolean;
    loading?: boolean;
    onBook?: (session: SessionType) => void;
};

const MentorSessionCard = ({ session, full = false, loading = false, onBook }: MentorSessionCardProps) => {

    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="space-y-2 py-4">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-0.5">
                    <h1 className="text-sm font-semibold text-[#29282B] lg:text-[15px]">
                        {loading ? (
                            <Skeleton className="w-24 h-5 rounded" />
                        ) : (
                            session?.title
                        )}
                    </h1>

                    <p className="text-[13px] font-medium text-[#62646A]">
                        {loading ? (
                            <Skeleton className="w-40 h-4 rounded" />
                        ) : (
                            <>
                                {session?.duration} minutes, {frequencyLabels[session?.frequency] ?? "One-time"}, {session?.sessions_count}{" "}
                                session{session?.sessions_count > 1 ? "s" : ""}
                            </>
                        )}
                    </p>
                </div>

                {!full && (
                    <Button
                        onPress={() => (onBook ? onBook(session) : navigate(`${session.id}`))}
                        size="sm"
                        radius="sm"
                        className="shrink-0 bg-black px-5 text-white"
                        isDisabled={loading}
                    >
                        {loading ? <Skeleton className="h-4 w-12 rounded" /> : "Book"}
                    </Button>
                )}
            </div>

            <p className="text-sm font-semibold text-[#29282B]">
                {loading ? <Skeleton className="h-5 w-16 rounded" /> : formatCurrency(session?.price)}
            </p>

            {full && (
                <div className="relative">
                    {loading ? (
                        <Skeleton className="w-full h-16 rounded" />
                    ) : (
                        <>
                            <div className={`text-[13px] leading-6 text-gray-500 ${isExpanded ? "" : "line-clamp-2"}`}>
                                {session?.description}
                            </div>

                            {(session?.description?.length ?? 0) > 130 && (
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="text-black hover:underline mt-3 text-right text-xs font-semibold">
                                        {isExpanded ? "Show Less" : "Show More"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default MentorSessionCard
