import MentorCheckboxList from "./MentorCheckboxList"

type ToolkitMentorProps = {
    tools?: string[]
}

const ToolkitMentor = ({ tools = [] }: ToolkitMentorProps) => {
    return (
        <MentorCheckboxList
            title="Toolkit"
            items={tools}
            emptyMessage="No tools listed."
        />
    )
}

export default ToolkitMentor
