import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Button, Image } from "@heroui/react";
import { useGoBack } from "../../lib";
import FavouriteButton from "../FavouriteButton";
import StarRating from "../StarRating";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { MentorProfileType } from "../../types";
import SocialLinks from "../SocialLink";
import { setSelectedChat } from "../../redux/features/chatSlice";
import { useNavigate } from "react-router-dom";

const MentorBanner = ({ mentor }: { mentor: MentorProfileType }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const average_rating = mentor?.average_rating

    const { fullname, avatar, employer, title, social_links, id } = mentor?.user || {}

    const goBack = useGoBack();

    const favourites = useSelector((state: RootState) => state.favourite.favourites);

    const mentor_id = mentor?.user?.mentor?.id

    const favouriteItem = favourites.find((fav) => fav.mentor_id === mentor_id);
    const isFavourite = !!favouriteItem;

    const handleMessage = () => {

        const payload = {
            id,
            fullname,
            avatar
        }

        dispatch(setSelectedChat({
            selectedChat: null,
            receiverUser: payload
        }))

        navigate('/dashboard/messages')

    }

    return (
        <div className="relative overflow-hidden mb-12">

            <div className="relative py-4 sm:py-6 px-5 xl:px-14 2xl:px-28 h-36 sm:h-44 bg-no-repeat bg-cover flex justify-between items-start overflow-hidden" style={{ backgroundImage: `url('https://adplist.org/photos/cover-photo.png')` }}>

                <div className="relative z-10 flex justify-between w-full">

                    <Button
                        isIconOnly
                        size="sm"
                        aria-label="Go back"
                        className="text-black bg-white"
                        radius="full"
                        variant="solid"
                        onPress={goBack}>
                        <ArrowLongLeftIcon className='size-4' />
                    </Button>

                    <div className="flex gap-x-3">

                        <FavouriteButton mentorId={mentor_id || ''} isActive={isFavourite} size="sm" />

                        <Button
                            onPress={handleMessage}
                            isIconOnly
                            size="sm"
                            aria-label="Share"
                            className="bg-white flex items-center justify-center text-black"
                            radius="full">
                            <ChatBubbleOvalLeftIcon className="size-4" />
                        </Button>

                    </div>

                </div>

                <div className="absolute bottom-5 right-5 xl:right-14 2xl:right-28 items-center flex gap-x-3">

                    <SocialLinks socialLinks={social_links ?? {}} />

                </div>

            </div>

            <div className="flex text-center md:text-left items-start flex-row gap-x-3 mt-4 relative z-10">

                <div className="-mt-8 sm:-mt-16 md:-mt-12 max-w-sm translate-x-3 md:translate-x-5 xl:translate-x-12 2xl:translate-x-28 z-10">
                    <Image
                        width={200}
                        height={200}
                        radius='full'
                        className='max-w-24 !object-cover max-h-24 md:max-h-32 md:max-w-32 border-5 border-white rounded-full'
                        src={avatar}
                        alt='Profile'
                    />
                </div>

                <div className="translate-x-2 xl:translate-x-12 2xl:translate-x-28 space-y-1 -mt-2">

                    <div className="flex items-center t gap-x-3">
                        <h2 className="text-black text-lg md:text-xl lg:text-2xl font-bold"> {fullname} </h2>
                    </div>

                    <p className="text-xs sm:text-sm font-medium line-clamp-1 text-gray-700">
                        {title} <span className="text-slate-500"> @ {employer} </span>
                    </p>

                    <StarRating initialValue={average_rating} readonly={true} />

                </div>

            </div>

        </div>
    );
};

export default MentorBanner;
