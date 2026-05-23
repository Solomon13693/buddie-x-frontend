import { NextAvailability } from "./mentor"

export type ExploreCategory = {
    label: string
    value: string
}

export type ExploreCertifiedMentor = {
    mentor_id: string
    slug: string
    name: string
    avatar: string
}

export type ExploreMentor = {
    mentor_id: string
    slug: string
    name: string
    bio?: string
    avatar: string
    title?: string
    employer?: string
    skills: string[]
    industries?: string[]
    yrs_of_experience?: number
    total_sessions: number
    total_reviews: number
    average_rating: number
    is_top_rated: boolean
    starting_price: number | null
    session_summary: string
    next_availability: NextAvailability | null
}

export type ExploreSection = {
    title: string
    industry: string
    mentor_count: number
    mentors: ExploreMentor[]
}

export type ExplorePageData = {
    categories: ExploreCategory[]
    popular_topics: string[]
    certified_mentors: ExploreCertifiedMentor[]
    sections: ExploreSection[]
}
