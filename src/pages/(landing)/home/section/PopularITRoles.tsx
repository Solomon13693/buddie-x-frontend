import { PopularITCard } from "../components"

const popularRoles = [
    {
        title: "Find 45 Buddies Specialized in Software Engineering",
        description: "Learn from mentors who help you strengthen core development fundamentals and practical delivery.",
        image: "/img/home/popular-it/1.png",
    },
    {
        title: "Find 32 Buddies Specialized in Product Management",
        description: "Build product thinking, roadmap planning, and stakeholder communication with expert guidance.",
        image: "/img/home/popular-it/2.png",
    },
    {
        title: "Find 28 Buddies Specialized in Data Analyst",
        description: "Improve analytical thinking, dashboard storytelling, and data-driven decision making skills.",
        image: "/img/home/popular-it/3.png",
    },
    {
        title: "Find 36 Buddies Specialized in UI/UX Development",
        description: "Design better user experiences with practical feedback on layouts, interactions, and product flows.",
        image: "/img/home/popular-it/4.png",
    },
    {
        title: "Find 18 Buddies Specialized in DevOps Engineer",
        description: "Level up CI/CD, cloud deployment, and platform reliability with hands-on mentoring support.",
        image: "/img/home/popular-it/5.png",
    },
    {
        title: "Find 28 Buddies Specialized in Data Analyst",
        description: "Improve analytical thinking, dashboard storytelling, and data-driven decision making skills.",
        image: "/img/home/popular-it/3.png",
    },
    {
        title: "Find 36 Buddies Specialized in UI/UX Development",
        description: "Design better user experiences with practical feedback on layouts, interactions, and product flows.",
        image: "/img/home/popular-it/4.png",
    },
    {
        title: "Find 18 Buddies Specialized in DevOps Engineer",
        description: "Level up CI/CD, cloud deployment, and platform reliability with hands-on mentoring support.",
        image: "/img/home/popular-it/5.png",
    },
]

const PopularITRoles = () => {
    return (
        <div className="relative">

            <img src="/img/effects/5.svg" alt="Effect 5" width={227} height={226}
                className="absolute -top-20 right-0 w-[100px]" />

            <div className="relative container space-y-8 z-10">

                <div className="space-y-0.5">
                    <h2 className="text-xl font-medium text-[#0E0E0E]">Popular IT Roles</h2>
                    <p className="text-sm text-[#404145] font-light">Find buddies specialized in your target role</p>
                </div>

                <div className="overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent w-full">
                    <div className="flex gap-4 min-w-max pb-2">
                        {popularRoles.map((role) => (
                            <PopularITCard
                                key={role.title}
                                title={role.title}
                                description={role.description}
                                image={role.image}
                            />
                        ))}
                        <div className="w-5 lg:w-14 shrink-0" aria-hidden="true" />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default PopularITRoles