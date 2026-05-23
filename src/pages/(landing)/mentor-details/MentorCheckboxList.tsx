type MentorCheckboxListProps = {
    title: string
    items: string[]
    emptyMessage: string
}

const MentorCheckboxList = ({ title, items, emptyMessage }: MentorCheckboxListProps) => {
    return (
        <div className="rounded-xl bg-white">
            <h2 className="border-b border-[#DADADA] px-5 py-4 text-base font-medium text-[#0E071D]">
                {title}
            </h2>

            {items.length === 0 ? (
                <p className="px-5 py-6 text-sm text-[#62646A]">{emptyMessage}</p>
            ) : (
                <div className="divide-y divide-[#E9E9E9]">
                    {items.map((item) => (
                        <div key={item} className="flex items-center gap-3 px-5 py-4">
                            <span className="size-5 shrink-0 rounded border border-[#DADADA] bg-white"
                                aria-hidden="true"
                            />
                            <span className="text-sm sm:text-xs text-[#29282B]">{item}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MentorCheckboxList
