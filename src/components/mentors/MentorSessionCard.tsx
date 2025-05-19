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
};

const MentorSessionCard = ({ session, full = false, loading = false }: MentorSessionCardProps) => {

    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="space-y-3 pt-5">
            <div className="flex items-start justify-between">
                <div className="space-y-0.5 max-w-[70%]">
                    <h1 className="font-semibold text-sm lg:text-[15px]">
                        {loading ? (
                            <Skeleton className="w-24 h-5 rounded" />
                        ) : (
                            session?.title
                        )}
                    </h1>

                    <p className="text-[13px] font-medium text-gray-600">
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
                        onPress={() => navigate(`${session.id}`)} 
                        size="sm" 
                        className="bg-black text-white"
                        isDisabled={loading}
                    >
                        {loading ? <Skeleton className="w-12 h-4 rounded" /> : "Book"}
                    </Button>
                )}
            </div>

            <h2 className="font-medium">
                {loading ? <Skeleton className="w-16 h-5 rounded" /> : formatCurrency(session?.price)}
            </h2>

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
