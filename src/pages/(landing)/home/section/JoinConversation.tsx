import { Button } from "@heroui/react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { useGetRecentCommunityPosts } from "../../../../services"

const POSITIONS = [
    "lg:col-start-1 lg:row-start-1 lg:-translate-y-4",
    "lg:col-start-2 lg:row-start-1 lg:-translate-y-10",
    "lg:col-start-3 lg:row-start-1 lg:-translate-y-1",
    "lg:col-start-1 lg:row-start-2 lg:-translate-y-2",
    "lg:col-start-2 lg:row-start-2 lg:-translate-y-8",
    "lg:col-start-3 lg:row-start-2 lg:translate-y-2",
]

const FALLBACK = [
    "What marketing channels are effective in 2026?",
    "Best practices for conducting user research?",
    "How do I negotiate a higher salary?",
    "React vs Vue in 2026 — which should I learn?",
    "How do I transition from designer to product manager?",
    "What's the best way to find a mentor in tech?",
]

const JoinConversation = () => {

    const { role } = useSelector((state: RootState) => state.auth)
    const dashboardBase = role === "mentor" ? "/mentor/dashboard" : "/dashboard"
    const communityHref = `${dashboardBase}/communities`
    const askQuestionHref = role ? `${dashboardBase}/ask` : '/login'

    const { data: recentPosts } = useGetRecentCommunityPosts(6)

    const prompts = POSITIONS.map((position, index) => ({
        text: recentPosts?.[index]?.title ?? FALLBACK[index],
        position,
    }))

    return (
        <div className="container relative z-10 lg:pt-12">

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">

                <div className="max-w-md space-y-6">

                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-[#0E0E0E]">
                            Join the Conversation
                        </h2>
                        <p className="text-sm text-[#404145]">
                            Ask questions, exchange insights, learn from mentors and connect with peers across career,
                            technology, business, and personal growth.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">

                        <Button as={Link} to={askQuestionHref} className="h-10 px-6 bg-[#0E0E0E] text-white" size="sm" radius="sm">
                            Ask a Question
                        </Button>

                        <Button as={Link} to={communityHref} className="h-10 px-6 text-[#0E0E0E] border-1 border-[#DADADA]" variant="bordered" size="sm" radius="sm">
                            Browse Community
                        </Button>

                    </div>

                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {prompts.map((prompt, index) => (
                        <article key={index} className={`rounded-2xl border border-[#f3f3f3] bg-white px-4 py-8 shadow-[0px_16px_40px_0px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1 space-y-5 ${prompt.position}`}>
                            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F5D6]">
                                <img src="/img/home/face-id.svg" alt="Prompt icon" width={16} height={16} />
                            </div>
                            <p className="text-center text-sm sm:text-xs max-w-52 mx-auto font-medium text-[#141414]">
                                {prompt.text}
                            </p>
                        </article>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default JoinConversation
