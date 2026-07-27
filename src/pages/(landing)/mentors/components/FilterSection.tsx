import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { ReactNode, useLayoutEffect, useRef, useState } from "react"

type FilterSectionProps = {
    title: string
    children?: ReactNode
    defaultOpen?: boolean
    scrollable?: boolean
}

const FilterSection = ({ title, children, defaultOpen = false, scrollable = true }: FilterSectionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const scrollLockY = useRef<number | null>(null)

    const handleToggle = () => {
        scrollLockY.current = window.scrollY
        setIsOpen((prev) => !prev)
    }

    useLayoutEffect(() => {
        if (scrollLockY.current === null) return
        const y = scrollLockY.current
        scrollLockY.current = null
        window.scrollTo(0, y)
    }, [isOpen])

    return (
        <div className="min-w-0 shrink-0 border-t border-[#D5D5D5] py-4">
            <button
                type="button"
                className="flex w-full items-center justify-between text-left"
                onClick={handleToggle}
                aria-expanded={isOpen}
            >
                <span className="text-sm font-medium text-[#1B1D21]">{title}</span>
                {isOpen ? (
                    <ChevronUpIcon className="size-4 shrink-0 text-[#62646A]" />
                ) : (
                    <ChevronDownIcon className="size-4 shrink-0 text-[#62646A]" />
                )}
            </button>

            {isOpen && children ? (
                scrollable ? (
                    <div className="relative mt-3 h-[280px] max-h-[280px] w-full shrink-0 overflow-hidden">
                        <div className="absolute inset-0 box-border min-h-0 min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain py-1 pr-1 scrollbar-thin">
                            {children}
                        </div>
                    </div>
                ) : (
                    <div className="mt-3 min-w-0">{children}</div>
                )
            ) : null}
        </div>
    )
}

export default FilterSection
