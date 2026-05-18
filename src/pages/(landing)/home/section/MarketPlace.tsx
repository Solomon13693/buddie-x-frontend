import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { Button } from "@heroui/react"
import { MarketPlaceCard } from "../../../../components"
import { MarketPlaceCardSkeleton } from "../../../../components/skeleton"
import { Link } from "react-router-dom"
import { useGetTopMentors } from "../../../../services"
import { MarketplaceMentor } from "../../../../components/card/MarketPlaceCard"

const MarketPlace = () => {
    const { response, isLoading } = useGetTopMentors(4)
    const mentors: MarketplaceMentor[] = response?.mentors || []

    return (
        <div className="relative overflow-hidden">

            <img src="/img/effects/6.svg" alt="Effect 6" width={227} height={226} className="absolute top-0 right-0" />

            <img src="/img/effects/8.svg" alt="Effect 6" width={363} height={345}
                className="absolute bottom-0 left-0 w-[200px]" />

            <div className="container space-y-8 z-10 relative">

                <div className="flex flex-wrap items-center justify-between gap-2">

                    <div className="space-y-0.5">
                        <h2 className="text-xl font-medium text-[#0E0E0E]">
                            Featured Marketplace
                        </h2>
                        <p className="text-sm text-[#404145] font-light">
                            Handpicked services to accelerate your career
                        </p>
                    </div>

                    <Button as={Link} to="/explore" className="text-xs text-[#0E0E0E]" variant="light" radius="sm" endContent={<ArrowRightIcon className="size-4" />} size="sm">
                        View All
                    </Button>

                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {isLoading &&
                        Array.from({ length: 4 }).map((_, index) => <MarketPlaceCardSkeleton key={index} />)}

                    {!isLoading && mentors.map((mentor) => (
                        <MarketPlaceCard key={mentor.mentor_id} mentor={mentor} />
                    ))}

                </div>

                {!isLoading && mentors.length === 0 && (
                    <div className="rounded-2xl border border-[#E6E8EC80] bg-white p-6 text-center text-sm text-[#676767]">
                        No featured mentors are available yet.
                    </div>
                )}

            </div>

        </div>
    )
}

export default MarketPlace