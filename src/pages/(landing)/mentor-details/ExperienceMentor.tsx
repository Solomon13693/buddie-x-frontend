const EXPERIENCE_ITEMS = [
    {
        title: "Lorem Ipsum",
        period: "March 2024 - Present",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    },
    {
        title: "Lorem Ipsum",
        period: "March 2024 - Present",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    },
    {
        title: "Lorem Ipsum",
        period: "March 2024 - Present",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    },
    {
        title: "Lorem Ipsum",
        period: "March 2024 - Present",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    },
]

const ExperienceMentor = () => {
    return (
        <div className="bg-white rounded-xl">
            <h2 className="border-b border-[#DADADA] px-5 py-4 text-base font-medium text-[#0E071D]">
                Experience
            </h2>

            <div className="divide-y divide-[#E9E9E9]">
                {EXPERIENCE_ITEMS.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="px-5 py-3">
                        <h3 className="text-sm font-medium text-[#29282B]">{item.title}</h3>
                        <p className="text-[11px] text-[#898B91]">{item.period}</p>
                        <p className="text-xs text-[#29282B] font-light">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExperienceMentor
