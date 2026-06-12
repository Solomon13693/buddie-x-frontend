import { useEffect, useMemo, useRef } from "react"
import { ExploreCard } from "../../../components"
import { ExploreCardSkeleton } from "../../../components/skeleton"
import { useInfiniteMentors } from "../../../services"
import {
    mapMentorToExploreCard,
    mapMentorToListCard,
    MentorListCard,
    MentorListCardSkeleton,
    MentorsFilterSidebar,
    MentorsResultsHeader,
    useMentorFilterParams,
} from "./components"
import type { MentorListApiMentor } from "./components"

const FULL_CATALOG_GRID =
    "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"

const MentorsView = () => {

    const { catalog, apiParams } = useMentorFilterParams()
    const loadMoreRef = useRef<HTMLDivElement>(null)
    const isFullCatalog = catalog === "full"

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteMentors(apiParams)

    const apiMentors = useMemo(() => {
        return (
            data?.pages.flatMap((page) => (page.mentors ?? []) as MentorListApiMentor[]) ?? []
        )
    }, [data?.pages])

    useEffect(() => {
        const target = loadMoreRef.current
        if (!target) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            { rootMargin: "240px" }
        )

        observer.observe(target)
        return () => observer.disconnect()
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    const showInitialSkeleton = isLoading && apiMentors.length === 0
    const initialSkeletonCount = isFullCatalog ? 8 : 12
    const totalCount = data?.pages[0]?.total ?? apiMentors.length

    return (
        <div className="container space-y-10 pt-10">
            <div className="grid min-h-0 grid-cols-1 items-start gap-x-6 gap-y-10 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr]">
                
                <MentorsFilterSidebar />

                <div className={isFullCatalog ? "min-w-0" : "min-w-0 space-y-3"}>
                    <MentorsResultsHeader
                        catalog={catalog}
                        totalCount={totalCount}
                        isLoading={isLoading && apiMentors.length === 0}
                    />

                    {showInitialSkeleton ? (
                        <div className={isFullCatalog ? FULL_CATALOG_GRID : "space-y-3"}>
                            {Array.from({ length: initialSkeletonCount }).map((_, index) =>
                                isFullCatalog ? (
                                    <ExploreCardSkeleton key={`mentor-skeleton-${index}`} />
                                ) : (
                                    <MentorListCardSkeleton key={`mentor-skeleton-${index}`} />
                                )
                            )}
                        </div>
                    ) : null}

                    {isError ? (
                        <p className="py-12 text-center text-sm text-danger">
                            Could not load mentors. Please try again.
                        </p>
                    ) : null}

                    {!showInitialSkeleton && !isError && apiMentors.length === 0 ? (
                        <p className="py-12 text-center text-sm text-[#62646A]">
                            No mentors match your filters. Try adjusting your selection.
                        </p>
                    ) : null}

                    {!isError && apiMentors.length > 0 ? (
                        isFullCatalog ? (
                            <div className={FULL_CATALOG_GRID}>
                                {apiMentors.map((mentor) => (
                                    <ExploreCard
                                        key={mentor.mentor_id}
                                        mentor={mapMentorToExploreCard(mentor)}
                                    />
                                ))}
                            </div>
                        ) : (
                            apiMentors.map((mentor) => (
                                <MentorListCard
                                    key={mentor.mentor_id}
                                    {...mapMentorToListCard(mentor)}
                                />
                            ))
                        )
                    ) : null}

                    {isFetchingNextPage ? (
                        <div
                            className={
                                isFullCatalog
                                    ? `mt-3 ${FULL_CATALOG_GRID}`
                                    : "mt-3 space-y-3"
                            }
                        >
                            {Array.from({ length: isFullCatalog ? 4 : 3 }).map((_, index) =>
                                isFullCatalog ? (
                                    <ExploreCardSkeleton key={`mentor-more-skeleton-${index}`} />
                                ) : (
                                    <MentorListCardSkeleton key={`mentor-more-skeleton-${index}`} />
                                )
                            )}
                        </div>
                    ) : null}

                    <div ref={loadMoreRef} className="h-1 w-full" aria-hidden />
                </div>
            </div>
        </div>
    )
}

export default MentorsView
