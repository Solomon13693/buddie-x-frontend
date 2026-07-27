import { XMarkIcon } from "@heroicons/react/24/outline"
import type { MentorCatalog } from "./useMentorFilterParams"
import { useActiveMentorFilterChips } from "./useActiveMentorFilterChips"

type MentorsResultsHeaderProps = {
    catalog: MentorCatalog
    totalCount: number
    isLoading?: boolean
}

const MentorsResultsHeader = ({ catalog, totalCount, isLoading = false }: MentorsResultsHeaderProps) => {
    const { chips, hasActiveFilters, clearAll, search } = useActiveMentorFilterChips()

    const catalogLabel = catalog === "pro" ? "Pro " : ""
    const countLabel = isLoading ? "…" : totalCount.toLocaleString()

    const primaryQualifier = search.trim()
        ? search.trim()
        : chips.find((chip) => !chip.id.startsWith("search:"))?.label

    return (
        <div className="space-y-2 pb-4">
            {hasActiveFilters ? (
                <div className="flex flex-wrap items-center gap-2">
                    {chips.map((chip) => (
                        <span
                            key={chip.id}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E5E7] bg-[#F5F5F5] py-1 pl-3 pr-1.5 text-xs text-[#1B1D21]"
                        >
                            {chip.label}
                            <button
                                type="button"
                                onClick={chip.onRemove}
                                className="rounded-full p-0.5 text-[#62646A] hover:bg-[#E4E5E7] hover:text-[#1B1D21]"
                                aria-label={`Remove ${chip.label} filter`}
                            >
                                <XMarkIcon className="size-3.5" />
                            </button>
                        </span>
                    ))}

                    <button
                        type="button"
                        onClick={clearAll}
                        className="text-xs text-[#62646A] underline-offset-2 hover:text-[#1B1D21] hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            ) : null}

            <p className="text-sm text-[#62646A]">
                <span className="font-medium text-[#141B34]">{countLabel}</span>
                {` ${catalogLabel}mentor${totalCount === 1 ? "" : "s"}`}
                {primaryQualifier ? (
                    <>
                        {" for "}
                        <span className="font-medium text-[#141B34]">&ldquo;{primaryQualifier}&rdquo;</span>
                    </>
                ) : null}
            </p>
        </div>
    )
}

export default MentorsResultsHeader
