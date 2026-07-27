import { useEffect, useLayoutEffect, useRef, useState } from "react"
import CatalogToggle from "./CatalogToggle"
import FilterBudgetSection from "./FilterBudgetSection"
import FilterCheckboxList from "./FilterCheckboxList"
import FilterSection from "./FilterSection"
import { useMentorFilterOptions } from "./useMentorFilterOptions"
import { useMentorFilterParams } from "./useMentorFilterParams"

const MentorsFilterSidebar = () => {
    const { catalog, setCatalog, country, setCountry, language, setLanguage, level, setLevel, industry, setIndustry, skill, setSkill, expertise, setExpertise, tools, setTools, budget, setBudget, clearAll } = useMentorFilterParams()

    const { loading, countryItems, languageItems, levelItems, industryItems, skillItems, expertiseItems, toolItems } = useMentorFilterOptions()

    const [budgetDraft, setBudgetDraft] = useState(budget)
    const scrollYBeforeFilters = useRef<number | null>(null)

    useEffect(() => {
        setBudgetDraft(budget)
    }, [budget])

    useLayoutEffect(() => {
        if (loading) {
            scrollYBeforeFilters.current = window.scrollY
            return
        }
        if (scrollYBeforeFilters.current === null) return
        const y = scrollYBeforeFilters.current
        scrollYBeforeFilters.current = null
        window.scrollTo(0, y)
    }, [loading])

    const handleApplyBudget = () => {
        setBudget(budgetDraft.trim())
    }

    const handleClearAll = () => {
        setBudgetDraft("")
        clearAll()
    }

    return (
        <aside className="min-h-0 min-w-0 w-full lg:sticky lg:top-24 lg:z-10 lg:max-h-[calc(100vh-6rem)] lg:self-start">
            <div className="min-h-0 min-w-0 overflow-x-hidden bg-white px-5 py-2 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overscroll-contain lg:scrollbar-thin">
                <div className="pb-4">
                    <CatalogToggle value={catalog} onChange={setCatalog} />
                </div>

                {loading ? (
                    <p className="pb-2 text-xs text-[#95979D]">Loading filters…</p>
                ) : null}

                <FilterSection title="Country" defaultOpen>
                    <FilterCheckboxList
                        items={countryItems}
                        selectedKeys={country}
                        onChange={setCountry}
                    />
                </FilterSection>

                <FilterSection title="Language">
                    <FilterCheckboxList
                        items={languageItems}
                        selectedKeys={language}
                        onChange={setLanguage}
                    />
                </FilterSection>

                <FilterSection title="Level">
                    <FilterCheckboxList
                        items={levelItems}
                        selectedKeys={level}
                        onChange={setLevel}
                    />
                </FilterSection>

                <FilterSection title="Industry">
                    <FilterCheckboxList
                        items={industryItems}
                        selectedKeys={industry}
                        onChange={setIndustry}
                    />
                </FilterSection>

                <FilterSection title="Skills">
                    <FilterCheckboxList
                        items={skillItems}
                        selectedKeys={skill}
                        onChange={setSkill}
                    />
                </FilterSection>

                <FilterSection title="Expertises">
                    <FilterCheckboxList
                        items={expertiseItems}
                        selectedKeys={expertise}
                        onChange={setExpertise}
                    />
                </FilterSection>

                <FilterSection title="Tools">
                    <FilterCheckboxList
                        items={toolItems}
                        selectedKeys={tools}
                        onChange={setTools}
                    />
                </FilterSection>

                <FilterSection title="Budget" scrollable={false}>
                    <FilterBudgetSection
                        value={budgetDraft}
                        onValueChange={setBudgetDraft}
                        onApply={handleApplyBudget}
                        onClearAll={handleClearAll}
                    />
                </FilterSection>
            </div>
        </aside>
    )
}

export default MentorsFilterSidebar
