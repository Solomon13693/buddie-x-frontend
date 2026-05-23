import { cn } from "../../lib/utils"
import { hasHtmlMarkup, sanitizeBasicHtml } from "../../lib/sanitizeHtml"

type HtmlClampTextProps = {
    content: string
    lines?: 2 | 3 | 4
    className?: string
}

const lineClampClass: Record<2 | 3 | 4, string> = {
    2: "line-clamp-2",
    3: "line-clamp-3",
    4: "line-clamp-4",
}

const HtmlClampText = ({ content, lines = 3, className }: HtmlClampTextProps) => {
    if (!content) return null

    const baseClass = cn(
        "text-xs leading-5 text-[#29282B]",
        lineClampClass[lines],
        "[&_strong]:font-semibold [&_b]:font-semibold [&_em]:italic",
        className
    )

    if (hasHtmlMarkup(content)) {
        return (
            <div
                className={baseClass}
                dangerouslySetInnerHTML={{ __html: sanitizeBasicHtml(content) }}
            />
        )
    }

    return <p className={cn(baseClass, "whitespace-pre-line")}>{content}</p>
}

export default HtmlClampText
