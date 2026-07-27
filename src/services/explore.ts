import { useQuery } from "@tanstack/react-query"
import { axiosNoAuth } from "../lib"
import { ExploreCategory, ExploreCategoryTreeItem, ExploreCertifiedMentor, ExplorePageData, ExploreSubcategory } from "../types/explore"

export type ExploreParams = {
    category?: string
    subcategory?: string
    search?: string
}

export const explorePageQueryKey = (params: ExploreParams = {}) =>
    ["explore_page", params.category ?? "", params.subcategory ?? "", params.search ?? ""] as const

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

/** Shares cache with useGetExplorePage when no subcategory is active */
export const useExploreCategories = (params: Pick<ExploreParams, "category" | "search"> = {}) => {
    const { data: categories = [], isLoading, isError } = useQuery({
        queryKey: explorePageQueryKey(params),
        queryFn: () => getExplorePage(params),
        select: (data) => data?.categories ?? ([] as ExploreCategory[]),
    })

    return { categories, isLoading, isError }
}

/** Reads subcategories for the selected category — shares cache with base explore request */
export const useExploreSubcategories = (params: Pick<ExploreParams, "category" | "search"> = {}) => {
    const { data: subcategories = [], isLoading } = useQuery({
        queryKey: explorePageQueryKey(params),
        queryFn: () => getExplorePage(params),
        select: (data) => data?.subcategories ?? ([] as ExploreSubcategory[]),
    })

    return { subcategories, isLoading }
}

/** Fetches mentors for a specific subcategory; merges all returned sections into one mentor list */
export const useSubcategoryMentors = (category: string, subcategory: string) => {
    const { data: mentors = [], isLoading } = useQuery({
        queryKey: explorePageQueryKey({ category, subcategory }),
        queryFn: () => getExplorePage({ category, subcategory }),
        select: (data) => data?.sections.flatMap((s) => s.mentors) ?? [],
        enabled: !!category && !!subcategory,
    })

    return { mentors, isLoading }
}

/** Full category tree from /explore-categories — source of truth for tab bar and subcategory nav */
export const useExploreCategoryTree = () => {
    const { data: tree = [], isLoading } = useQuery({
        queryKey: ["explore_category_tree"],
        queryFn: async () => {
            const response = await axiosNoAuth.get("explore-categories")
            return response?.data?.data as ExploreCategoryTreeItem[]
        },
    })

    return { tree, isLoading }
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
