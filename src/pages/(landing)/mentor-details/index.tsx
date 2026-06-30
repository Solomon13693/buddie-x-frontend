import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Skeleton } from "@heroui/react"
import { useGetMentorDetails, useGetMentorReviews, useGetSessions } from "../../../services"
import { MentorProfileType, ReviewType, SessionType } from "../../../types"
import { useQueryParams } from "../../../utils"
import AboutMentor from "./AboutMentor"
import ExperienceMentor from "./ExperienceMentor"
import ExpertiseMentor from "./ExpertiseMentor"
import MentorProfile from "./MentorProfile"
import MentorSideDrawer from "./MentorSideDrawer"
import ReviewsMentor from "./ReviewsMentor"
import ToolkitMentor from "./ToolkitMentor"

const MentorDetailsView = () => {
    const { idOrSlug } = useParams<{ idOrSlug: string }>()
    const { searchParams, updateQueryParams } = useQueryParams()
    const activeTab = searchParams.get("tab") || "profile"

    const { response: mentor, isLoading: isMentorLoading, isError: isMentorError } = useGetMentorDetails(idOrSlug || "")
    const mentorId = mentor?.user?.mentor?.id || ""
    const { response: sessions = [], isLoading: isSessionsLoading } = useGetSessions(mentorId)
    const { response: reviews = [], isLoading: isReviewsLoading } = useGetMentorReviews(mentorId)

    const mentorSessions = (sessions || []) as SessionType[]
    const mentorReviews = (reviews || []) as ReviewType[]

    const [isBookSessionOpen, setIsBookSessionOpen] = useState(false)
    const [initialSessionId, setInitialSessionId] = useState<string>("")

    const openBookDrawer = (sessionId?: string) => {
        if (sessionId) setInitialSessionId(sessionId)
        setIsBookSessionOpen(true)
    }

    const closeBookDrawer = () => {
        setIsBookSessionOpen(false)
        setInitialSessionId("")
    }

    const mentorTabs = [
        { label: "Profile", value: "profile" },
        { label: "Expertise", value: "expertise" },
        { label: "Toolkit", value: "toolkit" },
        { label: "Experience", value: "experience" },
        { label: `Reviews (${mentor?.total_reviews ?? 0})`, value: "reviews" },
    ]

    if (isMentorLoading) {
        return (
            <div className="space-y-8 bg-[#FAFAFA] py-10">
                <div className="container mx-auto max-w-4xl space-y-5 px-4">
                    <Skeleton className="mx-auto size-28 rounded-full" />
                    <Skeleton className="mx-auto h-6 w-48 rounded" />
                    <Skeleton className="mx-auto h-4 w-72 rounded" />
                    <Skeleton className="h-40 w-full rounded-2xl" />
                </div>
            </div>
        )
    }

    if (isMentorError || !mentor?.user) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#FAFAFA] px-4 py-20">
                <p className="text-sm text-[#62646A]">Mentor not found.</p>
                <Link to="/explore" className="text-sm font-medium text-[#EF7420] hover:underline">
                    Browse mentors
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-8 bg-[#FAFAFA] py-10">

            <MentorProfile
                mentor={mentor as MentorProfileType}
                sessions={mentorSessions}
                isSessionsLoading={isSessionsLoading}
                onBookSession={() => openBookDrawer()}
            />

            <MentorSideDrawer
                isOpen={isBookSessionOpen}
                onClose={closeBookDrawer}
                mentor={mentor as MentorProfileType}
                sessions={mentorSessions}
                isSessionsLoading={isSessionsLoading}
                initialSessionId={initialSessionId}
            />

            <div className="container space-y-10">

                <div className="mx-auto flex max-w-4xl items-center gap-x-5 text-xs text-[#74767E]">
                    {mentorTabs.map((tab) => {
                        const isActive = activeTab === tab.value
                        return (
                            <button
                                key={tab.value}
                                type="button"
                                onClick={() => updateQueryParams({ tab: tab.value })}
                                className={isActive ? "font-medium text-black" : "hover:text-[#1B1D21]"}
                                aria-pressed={isActive}
                            >
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

                <div className="mx-auto max-w-6xl">
                    {activeTab === "profile" && (
                        <AboutMentor bio={mentor.user.bio} skills={mentor.user.skills} />
                    )}

                    {activeTab === "expertise" && (
                        <ExpertiseMentor expertise={mentor.user.expertise} categories={mentor.categories} />
                    )}

                    {activeTab === "toolkit" && (
                        <ToolkitMentor tools={mentor.user.mentor?.tools} />
                    )}

                    {activeTab === "experience" && (
                        <ExperienceMentor
                            education={mentor.user.education}
                            workExperience={mentor.user.work_experience}
                        />
                    )}

                    {activeTab === "reviews" && (
                        <ReviewsMentor
                            mentorId={mentorId}
                            reviews={mentorReviews}
                            isLoading={isReviewsLoading}
                            totalReviews={mentor.total_reviews}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MentorDetailsView
