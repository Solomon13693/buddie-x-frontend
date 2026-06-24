import { motion } from "framer-motion"
import { ExploreCategoriesSkeleton } from "../../../../components/skeleton"
import { useExploreCategories } from "../../../../services/explore"
import { useQueryParams } from "../../../../utils"

type ExploreCategoriesProps = {
    /** When omitted, reads category/search from URL (?category= & ?search=) */
    category?: string
    search?: string
    /** Controlled mode for pages without URL params */
    selectedCategory?: string
    onSelectCategory?: (value: string) => void
}

const ExploreCategories = ({
    category: categoryProp,
    search: searchProp,
    selectedCategory: selectedCategoryProp,
    onSelectCategory,
}: ExploreCategoriesProps) => {
    const { searchParams, updateQueryParams } = useQueryParams()

    const category = categoryProp ?? searchParams.get("category") ?? ""
    const search = searchProp ?? searchParams.get("search") ?? ""
    const selectedCategory = selectedCategoryProp ?? category

    const { categories, isLoading } = useExploreCategories({ category, search })

    const handleSelect = (value: string) => {
        if (onSelectCategory) {
            onSelectCategory(value)
            return
        }
        updateQueryParams({ category: value || null })
    }

    if (isLoading) {
        return <ExploreCategoriesSkeleton />
    }

    if (!categories.length) {
        return null
    }

    return (
        <div className="border-b border-[#DADBDD]">
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex min-w-max items-center gap-x-6 whitespace-nowrap text-xs md:min-w-0 md:w-full md:justify-between md:gap-x-12">
                    {categories.map((item) => {
                        const isActive = selectedCategory === item.value

                        return (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => handleSelect(item.value)}
                                className={`relative shrink-0 cursor-pointer pb-2 transition-colors ${
                                    isActive
                                        ? "font-medium text-[#1B1D21]"
                                        : "text-[#5E6167] hover:text-[#1B1D21]"
                                }`}
                                aria-pressed={isActive}
                            >
                                <span>{item.label}</span>
                                {isActive && (
                                    <motion.span
                                        layoutId="active-category-indicator"
                                        className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-[#FFB33E]"
                                        transition={{ type: "spring", stiffness: 450, damping: 38 }}
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ExploreCategories
