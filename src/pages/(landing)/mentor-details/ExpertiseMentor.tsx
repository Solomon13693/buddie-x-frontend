import MentorCheckboxList from "./MentorCheckboxList"

type ExpertiseMentorProps = {
    expertise?: string[]
}

const ExpertiseMentor = ({ expertise = [] }: ExpertiseMentorProps) => {
    return (
        <div className="space-y-4">
            <MentorCheckboxList
                title="Expertise"
                items={expertise}
                emptyMessage="No expertise listed."
            />
        </div>
    )
}

export default ExpertiseMentor
