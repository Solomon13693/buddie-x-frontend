import { useQuery } from "@tanstack/react-query"
import { axiosNoAuth } from "../lib"
import { ExploreCategory, ExploreCertifiedMentor, ExplorePageData } from "../types/explore"

export type ExploreParams = {
    category?: string
    search?: string
}

export const explorePageQueryKey = (params: ExploreParams = {}) =>
    ["explore_page", params.category ?? "", params.search ?? ""] as const

export const getExplorePage = async (params: ExploreParams = {}) => {
    const response = await axiosNoAuth.get("explore", { params })
    return response?.data?.data as ExplorePageData
}

export const useGetExplorePage = (params: ExploreParams = {}) => {
    const { data: response, isLoading, isError } = useQuery({
        queryKey: explorePageQueryKey(params),
        queryFn: () => getExplorePage(params),
    })

    return { response, isLoading, isError }
}

/** Shares cache with useGetExplorePage — no extra network request on explore page */
export const useExploreCategories = (params: ExploreParams = {}) => {
    const { data: categories = [], isLoading, isError } = useQuery({
        queryKey: explorePageQueryKey(params),
        queryFn: () => getExplorePage(params),
        select: (data) => data?.categories ?? ([] as ExploreCategory[]),
    })

    return { categories, isLoading, isError }
}

/** Top certified mentors — always unfiltered; shares cache with explore page load (no category/search) */
export const useExploreCertifiedMentors = () => {
    const { data: mentors = [], isLoading, isError } = useQuery({
        queryKey: explorePageQueryKey({}),
        queryFn: () => getExplorePage({}),
        select: (data) => data?.certified_mentors ?? ([] as ExploreCertifiedMentor[]),
    })

    return { mentors, isLoading, isError }
}
