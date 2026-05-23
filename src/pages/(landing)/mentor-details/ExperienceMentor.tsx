import { EducationType, WorkExperienceType } from "../../../types"

type ExperienceMentorProps = {
    education?: EducationType[]
    workExperience?: WorkExperienceType[]
}

const formatPeriod = (start?: string, end?: string | null, isCurrent?: boolean) => {
    const startLabel = start
        ? new Date(start).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : ""
    const endLabel = isCurrent
        ? "Present"
        : end
            ? new Date(end).toLocaleDateString("en-US", { month: "long", year: "numeric" })
            : ""
    if (!startLabel && !endLabel) return ""
    return `${startLabel}${startLabel && endLabel ? " - " : ""}${endLabel}`
}

const ExperienceMentor = ({ education = [], workExperience = [] }: ExperienceMentorProps) => {
    const hasContent = education.length > 0 || workExperience.length > 0

    return (
        <div className="rounded-xl bg-white">
            <h2 className="border-b border-[#DADADA] px-5 py-4 text-base font-medium text-[#0E071D]">
                Experience
            </h2>

            {!hasContent && (
                <p className="px-5 py-6 text-sm text-[#62646A]">No experience listed.</p>
            )}

            <div className="divide-y divide-[#E9E9E9]">
                {workExperience.map((item) => (
                    <div key={item.id} className="px-5 py-3 space-y-1.5">
                        <h3 className="text-sm font-medium text-[#29282B]">
                            {item.title} @ {item.employer}
                        </h3>
                        <p className="text-[11px] text-[#898B91]">
                            {formatPeriod(item.start_date, item.end_date, item.is_current)}
                        </p>
                        {item.description && (
                            <p className="text-xs font-light text-[#29282B]">{item.description}</p>
                        )}
                    </div>
                ))}

                {education.map((item) => (
                    <div key={item.id} className="px-5 py-3 space-y-1.5">
                        <h3 className="text-sm font-medium text-[#29282B]">
                            {item.degree} in {item.field_of_study}
                        </h3>
                        <p className="text-[11px] text-[#898B91]">{item.institution}</p>
                        <p className="text-[11px] text-[#898B91]">
                            {formatPeriod(item.start_date, item.end_date)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExperienceMentor
