import { ExploreTechSectionSkeleton } from "../../../../components/skeleton"
import { useSubcategoryMentors } from "../../../../services/explore"
import { ExploreSubcategory } from "../../../../types/explore"
import ExploreTechSections from "./ExploreTechSections"

type Props = {
    category: string
    subcategory: ExploreSubcategory
}

const SubcategorySection = ({ category, subcategory }: Props) => {
    const { mentors, isLoading } = useSubcategoryMentors(category, subcategory.value)

    if (isLoading) return <ExploreTechSectionSkeleton />
    if (!mentors.length) return null

    return (
        <ExploreTechSections
            section={{
                title: subcategory.label,
                type: "subcategory",
                filter_value: subcategory.value,
                industry: "",
                mentor_count: mentors.length,
                mentors,
            }}
        />
    )
}

export default SubcategorySection
