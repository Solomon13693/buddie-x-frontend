import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { Button } from "@heroui/react"
import { MarketPlaceCard } from "../../../../components"

const MarketPlace = () => {
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

                    <Button className="text-xs text-[#0E0E0E]" variant="light" radius="sm" endContent={<ArrowRightIcon className="size-4" />} size="sm">
                        View All
                    </Button>

                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    <MarketPlaceCard />

                    <MarketPlaceCard />

                    <MarketPlaceCard />

                    <MarketPlaceCard />

                </div>

            </div>

        </div>
    )
}

export default MarketPlace