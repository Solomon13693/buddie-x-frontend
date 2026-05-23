import { StarIcon } from "@heroicons/react/24/solid"
import { Avatar, Chip } from "@heroui/react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { formatCurrency } from "../../lib/formatCurrency"
import FavouriteButton from "../FavouriteButton"
import { RootState } from "../../redux/store"
import { ExploreMentor } from "../../types/explore"

type ExploreCardProps = {
    mentor: ExploreMentor
}

const ExploreCard = ({ mentor }: ExploreCardProps) => {
    
    const favourites = useSelector((state: RootState) => state.favourite.favourites)
    const favouriteItem = favourites.find((fav) => fav.mentor_id === mentor.mentor_id)
    const isFavourite = !!favouriteItem

    const { next_availability: nextAvailability } = mentor
    const rating = mentor.average_rating?.toFixed(2) ?? "0"
    const subtitle = [mentor.title, mentor.employer].filter(Boolean).join(" · ")

    return (
        <Link
            to={`/mentor/${mentor.slug}`}
            className="block !cursor-pointer rounded-2xl border border-[#E6E8EC80] bg-white p-5 pb-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_56px_0px_#454F5D1F]"
        >
            <div className="space-y-3 !cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                    <Avatar size="lg" src={mentor.avatar} name={mentor.name} showFallback />

                    <div className="flex flex-col items-end">
                        <div className="inline-flex items-center gap-2">
                            <StarIcon className="size-5 text-[#FF9900]" />
                            <h4 className="text-base font-medium">{rating}</h4>
                        </div>
                        <p className="text-[12px] font-light text-[#62646A]">
                            {mentor.total_sessions} Sessions / {mentor.total_reviews} reviews
                        </p>
                    </div>
                </div>

                <div className="space-y-1">
                    <h2 className="text-sm font-semibold">{mentor.name}</h2>
                    {subtitle && <p className="text-xs text-[#676767] line-clamp-1">{subtitle}</p>}
                    {mentor.session_summary && (
                        <p className="pt-1 text-[11px] leading-5 text-[#676767] line-clamp-2">
                            {mentor.session_summary}
                        </p>
                    )}
                </div>

                {mentor.skills.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                        {mentor.skills.slice(0, 2).map((skill) => (
                            <Chip key={skill} size="sm" className="bg-[#E9ECF0] text-[11px]" radius="sm">
                                {skill}
                            </Chip>
                        ))}
                    </div>
                )}

                {nextAvailability && (
                    <div className="flex items-center gap-1.5">
                        <div className="flex shrink-0 flex-col items-center rounded bg-[#D0D6DF] p-px pt-1.5 pb-0.5">
                            <p className="text-[9px] leading-none text-[#74767E]">
                                {nextAvailability.day.slice(0, 3).toUpperCase()}
                            </p>
                            <div className="flex min-w-[1.75rem] items-center justify-center rounded-sm bg-white px-1.5 py-1 text-[11px] font-medium leading-none mt-1">
                                {nextAvailability.date
                                    ? new Date(nextAvailability.date).getDate()
                                    : "—"}
                            </div>
                        </div>
                        <div className="min-w-0 space-y-px">
                            <p className="text-[11px] font-medium leading-tight text-[#141B34]">Next availability</p>
                            <p className="text-[10px] leading-snug text-[#74767E]">
                                {nextAvailability.display || "No availability set"}
                            </p>
                        </div>
                    </div>
                )}
                
            </div>

            <hr className="mt-2.5 border-[#DADADA]" />

            <div className="flex items-center justify-between pt-1.5 pb-0">
                <div
                    className="cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                    <FavouriteButton mentorId={mentor.mentor_id} isActive={isFavourite} size="md" filled />
                </div>

                <div className="inline-flex items-end gap-x-1">
                    <h2 className="text-lg font-medium">
                        {mentor.starting_price != null ? formatCurrency(mentor.starting_price) : "—"}
                    </h2>
                    <span className="pb-1.5 text-[11px] text-[#2b2b2b9a]">Per session</span>
                </div>
            </div>
        </Link>
    )
}

export default ExploreCard
