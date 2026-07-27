import { StarIcon } from "@heroicons/react/24/solid"
import { Avatar, Skeleton } from "@heroui/react"
import { ReviewType } from "../../../types"

type ReviewsMentorProps = {
    mentorId: string
    reviews?: ReviewType[]
    isLoading?: boolean
    totalReviews?: number
}

const formatReviewDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return ""
    const diffMs = Date.now() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (diffDays < 1) return "Today"
    if (diffDays < 30) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`
    const diffMonths = Math.floor(diffDays / 30)
    return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`
}

const ReviewsMentor = ({
    mentorId,
    reviews = [],
    isLoading = false,
    totalReviews = 0,
}: ReviewsMentorProps) => {
    void mentorId // reserved for write-review flow

    return (
        <div className="space-y-8">
            <div className="rounded-2xl bg-white">
                <h2 className="border-b border-[#DADADA] px-5 py-4 text-base font-medium text-[#0E071D]">
                    Reviews ({totalReviews})
                </h2>

                {isLoading && (
                    <div className="space-y-4 p-5">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <Skeleton className="h-10 w-full rounded" />
                                <Skeleton className="h-16 w-full rounded" />
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && reviews.length === 0 && (
                    <p className="px-5 py-6 text-center text-sm text-[#62646A]">
                        There are no reviews available at the moment.
                    </p>
                )}

                {!isLoading && reviews.length > 0 && (
                    <div className="divide-y divide-[#E9E9E9] p-5">
                        {reviews.map((review) => (
                            <div key={review.id} className="flex max-w-3xl items-start gap-4 py-4">
                                <Avatar
                                    classNames={{
                                        base: "shrink-0",
                                        img: "shrink-0",
                                    }}
                                    src={review.user?.avatar || undefined}
                                    name={review.user?.fullname}
                                    size="md"
                                    showFallback
                                />

                                <div className="max-w-2xl space-y-0.5">
                                    <div className="space-y-0.5">
                                        <h3 className="text-sm font-medium text-[#29282B]">
                                            {review.user?.fullname}
                                        </h3>
                                    </div>

                                    <div className="inline-flex items-center gap-1.5 text-xs text-[#74767E]">
                                        <div className="inline-flex items-center gap-0.5">
                                            {Array.from({ length: review.rating }).map((_, index) => (
                                                <StarIcon key={index} className="size-3.5 text-[#FFB33E]" />
                                            ))}
                                        </div>
                                        <span className="text-[#FFB33E]">{review.rating}</span>
                                        <span className="h-4 border-l border-[#E4E5E7]" />
                                        <span className="text-[12px]">{formatReviewDate(review.created_at)}</span>
                                    </div>

                                    <p className="text-xs text-[#29282B]">{review.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReviewsMentor
