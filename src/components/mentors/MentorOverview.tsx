import { Chip, Skeleton } from "@heroui/react";
import { AvailabilityDayType, MentorProfileType } from "../../types";

const MentorOverview = ({
    mentor,
    isLoading,
}: {
    mentor?: MentorProfileType;
    isLoading?: boolean;
}) => {
    const { bio, skills, industries, languages, expertise, mentor: mentorDetails } =
        mentor?.user || {};

    const sections = [
        { label: "Languages", list: languages },
        { label: "Skills", list: skills },
        { label: "Expertises", list: expertise },
        { label: "Industries", list: industries },
        { label: "Tools", list: mentorDetails?.tools },
    ];

    const availability: AvailabilityDayType[] = mentor?.availability || [];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="mb-4 space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-1/2" />
                </div>

                {sections.map((_, index) => (
                    <div key={index} className="py-3 flex flex-col gap-2">
                        <Skeleton className="h-5 w-1/3" />
                        <div className="flex items-center gap-2 flex-wrap">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-8 w-16 rounded-md" />
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        );
    }

    // helper to format time
    const formatTime = (time: string) => {
        if (!time) return "";
        const [hourStr, minute] = time.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12; // convert 0 -> 12
        return `${hour}:${minute} ${ampm}`;
    };


    return (
        <div className="flex flex-wrap gap-y-12 flex-col-reverse lg:flex-row">

            <div className="order-2 lg:order-1 w-full lg:w-2/3 xl:w-[70%] mb-4 lg:pr-10">

                <p className="text-[13px] sm:text-sm leading-7">
                    {bio || <span className="text-xs text-gray-500">—</span>}
                </p>

                <div className="pt-8 divide-y">
                    {sections.map(({ label, list }, index) => (
                        <div key={index} className="py-4 flex flex-col gap-3">
                            <h2 className="text-black text-sm font-semibold">{label}</h2>
                            <div className="flex items-center gap-2 flex-wrap">
                                {list?.length ? (
                                    list.map((item, i) => (
                                        <Chip
                                            key={i}
                                            size="sm"
                                            className="bg-gray-200 px-2 py-1"
                                        >
                                            {item}
                                        </Chip>
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-500">—</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Right section - Availability */}
            <div className="order-1 lg:order-2 w-full lg:w-1/3 xl:w-[30%] lg:pl-8">

                <div className="sticky top-36 lg:-translate-y-[0px]">

                    <h2 className="text-[#000] text-sm md:text-base font-semibold pb-8">
                        Mentor Availability Time
                    </h2>

                    <div className="space-y-4 md:space-y-5">
                        {availability.length ? (
                            availability.map((slot, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-x-2">
                                        <div
                                            className={`h-2 w-2 rounded-full ${slot.is_available
                                                ? "bg-[#68d9cf]"
                                                : "bg-gray-400"
                                                }`}
                                        ></div>
                                        <p className="text-sm text-black pt-0.5">
                                            {slot.day}
                                        </p>
                                    </div>
                                    <div className="text-[#858585] text-sm">
                                        {slot.is_available
                                            ? `${formatTime(slot.start_time)} - ${formatTime(
                                                slot.end_time
                                            )}`
                                            : "Closed"}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-gray-500">No availability set</p>
                        )}
                    </div>

                </div>

            </div>


        </div>
    );
};

export default MentorOverview;
