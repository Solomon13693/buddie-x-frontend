import {
    ArrowTopRightOnSquareIcon,
    BoltIcon,
    MapPinIcon,
    VideoCameraIcon,
} from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"
import { User } from "@heroui/react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import FavouriteButton from "../../../../components/FavouriteButton"
import { RootState } from "../../../../redux/store"

export type MentorListCardProps = {
    mentorId: string
    name: string
    slug: string
    avatar: string
    rating: number
    reviewCount: number
    tagline: string
    country: string
    metaOffers?: string[]
    isTopRated?: boolean
    tags: string[]
    overflowTagCount?: number
    offersHourly?: boolean
    isHighlyResponsive?: boolean
    priceLabel: string
    priceSubtext?: string
}

const MentorListCard = ({
    mentorId,
    name,
    slug,
    avatar,
    rating,
    reviewCount,
    tagline,
    country,
    metaOffers = [],
    isTopRated = false,
    tags,
    overflowTagCount = 0,
    offersHourly = true,
    isHighlyResponsive = true,
    priceLabel,
    priceSubtext = "Satisfaction guarantee",
}: MentorListCardProps) => {

    const favourites = useSelector((state: RootState) => state.favourite.favourites)
    const isFavourite = favourites.some((fav) => fav.mentor_id === mentorId)

    return (
        <article className="rounded-2xl border border-[#E4E5E7] bg-white p-5 transition-shadow sm:p-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
                    <Link to={`/mentor/${slug}`} className="shrink-0">
                        <User
                            name={name}
                            avatarProps={{
                                src: avatar,
                                name,
                                size: "lg",
                                className: "size-14 sm:size-20",
                            }}
                            classNames={{
                                base: "inline-flex w-auto gap-0 p-0",
                                wrapper: "hidden",
                                name: "sr-only",
                                description: "hidden",
                            }}
                        />
                    </Link>

                    <div className="min-w-0 flex-1 space-y-1.5">
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-1">
                            <Link to={`/mentor/${slug}`} className="min-w-0 text-base font-medium leading-snug text-[#1B1D21] hover:underline sm:text-lg">
                                {name}
                            </Link>

                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:contents">
                                {isTopRated ? (
                                    <>
                                        <span
                                            className="hidden h-4 w-px shrink-0 bg-[#D5D5D5] sm:mx-3 sm:block"
                                            aria-hidden
                                        />
                                        <span className="shrink-0 rounded-full bg-[#FEDBA6] px-2.5 py-0.5 text-[11px] font-medium text-[#EF7420]">
                                            Top Rated
                                        </span>
                                    </>
                                ) : null}

                                <span
                                    className="hidden h-4 w-px shrink-0 bg-[#D5D5D5] sm:mx-3 sm:block"
                                    aria-hidden
                                />

                                <span className="inline-flex shrink-0 items-center gap-1 text-sm text-[#1B1D21]">
                                    <StarIcon className="size-4 shrink-0" />
                                    <span className="font-medium">{rating}</span>
                                    <span className="text-xs text-[#62646A]">
                                        ({reviewCount.toLocaleString()})
                                    </span>
                                </span>
                            </div>
                        </div>

                        <p className="text-xs leading-5 text-[#62646A] line-clamp-1">{tagline}</p>

                        <div className="flex flex-col gap-1 text-xs text-[#62646A] sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1">
                            <span className="inline-flex items-center gap-1.5">
                                <MapPinIcon className="size-4 shrink-0" />
                                {country}
                            </span>
                            {metaOffers.map((offer) => (
                                <span key={offer} className="inline-flex items-center gap-1.5">
                                    <VideoCameraIcon className="size-4 shrink-0" />
                                    {offer}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex w-full shrink-0 items-center justify-end gap-2 border-t border-[#EBEBEB] pt-3 lg:w-auto lg:border-t-0 lg:pt-0">
                    <FavouriteButton
                        mentorId={mentorId}
                        isActive={isFavourite}
                        size="sm"
                        filled
                        className="!size-8 min-w-8 rounded-lg border border-[#D5D5D5] bg-white"
                    />

                    <Link
                        to={`/mentor/${slug}`}
                        className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#D5D5D5] bg-white text-[#1B1D21]"
                    >
                        <ArrowTopRightOnSquareIcon className="size-4" />
                    </Link>

                    <Link
                        to={`/mentor/${slug}`}
                        className="rounded-lg border border-[#D5D5D5] px-4 py-2 text-xs text-[#1B1D21] hover:bg-[#FAFAFA]"
                    >
                        See profile
                    </Link>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                {offersHourly ? (
                    <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs text-[#1B1D21]">
                        Offers hourly rates
                    </span>
                ) : null}
                {tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[#D5D5D5] bg-white px-3 py-1 text-xs text-[#62646A]">
                        {tag}
                    </span>
                ))}
                {overflowTagCount > 0 ? (
                    <span className="text-xs font-medium text-[#62646A]">+{overflowTagCount}</span>
                ) : null}
            </div>

            <hr className="my-4 border-[#EBEBEB]" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {isHighlyResponsive ? (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-[#EEF4FF] px-2.5 py-1 text-xs font-medium text-[#4F6BFF]">
                        <BoltIcon className="size-3.5" />
                        Highly responsive
                    </span>
                ) : (
                    <span />
                )}

                <div className="sm:text-right">
                    <p className="text-xs font-medium text-[#62646A]">{priceLabel}</p>
                    <p className="mt-0.5 text-xs text-[#95979D]">{priceSubtext}</p>
                </div>

            </div>
        </article>
    )
}

export default MentorListCard
