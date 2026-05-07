import { StarIcon } from "@heroicons/react/24/solid"
import { Avatar, Button } from "@heroui/react"

const REVIEWS = Array.from({ length: 3 }).map((_, index) => ({
    id: index + 1,
    reviewer: "Stanley Ogbonna",
    country: "United States",
    rating: 5,
    timeAgo: "1 month ago",
    message: "Amazing work. Will def work again with him this was a big project and he knocked it out of the park.",
}))

const ReviewsMentor = () => {
    return (
        <div className="space-y-8">

            <div className="rounded-2xl bg-white">

                <h2 className="border-b border-[#DADADA] px-5 py-4 text-base font-medium text-[#0E071D]">
                    Reviews (56)
                </h2>

                <div className="divide-y divide-[#E9E9E9] p-5">
                    {REVIEWS.map((review) => (

                        <div key={review.id} className="max-w-3xl flex items-start gap-4 py-4">

                            <Avatar 
                            classNames={{
                                base: 'shrink-0',
                                img: 'shrink-0'
                            }} name={review.reviewer} size="md" showFallback />

                            <div className="max-w-2xl space-y-0.5">

                                <div className="space-y-0.5">
                                    <h3 className="text-sm font-medium text-[#29282B]">{review.reviewer}</h3>
                                    <p className="text-[12px] text-[#74767E]">{review.country}</p>
                                </div>

                                <div className="inline-flex items-center gap-1.5 text-xs text-[#74767E]">
                                    <div className="inline-flex items-center gap-0.5">
                                        {Array.from({ length: review.rating }).map((__, index) => (
                                            <StarIcon key={index} className="size-3.5 text-[#FFB33E]" />
                                        ))}
                                    </div>
                                    <span className="text-[#FFB33E]">{review.rating}</span>
                                    <span className="border-l border-[#E4E5E7] h-4"></span>
                                    <span className="text-[12px]">{review.timeAgo}</span>
                                </div>

                                <p className="text-xs text-[#29282B]">{review.message}</p>

                            </div>
                        </div>

                    ))}
                </div>

            </div>

            <div className="flex items-center justify-center">
                <Button size="sm" className="border-1 text-[12px]" color="primary" 
                variant="bordered">
                    View More
                </Button>
            </div>

        </div>
    )
}

export default ReviewsMentor
