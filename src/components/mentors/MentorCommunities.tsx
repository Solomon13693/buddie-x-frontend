import { useGetMentorCommunities } from "../../services"
import { CommunityType } from "../../types"
import CommunityCard from "../community/CommunityCard"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"

const MentorCommunities = ({ mentor_id }: { mentor_id: string }) => {

    const { response, isLoading } = useGetMentorCommunities(mentor_id || '')
    const navigate = useNavigate()
    const { role } = useSelector((state: RootState) => state.auth)

    const handleViewCommunity = (communityId: string) => {
        if (role === "mentor") {
            navigate(`/mentor/dashboard/communities/${communityId}`)
        } else if (role === "mentee") {
            navigate(`/dashboard/communities/${communityId}`)
        } else {
            navigate(`/dashboard/communities/${communityId}`)
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-4 !max-w-2xl -mt-5">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 animate-pulse">
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center space-x-3 flex-1">
                                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                        <div className="h-3 bg-gray-200 rounded mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-4 !max-w-2xl -mt-5">

            {response && response.length > 0
                ? response.map((community: CommunityType) => (
                    <CommunityCard 
                        key={community.id} 
                        community={community}
                        onViewDetails={handleViewCommunity}
                        hideJoinLeave={true}
                    />
                ))
                : (
                    <div className="px-4 py-6 space-y-4 flex flex-col items-center text-center bg-gray-50 rounded-lg">

                        <i className="text-5xl ri-community-fill"></i>

                        <p className="text-sm text-gray-500">
                            This mentor hasn't created any communities yet.
                        </p>

                    </div>
                )
            }

        </div>
    )
}

export default MentorCommunities

