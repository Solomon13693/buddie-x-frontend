import { formatCurrency } from "../../../../lib/formatCurrency"
import type { MentorListCardProps } from "./MentorListCard"

export type MentorListApiMentor = {
    mentor_id: string
    slug: string
    name: string
    bio: string
    avatar: string
    title?: string
    employer?: string
    country?: { iso?: string; name?: string } | null
    level?: string
    total_sessions: number
    total_reviews: number
    average_rating: number
    is_top_rated: boolean
    skills?: string[]
    expertise?: string[]
    tags_overflow_count?: number
    starting_price?: number | null
    price_unit?: string
    offers_hourly?: boolean
    offers_consultations?: boolean
    is_highly_responsive?: boolean
    tagline?: string
}

const META_OFFER_LIMIT = 2
const VISIBLE_TAG_LIMIT = 5

export const mapMentorToListCard = (mentor: MentorListApiMentor): MentorListCardProps => {
    const allSkillsAndExpertise = [...(mentor.skills ?? []), ...(mentor.expertise ?? [])]
    const metaOffers = allSkillsAndExpertise.slice(0, META_OFFER_LIMIT)
    const visibleTags = allSkillsAndExpertise.slice(META_OFFER_LIMIT, META_OFFER_LIMIT + VISIBLE_TAG_LIMIT)
    const overflowTagCount =
        mentor.tags_overflow_count ??
        Math.max(0, allSkillsAndExpertise.length - META_OFFER_LIMIT - visibleTags.length)

    const priceLabel =
        mentor.starting_price != null
            ? `Starting From ${formatCurrency(mentor.starting_price)}/${mentor.price_unit ?? "session"}`
            : "View pricing on profile"

    return {
        mentorId: mentor.mentor_id,
        name: mentor.name,
        slug: mentor.slug,
        avatar: mentor.avatar,
        rating: mentor.average_rating ?? 0,
        reviewCount: mentor.total_reviews ?? 0,
        tagline: mentor.tagline || mentor.bio || "",
        country: mentor.country?.name ?? "",
        metaOffers,
        isTopRated: mentor.is_top_rated,
        tags: visibleTags,
        overflowTagCount,
        offersHourly: mentor.offers_hourly ?? false,
        isHighlyResponsive: mentor.is_highly_responsive ?? false,
        priceLabel,
    }
}
