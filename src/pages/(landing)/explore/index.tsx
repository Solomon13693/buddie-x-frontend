import { Button, Chip } from "@heroui/react"
import SearchBarTwo from "../../../components/SearchBarTwo"
import { CertifiedByBuddie, ExploreCategories } from "./components"
import { ExploreTechSections, PraticeSkills } from "./sections"

const POPULAR_TOPICS = [
    "SEO",
    "Marketing",
    "Design",
    "Development",
    "Business",
    "Programming",
    "Data Science",
]

function ExploreView() {
    return (
        <div className="pt-10 space-y-10">

            <div className="container space-y-10">

                <ExploreCategories />

                <CertifiedByBuddie />

                <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center space-y-8 px-2 sm:px-0">

                    <SearchBarTwo className="w-full" inputClassName="!w-full h-12 pl-10"
                        placeholder="What service are you looking for today?" />


                    <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center">
                        <p className="text-xs text-[#525252]">Most Popular in:</p>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {POPULAR_TOPICS.map((topic) => (
                                <Chip key={topic} variant="bordered" className="border-1 border-black text-[12px]">
                                    {topic}
                                </Chip>
                            ))}
                        </div>
                    </div>

                </div>

                <ExploreTechSections title="Digital Marketing" />

                <ExploreTechSections title="Business Formation" />

                <ExploreTechSections title="Data Science" />

                <div className="flex items-center justify-center pt-5">
                    <Button variant="bordered" color="primary" onPress={() => { }}
                        className="text-xs border-1 border-[#FFB33E]" radius="sm">
                        View All Mentors
                    </Button>
                </div>

            </div>
            
            <PraticeSkills />

        </div>
    )
}

export default ExploreView
