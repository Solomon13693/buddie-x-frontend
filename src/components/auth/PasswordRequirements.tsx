type PasswordRequirementsProps = {
    password: string
}

const RULES = [
    { id: "length", label: "Use 8 or more characters", test: (p: string) => p.length >= 8 },
    { id: "upper", label: "One Uppercase character", test: (p: string) => /[A-Z]/.test(p) },
    { id: "lower", label: "One lowercase character", test: (p: string) => /[a-z]/.test(p) },
    { id: "special", label: "One special character", test: (p: string) => /[@$!%*?&#]/.test(p) },
    { id: "number", label: "One number", test: (p: string) => /\d/.test(p) },
] as const

const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
    return (
        <ul className="grid grid-cols-1 gap-x-2 gap-y-1.5 sm:grid-cols-2">
            {RULES.map((rule) => {
                const met = rule.test(password)
                return (
                    <li key={rule.id} className="flex items-center gap-x-1.5 text-xs text-[#62646A]">
                        <span
                            className={`size-2 shrink-0 rounded-full ${
                                met ? "bg-[#22C55E]" : "bg-[#CBCAD7]"
                            }`}
                            aria-hidden
                        />
                        <span className={met ? "text-[#29282B]" : undefined}>{rule.label}</span>
                    </li>
                )
            })}
        </ul>
    )
}

export default PasswordRequirements
