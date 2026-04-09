import { Chip, Skeleton } from "@heroui/react";
import { MenteeProfileType } from "../../types/mentee";

const MenteeOverview = ({
    mentee,
    isLoading,
}: {
    mentee?: MenteeProfileType;
    isLoading?: boolean;
}) => {
    const { bio, skills, industries, languages, expertise, career_goals } = mentee || {};

    const sections = [
        { label: "Languages", list: languages },
        { label: "Skills", list: skills },
        { label: "Expertises", list: expertise },
        { label: "Industries", list: industries },
        { label: "Career Goals", list: career_goals },
    ];

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

    return (
        <div className="w-full">
            <p className="text-[13px] sm:text-sm leading-7 mb-8">
                {bio || <span className="text-xs text-gray-500">No bio available</span>}
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
    );
};

export default MenteeOverview;

