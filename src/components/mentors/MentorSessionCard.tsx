import { Button } from "@heroui/react"
import { SessionType } from "../../types"
import { formatCurrency } from "../../lib/formatCurrency"

const frequencyLabels: Record<"one-time" | "fortnightly" | "weekly" | "monthly", string> = {
    "one-time": "One-time",
    fortnightly: "Every 2 weeks",
    weekly: "Weekly",
    monthly: "Monthly",
}

const MentorSessionCard = ({ session }: { session: SessionType }) => {
    return (
        <>

            <div className="space-y-3 pt-5">
                <div className="flex items-start justify-between">
                    <div className="space-y-0.5 max-w-[70%]">
                        <h1 className="font-semibold text-sm lg:text-[15px]">{session.title}</h1>
                        <p className="text-xs lg:text-sm text-gray-500">
                            <span>
                                {session.duration} minutes, {frequencyLabels[session.frequency] ?? "One-time"}, {session.sessions_count} session{session.sessions_count > 1 ? "s" : ""}
                            </span>
                        </p>
                    </div>
                    <Button size="sm" className="bg-black text-white">Book</Button>
                </div>
                <h2 className="font-medium"> {formatCurrency(session.price)} </h2>
            </div>

        </>
    )
}

export default MentorSessionCard