import type { ExploreMentor } from "../../../../types/explore"
import type { MentorListApiMentor } from "./mapMentorToListCard"

export const mapMentorToExploreCard = (mentor: MentorListApiMentor): ExploreMentor => ({
    mentor_id: mentor.mentor_id,
    slug: mentor.slug,
    name: mentor.name,
    bio: mentor.bio,
    avatar: mentor.avatar,
    title: mentor.title,
    employer: mentor.employer,
    skills: mentor.skills ?? [],
    total_sessions: mentor.total_sessions ?? 0,
    total_reviews: mentor.total_reviews ?? 0,
    average_rating: mentor.average_rating ?? 0,
    is_top_rated: mentor.is_top_rated ?? false,
    starting_price: mentor.starting_price ?? null,
    session_summary: mentor.tagline ?? mentor.bio ?? "",
    next_availability: null,
})
