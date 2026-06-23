import MentorCheckboxList from "./MentorCheckboxList"

type Category = { id: string; name: string }

type ExpertiseMentorProps = {
    expertise?: string[]
    categories?: Category[]
}

const ExpertiseMentor = ({ expertise = [], categories = [] }: ExpertiseMentorProps) => {
    return (
        <div className="space-y-4">
            {categories.length > 0 && (
                <div className="rounded-xl bg-white px-5 py-4">
                    <h2 className="mb-3 border-b border-[#DADADA] pb-3 text-base font-medium text-[#0E071D]">
                        Categories
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <span
                                key={cat.id}
                                className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600"
                            >
                                {cat.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <MentorCheckboxList
                title="Expertise"
                items={expertise}
                emptyMessage="No expertise listed."
            />
        </div>
    )
}

export default ExpertiseMentor
