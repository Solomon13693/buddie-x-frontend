import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { Button } from "@heroui/react"
import { ExploreCard } from "../../../../components"
import { ExploreCardSkeleton } from "../../../../components/skeleton"
import { useEmblaNavigation } from "../../../../hooks/useEmblaNavigation"
import { ExploreSection } from "../../../../types/explore"

type ExploreTechSectionsProps = {
    section: ExploreSection
    isLoading?: boolean
}

const ExploreTechSections = ({ section, isLoading = false }: ExploreTechSectionsProps) => {
    const { emblaRef, canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useEmblaNavigation()

    if (!isLoading && section.mentors.length === 0) {
        return null
    }

    return (
        <div className="space-y-4 rounded-xl border border-[#E4E5E7] bg-white p-5">
            <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-x-1.5">
                    <h2 className="text-base font-semibold">
                        {section.industry ? `Explore ${section.title}` : section.title}
                    </h2>
                    <ArrowRightIcon className="size-4" />
                </div>

                <div className="inline-flex gap-x-3 sm:gap-x-6">
                    <Button
                        radius="full"
                        size="sm"
                        isIconOnly
                        className="border border-[#E4E5E7] bg-[#F5F5F5]"
                        isDisabled={!canScrollPrev}
                        onPress={scrollPrev}
                    >
                        <ChevronLeftIcon className="size-4" />
                    </Button>
                    <Button
                        radius="full"
                        size="sm"
                        isIconOnly
                        className="border border-[#E4E5E7] bg-[#F5F5F5]"
                        isDisabled={!canScrollNext}
                        onPress={scrollNext}
                    >
                        <ChevronLeftIcon className="size-4 rotate-180" />
                    </Button>
                </div>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-3">
                    {isLoading &&
                        Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="min-w-0 flex-[0_0_100%] pl-3 sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%]"
                            >
                                <ExploreCardSkeleton />
                            </div>
                        ))}

                    {!isLoading &&
                        section.mentors.map((mentor) => (
                            <div
                                key={mentor.mentor_id}
                                className="min-w-0 flex-[0_0_100%] pl-3 sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%]"
                            >
                                <ExploreCard mentor={mentor} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default ExploreTechSections
