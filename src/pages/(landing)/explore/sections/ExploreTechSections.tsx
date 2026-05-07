import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { Button } from "@heroui/react"
import { ExploreCard } from "../../../../components"
import { useEmblaNavigation } from "../../../../hooks/useEmblaNavigation"

const slides = Array.from({ length: 8 })

const ExploreTechSections = ({ title }: { title: string }) => {
    const { emblaRef, canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useEmblaNavigation()

    return (
        <div className="bg-white border border-[#E4E5E7] rounded-xl p-5 space-y-4">

            <div className="flex items-center gap-2 justify-between">

                <div className="inline-flex items-center gap-x-1.5">
                    <h2 className="text-base font-semibold">Explore {' '}{title}</h2>
                    <ArrowRightIcon className="size-4" />
                </div>

                <div className="inline-flex gap-x-3 sm:gap-x-6">
                    <Button radius="full" size="sm" isIconOnly className="bg-[#F5F5F5] border 
                    border-[#E4E5E7]"
                        isDisabled={!canScrollPrev} onPress={scrollPrev}>
                        <ChevronLeftIcon className="size-4" />
                    </Button>
                    <Button radius="full" size="sm" isIconOnly className="bg-[#F5F5F5] border 
                    border-[#E4E5E7]"
                        isDisabled={!canScrollNext} onPress={scrollNext}>
                        <ChevronLeftIcon className="size-4 rotate-180" />
                    </Button>
                </div>

            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-3">
                    {slides.map((_, index) => (
                        <div key={index} className="pl-3 min-w-0 flex-[0_0_100%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%]">
                            <ExploreCard />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ExploreTechSections