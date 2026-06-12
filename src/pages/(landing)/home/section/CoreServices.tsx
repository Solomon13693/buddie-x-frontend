import {
    CheckCircleIcon,
    CheckBadgeIcon,
    GlobeAltIcon,
    UserGroupIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { Button } from "@heroui/react"

const coreServices = [
    {
        title: "Why We Exist",
        description: "Big decisions should never be made alone. Buddie-X connects you with mentors, experts, and communities that help you move forward.",
        points: [
            "Access to real guidance",
            "Clarity for important decisions",
            "Support beyond your network",
        ],
    },
    {
        title: "Who We Support",
        description: "Buddie-X is built for those seeking clarity, growth, and direction. Whether you're a career changer, professional, founder, student, entrepreneur, or lifelong learner.",
        points: [
            "Career changers",
            "Professionals and founders",
            "Students and lifelong learners",
        ],
    },
    {
        title: "How We Help",
        description: "We connect people with trusted mentors, community insight, and real conversations. Turning uncertainty into clarity, decisions, and next steps.",
        points: [
            "1:1 mentorship",
            "Community questions",
            "Practical next steps",
        ],
    },
]

const CoreServices = () => {
    return (
        <div className="container">

            <div className="p-5 relative bg-white py-12 rounded-2xl shadow-[0px_40px_60px_0px_#0D0E251A] overflow-hidden">

                <img src="/img/effects/4.svg" alt="Effect 4" width={457} height={464} className="absolute top-0 right-0 left-0 mx-auto" />

                <div className="space-y-5 relative z-10">

                    <div className="space-y-1.5 text-center max-w-md mx-auto">
                        <h2 className="text-base font-medium text-[#0E0E0E]">Our Purpose</h2>
                        <p className="text-base md:text-xl text-[#0E0E0E] font-light leading-7">Built for People Making Their Next Move</p>
                    </div>

                    {/* ======================== CORE SERVICES ======================== */}
                    <div className="max-w-6xl mx-auto pt-5">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {coreServices.map((service) => (
                                <div key={service.title} className="bg-white p-5 md:p-6 rounded-2xl space-y-2 shadow-[0px_15px_60px_0px_#3F5A8217]">

                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center p-2 rounded-xl 
                                    bg-[#EBEBEB]">
                                            <img src="/img/home/phone_call.svg" alt={service.title}
                                                width={20} height={20} />
                                        </div>
                                        <h2 className="text-base font-semibold text-[#0E0E0E]">{service.title}</h2>
                                    </div>

                                    <p className="text-sm text-[#0E0E0E] font-light">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-2 pt-1">
                                        {service.points.map((point) => (
                                            <li key={point} className="flex items-center gap-2">
                                                <CheckCircleIcon className="size-4 text-[#0E0E0E]" />
                                                <p className="text-xs text-[#0E0E0E] font-light">
                                                    {point}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center pt-5">
                            <Button className="text-xs mx-auto" variant="light" endContent={<ChevronRightIcon className="size-4" />}>
                                View More Services
                            </Button>
                        </div>

                    </div>

                    {/* ======================== STATS ======================== */}
                    <div className="max-w-5xl mx-auto pt-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
                            {[
                                {
                                    title: "Verified Mentors",
                                    description: "Reviewed for experience",
                                    icon: CheckBadgeIcon,
                                },
                                {
                                    title: "Global Access",
                                    description: "Connect from wherever you are",
                                    icon: GlobeAltIcon,
                                },
                                {
                                    title: "Community Support",
                                    description: "Ask questions before you book",
                                    icon: UserGroupIcon,
                                },
                                {
                                    title: "Flexible sessions",
                                    description: "Pay only for mentor time",
                                    icon: CalendarDaysIcon,
                                },
                            ].map((item, index) => {
                                const Icon = item.icon

                                return (
                                    <div
                                        key={item.title}
                                        className="relative space-y-2 flex flex-col items-center justify-center text-center"
                                    >
                                        {index > 0 && (
                                            <span className="hidden lg:block absolute -left-0.5 top-1/2 -translate-y-1/2 w-px h-8 bg-[#FF9900]" />
                                        )}

                                        <div className="flex items-center justify-center mb-2">
                                            <Icon className="w-10 h-10 text-[#FF9900]" />
                                        </div>

                                        <h2 className="text-base md:text-lg font-medium text-[#0E0E0E]">
                                            {item.title}
                                        </h2>

                                        <p className="text-[11px] sm:text-xs text-[#0E0E0E] font-light">
                                            {item.description}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default CoreServices
