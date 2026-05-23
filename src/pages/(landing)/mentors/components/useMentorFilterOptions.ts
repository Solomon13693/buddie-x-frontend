import { useMemo } from "react"
import { useSelector } from "react-redux"
import { countries, languages, levels } from "../../../../constant"
import { RootState } from "../../../../redux/store"
import { CategoryType } from "../../../../types"
import type { FilterCheckboxItem } from "./filterTypes"

const toCategoryItems = (items: CategoryType[]): FilterCheckboxItem[] =>
    items
        .filter((item) => item.name)
        .map((item) => ({
            key: item.name!,
            label: item.name!,
            count: item.mentor_count,
        }))

/** Same sources as FilterSlider: constants + Redux general data (fetched on app load). */
export const useMentorFilterOptions = () => {
    const { skills, industries, expertises, tools, loading } = useSelector(
        (state: RootState) => state.general
    )

    const countryItems = useMemo<FilterCheckboxItem[]>(
        () =>
            countries.map(({ value, label }) => ({
                key: value,
                label,
            })),
        []
    )

    const languageItems = useMemo<FilterCheckboxItem[]>(
        () =>
            languages.map(({ name }) => ({
                key: name,
                label: name,
            })),
        []
    )

    const levelItems = useMemo<FilterCheckboxItem[]>(
        () =>
            levels.map(({ value }) => ({
                key: value,
                label: value,
            })),
        []
    )

    const industryItems = useMemo(() => toCategoryItems(industries), [industries])
    const skillItems = useMemo(() => toCategoryItems(skills), [skills])
    const expertiseItems = useMemo(() => toCategoryItems(expertises), [expertises])
    const toolItems = useMemo(() => toCategoryItems(tools), [tools])

    return {
        loading,
        countryItems,
        languageItems,
        levelItems,
        industryItems,
        skillItems,
        expertiseItems,
        toolItems,
    }
}
