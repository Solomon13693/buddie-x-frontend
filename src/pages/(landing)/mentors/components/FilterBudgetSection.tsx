import { Button } from "@heroui/react"

type FilterBudgetSectionProps = {
    value: string
    onValueChange: (value: string) => void
    onApply: () => void
    onClearAll: () => void
}

const FilterBudgetSection = ({
    value,
    onValueChange,
    onApply,
    onClearAll,
}: FilterBudgetSectionProps) => (
    <div className="space-y-3">

        <input type="number" className="form-control border-[#B5B6BA] !rounded-lg text-xs"
            placeholder="$ Enter budget" value={value} onChange={(e) => onValueChange(e.target.value)} />

        <div className="flex items-center justify-between gap-3">

            <Button variant="light" size="sm" radius="sm" onPress={onClearAll} className="text-[11px]">
                Clear all
            </Button>

            <Button variant="light" size="sm" radius="sm" onPress={onApply}
                isDisabled={!value} className="text-[11px] bg-[#E7E7E7] text-[#6A6A6B] h-8 px-3">
                Apply budget
            </Button>

        </div>

    </div>
)

export default FilterBudgetSection
