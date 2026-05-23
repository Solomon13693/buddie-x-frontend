import { useMemo } from "react"
import { countries } from "../../../../constant"
import { useMentorFilterParams } from "./useMentorFilterParams"

export type ActiveMentorFilterChip = {
    id: string
    label: string
    onRemove: () => void
}

const countryLabel = (iso: string) =>
    countries.find((c) => c.value === iso)?.label ?? iso

export const useActiveMentorFilterChips = () => {
    const {
        search,
        setSearch,
        country,
        setCountry,
        language,
        setLanguage,
        level,
        setLevel,
        industry,
        setIndustry,
        skill,
        setSkill,
        expertise,
        setExpertise,
        tools,
        setTools,
        budget,
        setBudget,
        clearAll,
    } = useMentorFilterParams()

    const chips = useMemo(() => {
        const list: ActiveMentorFilterChip[] = []

        const pushCsv = (
            param: string,
            values: string[],
            setter: (keys: string[]) => void,
            labelFor: (value: string) => string = (v) => v
        ) => {
            values.forEach((value) => {
                list.push({
                    id: `${param}:${value}`,
                    label: labelFor(value),
                    onRemove: () => setter(values.filter((v) => v !== value)),
                })
            })
        }

        if (search.trim()) {
            list.push({
                id: `search:${search}`,
                label: search.trim(),
                onRemove: () => setSearch(""),
            })
        }

        pushCsv("country", country, setCountry, countryLabel)
        pushCsv("language", language, setLanguage)
        pushCsv("level", level, setLevel)
        pushCsv("industry", industry, setIndustry)
        pushCsv("skill", skill, setSkill)
        pushCsv("expertise", expertise, setExpertise)
        pushCsv("tools", tools, setTools)

        if (budget.trim()) {
            list.push({
                id: `budget:${budget}`,
                label: `Budget: ${budget}`,
                onRemove: () => setBudget(""),
            })
        }

        return list
    }, [
        search,
        setSearch,
        country,
        language,
        level,
        industry,
        skill,
        expertise,
        tools,
        budget,
        setCountry,
        setLanguage,
        setLevel,
        setIndustry,
        setSkill,
        setExpertise,
        setTools,
        setBudget,
    ])

    return { chips, hasActiveFilters: chips.length > 0, clearAll, search }
}
