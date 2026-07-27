import React from "react"

interface AccountTypeProps {
    value: "mentee" | "mentor"
    title: string
    isSelected: boolean
    onSelect: (value: "mentee" | "mentor") => void
}

const AccountType: React.FC<AccountTypeProps> = ({ value, title, isSelected, onSelect }) => {
    return (
        <button
            type="button"
            onClick={() => onSelect(value)}
            className={`flex flex-1 items-center gap-3 rounded-lg border px-4 py-4 text-left transition-all ${
                isSelected
                    ? "border-primary bg-[#FFF6ED]"
                    : "border-[#CBCAD7] bg-white hover:border-[#cccbda]"
            }`}
        >
            <span
                className={`flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 ${
                    isSelected ? "border-[#1B1D21] bg-white" : "border-[#CBCAD7] bg-white"
                }`}
                aria-hidden
            >
                {isSelected && <span className="size-2 rounded-full bg-[#1B1D21]" />}
            </span>
            <span
                className={`text-xs ${
                    isSelected ? "text-black font-medium" : "text-[#49475A]"
                }`} >
                {title}
            </span>
        </button>
    )
}

export default AccountType
