const EXPERTISE_ITEMS = [
    {
        title: "Scalable Architecture",
        description:
            "Built and implemented scalable systems capable of handling growing user demands while maintaining performance and stability.",
    },
    {
        title: "API Development & Integrations",
        description:
            "Developed and integrated RESTful APIs, enabling seamless communication between frontend systems, backend services, and third-party platforms.",
    },
    {
        title: "Technical Leadership & Code Quality",
        description:
            "Led development efforts by enforcing best practices, conducting code reviews, and ensuring clean, maintainable, and high-quality codebases.",
    },
    {
        title: "End-to-End Product Development",
        description:
            "Worked end-to-end on web applications, from initial concept and architecture to development, deployment, and ongoing maintenance.",
    },
    {
        title: "Application Performance Enhancement",
        description:
            "Improved the speed and efficiency of existing applications through performance tuning, code optimization, and modern best practices.",
    },
]

const ExpertiseMentor = () => {
    return (
        <div className="bg-white rounded-xl">

            <h2 className='text-base font-medium text-[#0E071D] border-b border-[#DADADA] px-5 py-4'>
                Expertise
            </h2>

            <div className="divide-y divide-[#E9E9E9]">
                {EXPERTISE_ITEMS.map((item) => (
                    <div key={item.title} className="flex items-start gap-4 px-5 py-5">
                        <div className="size-6 md:size-8 lg:size-9 rounded-md md:rounded-lg 
                        border border-[#E3E4E6] bg-[#FDFDFD] shrink-0" />
                        <div className="">
                            <h3 className="text-xs font-medium text-[#29282B]">{item.title}</h3>
                            <p className="text-[12px] text-[#29282B]">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ExpertiseMentor