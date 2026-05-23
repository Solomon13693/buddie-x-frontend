import { useMemo } from "react"
import { useQueryParams } from "../../../../utils"

export const parseCsvParam = (value: string) =>
    value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)

const toCsvParam = (keys: string[]) => (keys.length ? keys.join(",") : null)

export type MentorCatalog = "pro" | "full"

export const useMentorFilterParams = () => {
    const { searchParams, updateQueryParams } = useQueryParams()

    const catalog: MentorCatalog = searchParams.get("catalog") === "full" ? "full" : "pro"
    const country = parseCsvParam(searchParams.get("country") ?? "")
    const language = parseCsvParam(searchParams.get("language") ?? "")
    const level = parseCsvParam(searchParams.get("level") ?? "")
    const industry = parseCsvParam(searchParams.get("industry") ?? "")
    const skill = parseCsvParam(searchParams.get("skill") ?? "")
    const expertise = parseCsvParam(searchParams.get("expertise") ?? "")
    const tools = parseCsvParam(searchParams.get("tools") ?? "")
    const budget = searchParams.get("budget") ?? ""
    const search = searchParams.get("search") ?? ""

    const setCatalog = (value: MentorCatalog) => {
        updateQueryParams({ catalog: value === "pro" ? null : value })
    }

    const setCsv = (param: string, keys: string[]) => {
        updateQueryParams({ [param]: toCsvParam(keys) })
    }

    const setBudget = (value: string) => {
        updateQueryParams({ budget: value || null })
    }

    const setSearch = (value: string) => {
        updateQueryParams({ search: value.trim() || null })
    }

    const clearAll = () => {
        updateQueryParams({
            search: null,
            country: null,
            language: null,
            level: null,
            industry: null,
            skill: null,
            expertise: null,
            tools: null,
            budget: null,
        })
    }

    /** Params for GET /mentors — filters only. `catalog` is UI layout (pro list vs full grid), not sent here. */
    const apiParams = useMemo(
        () => ({
            search: search.trim() || undefined,
            country: toCsvParam(country) ?? undefined,
            language: toCsvParam(language) ?? undefined,
            level: toCsvParam(level) ?? undefined,
            industry: toCsvParam(industry) ?? undefined,
            skill: toCsvParam(skill) ?? undefined,
            expertise: toCsvParam(expertise) ?? undefined,
            tools: toCsvParam(tools) ?? undefined,
            budget: budget.trim() || undefined,
        }),
        [search, country, language, level, industry, skill, expertise, tools, budget]
    )

    return {
        catalog,
        setCatalog,
        search,
        setSearch,
        country,
        setCountry: (keys: string[]) => setCsv("country", keys),
        language,
        setLanguage: (keys: string[]) => setCsv("language", keys),
        level,
        setLevel: (keys: string[]) => setCsv("level", keys),
        industry,
        setIndustry: (keys: string[]) => setCsv("industry", keys),
        skill,
        setSkill: (keys: string[]) => setCsv("skill", keys),
        expertise,
        setExpertise: (keys: string[]) => setCsv("expertise", keys),
        tools,
        setTools: (keys: string[]) => setCsv("tools", keys),
        budget,
        setBudget,
        clearAll,
        apiParams,
    }
}
