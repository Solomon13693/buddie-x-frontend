import { CheckIcon } from "@heroicons/react/24/solid"
import type { FilterCheckboxItem } from "./filterTypes"

type FilterCheckboxListProps = {
    items: FilterCheckboxItem[]
    selectedKeys: string[]
    onChange: (keys: string[]) => void
}

const FilterCheckboxList = ({ items, selectedKeys, onChange }: FilterCheckboxListProps) => {
    const toggle = (key: string) => {
        if (selectedKeys.includes(key)) {
            onChange(selectedKeys.filter((k) => k !== key))
            return
        }
        onChange([...selectedKeys, key])
    }

    return (
        <ul className="min-w-0 space-y-2.5">
            {items.map((item) => {
                const checked = selectedKeys.includes(item.key)

                return (
                    <li key={item.key} className="min-w-0">
                        <label className="flex min-w-0 cursor-pointer items-start gap-2.5">
                            <span
                                className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[3px] border ${
                                    checked
                                        ? "border-[#1B1D21] bg-[#1B1D21]"
                                        : "border-[#D5D5D5] bg-white"
                                }`}
                            >
                                {checked && <CheckIcon className="size-3 text-white" />}
                            </span>
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={checked}
                                onChange={() => toggle(item.key)}
                            />
                            <span className="min-w-0 flex-1 text-xs leading-5 text-[#62646A]">
                                {item.label}
                                {item.count != null && (
                                    <span className="text-[#95979D]"> ({item.count})</span>
                                )}
                            </span>
                        </label>
                    </li>
                )
            })}
        </ul>
    )
}

export default FilterCheckboxList
