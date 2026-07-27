import CategoryCard from "../components/CategoryCard"
import { useExploreCategoryTree } from "../../../../services/explore"

const BrowseCategories = () => {
    const { tree: categories, isLoading } = useExploreCategoryTree()

    return (
        <div className="relative">

            <div className="relative container space-y-8 z-10">

                <div className="space-y-0.5">
                    <h2 className="text-xl font-medium text-[#0E0E0E]">High-Growth Technology Pathways</h2>
                    <p className="text-sm text-[#404145] font-light">
                        Find mentors who can help you build clarity, capability, and confidence across in-demand digital fields
                    </p>
                </div>

                <div className="overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent w-full">
                    <div className="flex gap-4 min-w-max pb-2">

                        {isLoading && Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="flex flex-col gap-y-4 w-[200px] shrink-0 snap-start">
                                <div className="rounded-2xl aspect-[7/7] animate-pulse bg-gray-100" />
                                <div className="space-y-2">
                                    <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />
                                    <div className="h-3 w-2/4 animate-pulse rounded bg-gray-100" />
                                </div>
                            </div>
                        ))}

                        {!isLoading && categories.map((cat) => (
                            <CategoryCard
                                key={cat.value}
                                label={cat.label}
                                value={cat.value}
                                description={(cat as any).description}
                                image={(cat as any).image}
                            />
                        ))}

                        <div className="w-5 lg:w-14 shrink-0" aria-hidden="true" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BrowseCategories
