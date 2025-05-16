import { useGetSessions } from "../../services"
import { SessionType } from "../../types"
import { MentorSessionCardSkeleton } from "../skeleton"
import MentorSessionCard from "./MentorSessionCard"

const MentorSessions = ({ mentor_id }: { mentor_id: string }) => {

    const { response, isLoading } = useGetSessions(mentor_id || '')


    if (isLoading) {
        return (
            <div className="space-y-4 divide-y !max-w-2xl -mt-5">
                {[...Array(5)].map((_, i) => (
                    <MentorSessionCardSkeleton key={i} />
                ))}
            </div>

        )
    }

    return (
        <div className="space-y-4 divide-y !max-w-2xl -mt-5">

            {response?.length > 0
                ? response.map((session: SessionType, index: number) => (

                    <MentorSessionCard session={session} key={index} />

                ))
                : (
                    <div className="px-4 py-6 space-y-4 flex flex-col items-center text-center bg-gray-50 rounded-lg">

                        <i className="text-5xl ri-box-3-fill"></i>

                        <p className="text-sm text-gray-500">
                            No sessions available.
                        </p>

                    </div>
                )
            }

        </div>
    )
}

export default MentorSessions