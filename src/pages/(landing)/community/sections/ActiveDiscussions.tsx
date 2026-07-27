import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { Button } from "@heroui/react"
import { Link } from "react-router-dom"

const ActiveDiscussions = () => {
    return (
        <div className="container max-w-5xl">
            
            <h2 className="text-lg md:text-xl font-medium text-center text-[#0E0E0E] mb-8">
                Active Discussions
            </h2>

            <div className="overflow-hidden rounded-xl grid grid-cols-1 md:grid-cols-[2fr_3fr]">

                <div className="bg-[linear-gradient(180deg,_#FBA852_0%,_#BE764F_100%)] p-8 lg:p-10 flex flex-col justify-center gap-3 min-h-[200px] md:min-h-[280px]">
                    <h2 className="text-xl font-medium text-white">Stand Online:</h2>
                    <p className="text-base text-white leading-snug">
                        How do I transition into tech with no experience?
                    </p>
                </div>

                <div className="bg-[#F5F5F5] p-8 lg:p-10 flex flex-col justify-center gap-5 min-h-[280px]">
                    <p className="text-xs text-[#9CA3AF]">
                        3:00 PM - 4:00 PM, Apr 21 WAT
                    </p>

                    <p className="text-sm text-[#404145] leading-6">
                        Join ongoing conversations, ask questions, and learn from mentors and peers in real time.
                    </p>

                    <Button as={Link} to="/communities" variant="light" className="w-fit text-xs text-[#9CA3AF] pl-0" size="sm"
                        endContent={<ChevronRightIcon className="size-3.5" />}>
                        Learn More
                    </Button>
                </div>


            </div>
        </div>
    )
}

export default ActiveDiscussions
