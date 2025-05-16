import { Skeleton } from "@heroui/react";

const MentorBannerSkeleton = () => {
    return (
        <div className="relative overflow-hidden mb-12">

            <div className="relative py-4 sm:py-6 px-5 xl:px-14 2xl:px-28 h-36 sm:h-44 !bg-gray-100 flex justify-between items-start overflow-hidden">
                <div className="relative z-10 flex justify-between w-full">
                    <Skeleton className="w-9 h-9 rounded-full !bg-gray-300" />
                    <div className="flex gap-x-3">
                        <Skeleton className="w-9 h-9 rounded-full !bg-gray-300" />
                        <Skeleton className="w-9 h-9 rounded-full !bg-gray-300" />
                    </div>
                </div>

                <div className="absolute bottom-5 right-5 xl:right-14 2xl:right-28 items-center flex gap-x-3">
                    <Skeleton className="w-24 h-6 !bg-gray-300" />
                </div>

            </div>

            <div className="flex text-center md:text-left items-start flex-row gap-x-3 mt-4 relative z-10">
                <div className="-mt-6 sm:-mt-16 md:-mt-12 max-w-sm translate-x-3 md:translate-x-5 xl:translate-x-12 2xl:translate-x-28 z-10">
                    <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full !bg-slate-100 !border-2 !border-white" />
                </div>

                <div className="translate-x-2 xl:translate-x-12 2xl:translate-x-28 space-y-1 -mt-2">
                    <Skeleton className="w-40 h-6 bg-gray-400" />
                    <Skeleton className="w-36 h-4 bg-gray-400" />
                    <Skeleton className="w-28 h-4 bg-gray-400" />
                </div>
            </div>

        </div>
    );
};

export default MentorBannerSkeleton;
