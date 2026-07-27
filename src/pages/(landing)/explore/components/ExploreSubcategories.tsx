import { motion } from "framer-motion"
import { useExploreCategoryTree } from "../../../../services/explore"
import { useQueryParams } from "../../../../utils"

type ExploreSubcategoriesProps = {
    category: string
}

const ExploreSubcategories = ({ category }: ExploreSubcategoriesProps) => {
    const { searchParams, updateQueryParams } = useQueryParams()
    const selectedSubcategory = searchParams.get("subcategory") ?? ""

    const { tree, isLoading } = useExploreCategoryTree()
    const subcategories = tree.find((c) => c.value === category)?.subcategories ?? []

    const handleSelect = (value: string) => {
        updateQueryParams({ subcategory: value || null })
    }

    if (isLoading || !subcategories.length) return null

    const items = [{ label: "All", value: "" }, ...subcategories]

    return (
        <div className="border-b border-[#DADBDD]">
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex min-w-max items-center gap-x-6 whitespace-nowrap text-xs md:min-w-0 md:gap-x-8">
                    {items.map((item) => {
                        const isActive = selectedSubcategory === item.value

                        return (
                            <button
                                key={item.value || "all"}
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
                                        layoutId="active-subcategory-indicator"
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

export default ExploreSubcategories
