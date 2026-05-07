const TOOLKIT_ITEMS = [
    {
        title: "Languages",
        description: "PHP, JavaScript (ES6+), TypeScript, HTML5, CSS3",
    },
    {
        title: "Frontend",
        description: "React, Next.js, Redux, Tailwind CSS",
    },
    {
        title: "Databases",
        description: "MongoDB, PostgreSQL",
    },
    {
        title: "Tools & Platforms",
        description: "Git, GitHub, Docker, Firebase, Vercel",
    },
]

const ToolkitMentor = () => {
    return (
        <div className="bg-white rounded-xl">
            <h2 className="border-b border-[#DADADA] px-5 py-4 text-base font-medium text-[#0E071D]">
                Toolkit
            </h2>

            <div className="divide-y divide-[#E9E9E9]">
                {TOOLKIT_ITEMS.map((item) => (
                    <div key={item.title} className="flex items-start gap-4 px-5 py-5">
                        <div className="size-6 shrink-0 rounded-md border border-[#E3E4E6] bg-[#FDFDFD] md:size-8 md:rounded-lg lg:size-9" />
                        <div>
                            <h3 className="text-xs font-medium text-[#29282B]">{item.title}</h3>
                            <p className="text-[12px] text-[#29282B]">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ToolkitMentor
