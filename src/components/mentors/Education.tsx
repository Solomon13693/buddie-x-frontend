import { Chip } from "@heroui/react";
import { EducationType } from "../../types";

const EducationHistory = ({ education }: { education: EducationType[] }) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    const sortedEducation = [...education].sort((a, b) => {
        const dateA = new Date(a.end_date || a.start_date).getTime();
        const dateB = new Date(b.end_date || b.start_date).getTime();
        return dateB - dateA;
    });

    if (sortedEducation?.length === 0) {
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
            {sortedEducation?.map((item, index) => {
                const start = formatDate(item.start_date);
                const end = !item.end_date ? "Present" : formatDate(item.end_date);

                return (
                    <div key={index} className="flex items-center justify-between pt-5">
                        <div className="flex flex-col">
                            <h1 className="text-sm font-semibold">{item.degree}</h1>
                            <p className="text-xs font-medium">@ {item.institution}</p>
                            {item.field_of_study && (
                                <p className="text-xs italic text-muted-foreground">{item.field_of_study}</p>
                            )}
                        </div>
                        <Chip className="!text-[11px]">{`${start} - ${end}`}</Chip>
                    </div>
                );
            })}
        </div>
    );
};

export default EducationHistory;
