import { Chip } from "@heroui/react";
import React from "react";
import { WorkExperienceType } from "../../types";

const WorkExperienceHistory = ({ workExperiences }: { workExperiences: WorkExperienceType[] }) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    const sortedWorkExperiences = [...workExperiences].sort(
        (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );

    if (sortedWorkExperiences.length === 0) {
        return (
            <div className="px-4 py-6 space-y-4 flex flex-col items-center text-center bg-gray-50 rounded-lg">

                <i className="text-5xl ri-box-3-fill"></i>

                <p className="text-sm text-gray-500">
                    No education history available.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-5 divide-y px-2 -mt-4">
            {sortedWorkExperiences.map((item, index) => {
                const start = formatDate(item.start_date);
                const end = item.is_current || !item.end_date ? "Present" : formatDate(item.end_date);

                return (
                    <React.Fragment key={index}>
                        <div className="flex items-center justify-between pt-5">
                            <div className="flex flex-col">
                                <h1 className="text-sm font-semibold">{item?.title}</h1>
                                <p className="text-xs">@ {item?.employer}</p>
                            </div>
                            <Chip className="!text-[11px]">{`${start} - ${end}`}</Chip>
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default WorkExperienceHistory;
