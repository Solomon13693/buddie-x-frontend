import { useQueryParams } from "../../../utils"
import AboutMentor from "./AboutMentor"
import ExperienceMentor from "./ExperienceMentor"
import ExpertiseMentor from "./ExpertiseMentor"
import MentorProfile from "./MentorProfile"
import ReviewsMentor from "./ReviewsMentor"
import ToolkitMentor from "./ToolkitMentor"

const MENTOR_TABS = [
    { label: "Profile", value: "profile" },
    { label: "Expertise", value: "expertise" },
    { label: "Toolkit", value: "toolkit" },
    { label: "Experience", value: "experience" },
    { label: "Reviews (56)", value: "reviews" },
]

const MentorDetailsView = () => {
    
    const { searchParams, updateQueryParams } = useQueryParams()
    const activeTab = searchParams.get("tab") || "profile"
    
    const scrollToSection = (sectionId: string) => {
        requestAnimationFrame(() => {
            const section = document.getElementById(sectionId)
            if (!section) return
            section.scrollIntoView({ behavior: "smooth", block: "start" })
        })
    }

    return (
        <div className="py-10 space-y-8 bg-[#FAFAFA]">

            {/* ================== PROFILE SECTION ================== */}
            <MentorProfile />

            <div className="container space-y-10">

                {/* ================== TAB ================== */}
                <div className="max-w-4xl mx-auto flex items-center gap-x-5 text-[#74767E] text-xs">
                    {MENTOR_TABS.map((tab) => {
                        const isActive = activeTab === tab.value
                        return (
                            <button key={tab.value} type="button" onClick={() => {
                                updateQueryParams({ tab: tab.value })
                                scrollToSection(tab.value)
                            }} className={isActive ? "text-black font-medium" : "hover:text-[#1B1D21]"}
                                aria-pressed={isActive}>
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

                {/* ================== TAB CONTENT ================== */}
                <div className="max-w-6xl mx-auto space-y-8">
                    <section id="profile" className="scroll-mt-24">
                        <AboutMentor />
                    </section>

                    <section id="expertise" className="scroll-mt-24">
                        <ExpertiseMentor />
                    </section>

                    <section id="toolkit" className="scroll-mt-24">
                        <ToolkitMentor />
                    </section>

                    <section id="experience" className="scroll-mt-24">
                        <ExperienceMentor />
                    </section>

                    <section id="reviews" className="scroll-mt-24">
                        <ReviewsMentor />
                    </section>

                </div>

            </div>

        </div>
    )
}

export default MentorDetailsView