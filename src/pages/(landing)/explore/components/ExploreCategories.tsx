import { motion } from "framer-motion"
import { useQueryParams } from "../../../../utils"

const CATEGORIES = [
    { label: "All careers", value: "" },
    { label: "Marketing", value: "marketing" },
    { label: "Graphic Design", value: "graphic-design" },
    { label: "Data Analytics", value: "data-analytics" },
    { label: "Business", value: "business" },
    { label: "Software Development", value: "software-development" },
    { label: "Product Management", value: "product-management" },
    { label: "Programs", value: "programs" },
    { label: "UI/UX Development", value: "ui-ux-development" },
]

const ExploreCategories = () => {

    const { searchParams, updateQueryParams } = useQueryParams()
    const selectedCategory = searchParams.get("category") || ""

    return (
        <div className="border-b border-[#DADBDD]">
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex items-center text-xs whitespace-nowrap min-w-max gap-x-6 md:min-w-0 md:w-full md:justify-between md:gap-x-4">
                    {CATEGORIES.map((category) => {
                        const isActive = selectedCategory === category.value

                        return (
                        <button key={category.label} type="button" onClick={() => updateQueryParams({ category: category.value || null })} className={`relative pb-2 transition-colors cursor-pointer shrink-0 ${isActive
                                ? "text-[#1B1D21] font-medium"
                                : "text-[#5E6167] hover:text-[#1B1D21]"
                                }`} aria-pressed={isActive}>
                            <span>{category.label}</span>
                            {isActive && (
                                <motion.span
                                    layoutId="active-category-indicator"
                                    className="absolute left-0 right-0 -bottom-[1px] h-[3px] bg-[#FFB33E]"
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