import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { Button } from "@heroui/react"

const coreServices = [
    {
        title: "BA Mock Interview",
        description: "Practice with experienced Business Analysts",
        points: [
            "Confidence in technical questions",
            "STAR method mastery",
            "Real-time feedback",
        ],
    },
    {
        title: "Build a Work Portfolio",
        description: "Create a compelling professional portfolio",
        points: [
            "Showcase your best work",
            "Stand out to recruiters",
            "Professional presentation",
        ],
    },
    {
        title: "Fix Your CV for UK Employers",
        description: "Get your CV professionally reviewed",
        points: [
            "ATS-optimized format",
            "UK market standards",
            "Keyword optimization",
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
                        <h2 className="text-base font-medium text-[#0E0E0E]">Core Services</h2>
                        <p className="text-base md:text-xl text-[#0E0E0E] font-light leading-7">Everything you need to succeed in your IT career journey</p>
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
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
                            {[
                                { value: "782+", label: "Active Buddies" },
                                { value: "10,000+", label: "Success Stories" },
                                { value: "50,000", label: "Success Stories" },
                                { value: "32%", label: "Average Salary Increase" },
                            ].map((stat, index) => (
                                <div key={stat.value}
                                    className="relative space-y-1.5 flex flex-col items-center justify-center">
                                    {index > 0 && (
                                        <span className="hidden lg:block absolute -left-0.5 top-1/2 -translate-y-1/2 w-px h-8 bg-[#FF9900]" />
                                    )}
                                    <h2 className="text-xl md:text-2xl font-medium text-[#0E0E0E]">{stat.value}</h2>
                                    <p className="text-[11px] sm:text-xs text-[#0E0E0E] font-light uppercase text-center">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default CoreServices