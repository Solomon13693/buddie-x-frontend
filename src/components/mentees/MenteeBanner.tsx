import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Button, Image } from "@heroui/react";
import { useGoBack } from "../../lib";
import { MenteeProfileType } from "../../types/mentee";

const MenteeBanner = ({ mentee }: { mentee?: MenteeProfileType }) => {
    const goBack = useGoBack();

    const { fullname, handle, avatar, employer, title } = mentee || {};

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
                </div>
            </div>

            <div className="flex text-center md:text-left items-start flex-row gap-x-3 mt-4 relative z-10">
                <div className="-mt-8 sm:-mt-16 md:-mt-12 max-w-sm translate-x-3 md:translate-x-5 xl:translate-x-12 2xl:translate-x-28 z-10">
                    <Image
                        width={200}
                        height={200}
                        radius='full'
                        className='max-w-24 !object-cover max-h-24 md:max-h-32 md:max-w-32 border-5 border-white rounded-full'
                        src={avatar || '/img/avatar.png'}
                        alt='Profile'
                    />
                </div>

                <div className="translate-x-2 xl:translate-x-12 2xl:translate-x-28 space-y-1 -mt-2">
                    <div className="flex items-center gap-x-3 flex-wrap">
                        <h2 className="text-black text-lg md:text-xl lg:text-2xl font-bold"> {fullname} </h2>
                        {handle && (
                            <span className="text-sm text-gray-500">@{handle}</span>
                        )}
                    </div>

                    <p className="text-xs sm:text-sm font-medium line-clamp-1 text-gray-700">
                        {title} {employer && <span className="text-slate-500"> @ {employer} </span>}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MenteeBanner;

