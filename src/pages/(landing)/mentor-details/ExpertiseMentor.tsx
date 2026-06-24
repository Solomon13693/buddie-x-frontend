import MentorCheckboxList from "./MentorCheckboxList"

type ExpertiseMentorProps = {
    expertise?: string[]
}

const ExpertiseMentor = ({ expertise = [] }: ExpertiseMentorProps) => {
    return (
        <MentorCheckboxList
            title="Expertise"
            items={expertise}
            emptyMessage="No expertise listed."
        />
    )
}

export default ExpertiseMentor
