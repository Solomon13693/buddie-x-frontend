import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"
import { Button, Chip, User } from "@heroui/react"
import { formatCurrency } from "../../lib/formatCurrency"
import { Link } from "react-router-dom"
import { MentorType } from "../../types"

type FeaturedSession = {
    id: string
    title: string
    description: string
    duration: number
    sessions_count: number
    frequency: string
    price: number | string
}

export type MarketplaceMentor = MentorType & {
    skills?: string[]
    expertise?: string[]
    industries?: string[]
    featured_session?: FeaturedSession | null
}

const getStableNumber = (value: string) => (
    Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0)
)

const pickStableOutcomes = (items: Array<string | null | undefined>, seed: string, count = 2) => {
    const outcomes = items.filter((item): item is string => Boolean(item))

    if (outcomes.length <= count) {
        return outcomes
    }

    const startIndex = getStableNumber(seed) % outcomes.length
    return Array.from({ length: count }, (_, index) => outcomes[(startIndex + index) % outcomes.length])
}

const MarketPlaceCard = ({ mentor }: { mentor: MarketplaceMentor }) => {
    const session = mentor.featured_session
    const skills = (mentor.skills || []).filter(Boolean).slice(0, 3)
    const category = mentor.expertise?.[0] || mentor.industries?.[0] || "Mentorship"
    const outcomes = pickStableOutcomes([
        session?.title ? `Focused ${session.title} guidance` : null,
        category ? `Clear ${category} next steps` : null,
        skills[0] ? `Actionable ${skills[0]} career advice` : null,
        skills[1] ? `Practical ${skills[1]} improvement plan` : null,
        skills[2] ? `Stronger ${skills[2]} execution` : null,
        category ? `Better ${category} decision-making` : null,
        mentor.total_completed_sessions ? `Insights from ${mentor.total_completed_sessions} completed sessions` : null,
    ], mentor.mentor_id || mentor.slug)

    return (
        <div className="flex w-full flex-1 flex-col gap-3.5 rounded-2xl border border-[#E6E8EC80] bg-white p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_56px_0px_#454F5D1F]">

            <User
                className="justify-start"
                avatarProps={{
                    src: mentor.avatar,
                }}
                description={mentor.title || mentor.employer || "Mentor"}
                name={mentor.name}
                classNames={{
                    name: "line-clamp-2 text-sm text-[#222222] font-semibold",
                    description: "line-clamp-2",
                }}
            />

            {/* =============== CATEGORY & DESCRIPTION =============== */}
            <div className="space-y-2">

                <Chip size="sm" variant="bordered" className="text-[10px] 
                border-1 border-[#DADADA] text-[#29282B]" radius="sm">
                    {category}
                </Chip>

                <p className="line-clamp-3 min-h-[3.75rem] text-[12px] leading-5 text-[#676767]">
                    {session?.description || mentor.bio || `Get expert guidance from ${mentor.name}.`}
                </p>

            </div>

            {/* =============== WHAT YOU'LL ACHIEVE =============== */}
            <div className="space-y-2">
                <h3 className="text-xs font-medium text-[#222222]">What you'll achieve:</h3>
                <ul className="space-y-1 text-xs text-[#525252]">
                    {(outcomes.length ? outcomes : ["Personalized mentorship", "Clear next steps"]).map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2">
                            <CheckCircleIcon className="shrink-0 size-4 text-[#EF7420]" />
                            <span>{outcome}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* =============== You'll receive: =============== */}
            <div className="space-y-2">

                <h3 className="text-xs font-medium text-[#222222]">You'll receive:</h3>

                <div className="flex min-h-[52px] flex-wrap items-start gap-2">
                    {(skills.length ? skills : ["Mentorship"]).map((skill) => (
                        <Chip key={skill} size="sm" className="text-[11px]" radius="sm">
                            {skill}
                        </Chip>
                    ))}
                </div>

            </div>

            <div className="flex-1" aria-hidden="true" />

            <div className="flex shrink-0 flex-col gap-3.5">
            {/* =============== RATINGS =============== */}
            <div className="inline-flex min-h-5 flex-wrap items-center gap-2 text-[11px]">
                <StarIcon className="size-5 text-[#FF9900]" />
                <span className="text-black font-medium">{mentor.average_rating || 0} ({mentor.total_reviews || 0} reviews)</span>
                <span className="text-[#62646A]">{mentor.total_sessions || 0} Sessions / {mentor.total_reviews || 0} reviews</span>
            </div>

            <hr className="border-[#DADADA]" />

            <div className="flex items-center justify-between">

                <div className="flex flex-col">
                    <span className="text-[10px] text-[#2b2b2b9a]">Starting from</span>
                    <div className="inline-flex items-end gap-x-1">
                        <h2 className="text-lg font-semibold text-[#2B2B2B]">
                            {session?.price ? formatCurrency(session.price) : "Profile"}
                        </h2>
                        {session?.price && <span className="text-[10px] text-[#2b2b2b9a] pb-0.5">/ session</span>}
                    </div>
                </div>

                <Button as={Link} to={`/mentor/${mentor.slug}`} className="h-9 px-6" size="sm" radius="sm" color="primary">
                    Book Now
                </Button>

            </div>
            </div>

        </div>
    )
}

export default MarketPlaceCard