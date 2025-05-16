import { StarIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, Chip, Image } from '@heroui/react'
import { Link } from 'react-router-dom'
import { MentorType } from '../../types'
import FavouriteButton from '../FavouriteButton'
import { BriefcaseIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
const MentorCard = ({ mentor }: { mentor: MentorType }) => {

    const favourites = useSelector((state: RootState) => state.favourite.favourites);

    const favouriteItem = favourites.find((fav) => fav.mentor_id === mentor.mentor_id);

    const isFavourite = !!favouriteItem;

    return (
        <Card className="rounded-xl border p-2.5">

            <CardBody className="relative overflow-visible p-0">

                <Link to={`/mentor/${mentor.slug}`}>
                    <Image
                        shadow="none"
                        radius="md"
                        width={900}
                        height={900}
                        alt={mentor?.name}
                        className="w-full object-cover max-h-60 cursor-pointer"
                        src={mentor.avatar}
                    />
                </Link>

                <div className="flex items-center justify-between absolute top-2 right-3 left-3 z-10">

                    <FavouriteButton mentorId={mentor.mentor_id} isActive={isFavourite} size="sm" />

                    {mentor.is_top_rated && (
                        <Chip size="sm" className="bg-white text-[10px]">
                            Top Rated
                        </Chip>
                    )}

                </div>

            </CardBody>

            <Link to={`/mentor/${mentor.slug}`} className="px-1 pt-3 pb-1 space-y-1 block">

                <h2 className="text-sm font-semibold">
                    <span className="truncate">{mentor.name} </span>{' '}
                    <span className="text-gray-400 font-normal text-xs">{mentor.country.iso}</span>
                </h2>

                <p className="text-xs line-clamp-1 text-gray-700">
                    {mentor.bio}
                </p>

                <h2 className="text-xs font-medium"> {mentor.title} @
                    <span className="text-gray-500"> {mentor.employer} </span>
                </h2>

                <div className="flex items-center justify-between pb-3">

                    {/* REVIEWS */}
                    <div className="flex items-center gap-x-2">
                        <StarIcon className="size-4 text-yellow-600" />
                        <h1 className="text-sm font-medium text-black">
                            {mentor.average_rating}{' '}
                            <span className="text-gray-700 text-xs">({mentor.total_reviews} reviews)</span>
                        </h1>
                    </div>

                    {/* EXPERIENCE */}
                    <div className="flex items-center gap-x-2">
                        <BriefcaseIcon className="size-4" />
                        <h1 className="text-xs font-medium text-black">
                            {mentor.yrs_of_experience}{' '}years
                        </h1>
                    </div>

                </div>

                {/* EXPERIENCE */}
                <div className="flex items-center justify-between pt-2 border-t">

                    <div className="flex flex-col">
                        <h2 className="text-xs">Sessions</h2>
                        <h1 className="text-xs font-medium text-black">
                            {mentor.total_sessions}
                        </h1>
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-xs">Attendance</h2>
                        <h1 className="text-xs font-medium text-black">
                            {mentor.average_attendance}
                        </h1>
                    </div>

                </div>

            </Link>

        </Card>
    )
}

export default MentorCard