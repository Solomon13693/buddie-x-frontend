import { Button, Chip } from "@heroui/react"
import { Link } from "react-router-dom"
import SearchBarTwo from "../../../components/SearchBarTwo"
import { ExploreTechSectionSkeleton } from "../../../components/skeleton"
import { useExploreCategoryTree, useGetExplorePage } from "../../../services/explore"
import { useQueryParams } from "../../../utils"
import { CertifiedByBuddie, ExploreCategories } from "./components"
import { ExploreTechSections, PraticeSkills, SubcategorySection } from "./sections"

function ExploreView() {
    const { searchParams, updateQueryParams } = useQueryParams()
    const category = searchParams.get("category") || ""
    const search = searchParams.get("search") || ""

    const { response, isLoading } = useGetExplorePage({ category, search })
    const { tree } = useExploreCategoryTree()

    const { popular_topics: popularTopics = [], sections = [] } = response ?? {}

    const subcategories = category
        ? (tree.find((c) => c.value === category)?.subcategories ?? [])
        : []

    const clearSearch = () => updateQueryParams({ search: null })

    const handleTopicClick = (topic: string) => {
        updateQueryParams({ search: search === topic ? null : topic })
    }

    return (
        <div className="space-y-10 pt-10">
            <div className="container space-y-10">
                <ExploreCategories />

                <CertifiedByBuddie />

                <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center space-y-8 px-2 sm:px-0">
                    <SearchBarTwo
                        className="w-full"
                        inputClassName="!w-full h-12 pl-10"
                        placeholder="Search mentors by goal, skill, or expertise"
                        defaultValue={search}
                        onSearch={(value) => updateQueryParams({ search: value })}
                        onClear={clearSearch}
                    />

                    <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center">
                        <p className="text-xs text-[#525252]">Most Popular in:</p>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {isLoading &&
                                Array.from({ length: 5 }).map((_, index) => (
                                    <div
                                        key={`topic-skeleton-${index}`}
                                        className="h-7 w-20 animate-pulse rounded-full border border-[#EBEBEB] bg-gray-100"
                                    />
                                ))}

                            {!isLoading &&
                                popularTopics.map((topic) => (
                                    <Chip
                                        key={topic}
                                        variant={search === topic ? "solid" : "bordered"}
                                        className={`cursor-pointer text-[12px] ${
                                            search === topic
                                                ? "border-1 border-black bg-black text-white"
                                                : "border-1 border-black"
                                        }`}
                                        onClick={() => handleTopicClick(topic)}
                                    >
                                        {topic}
                                    </Chip>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Category selected: one section per subcategory */}
                {category && subcategories.map((sub) => (
                    <SubcategorySection key={sub.value} category={category} subcategory={sub} />
                ))}

                {/* No category: regular sections from API */}
                {!category && isLoading &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <ExploreTechSectionSkeleton key={index} />
                    ))}

                {!category && !isLoading &&
                    sections.map((section) => (
                        <ExploreTechSections
                            key={`${section.type ?? "topic"}-${section.filter_value ?? section.industry}-${section.title}`}
                            section={section}
                        />
                    ))}

                {!category && !isLoading && sections.length === 0 && (
                    <div className="flex flex-col items-center gap-3 py-10">
                        <p className="text-center text-sm text-[#74767E]">
                            No mentors found for this filter. Try another category or topic.
                        </p>
                        {search && (
                            <Button variant="light" size="sm" className="text-xs text-[#29282B]" onPress={() => updateQueryParams({ search: null })}>
                                Clear filters
                            </Button>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-center pt-5">
                    <Button
                        variant="bordered"
                        color="primary"
                        as={Link}
                        to="/mentors"
                        className="border-1 border-[#FFB33E] text-xs"
                        radius="sm"
                    >
                        View All Mentors
                    </Button>
                </div>
            </div>

            <PraticeSkills />
        </div>
    )
}

export default ExploreView
