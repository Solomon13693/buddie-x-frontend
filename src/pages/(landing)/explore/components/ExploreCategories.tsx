import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { ExploreCategoriesSkeleton } from "../../../../components/skeleton"
import { useExploreCategoryTree } from "../../../../services/explore"
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
    void (searchProp ?? searchParams.get("search") ?? "")
    const selectedCategory = selectedCategoryProp ?? category

    const { tree, isLoading } = useExploreCategoryTree()

    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    const updateArrows = () => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 4)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    }

    useEffect(() => {
        updateArrows()
        const el = scrollRef.current
        el?.addEventListener("scroll", updateArrows, { passive: true })
        window.addEventListener("resize", updateArrows)
        return () => {
            el?.removeEventListener("scroll", updateArrows)
            window.removeEventListener("resize", updateArrows)
        }
    }, [tree])

    const scroll = (dir: "left" | "right") => {
        scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" })
    }

    const handleSelect = (value: string) => {
        if (onSelectCategory) {
            onSelectCategory(value)
            return
        }
        updateQueryParams({ category: value || null, subcategory: null })
    }

    if (isLoading) {
        return <ExploreCategoriesSkeleton />
    }

    if (!tree.length) {
        return null
    }

    return (
        <div className="border-b border-[#DADBDD] relative">

            {canScrollLeft && (
                <button onClick={() => scroll("left")} className="absolute left-0 top-0 bottom-0 z-10 flex items-center pr-3 bg-gradient-to-r from-white via-white to-transparent">
                    <ChevronLeftIcon className="size-4 text-[#5E6167]" />
                </button>
            )}

            <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
                <div className="flex min-w-max items-center gap-x-6 whitespace-nowrap text-xs md:min-w-0 md:w-full md:justify-between md:gap-x-12">
                    {[{ label: "All", value: "" }, ...tree].map((item) => {
                        const isActive = selectedCategory === item.value

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

            {canScrollRight && (
                <button onClick={() => scroll("right")} className="absolute right-0 top-0 bottom-0 z-10 flex items-center pl-3 bg-gradient-to-l from-white via-white to-transparent">
                    <ChevronRightIcon className="size-4 text-[#5E6167]" />
                </button>
            )}

        </div>
    )
}

export default ExploreCategories
