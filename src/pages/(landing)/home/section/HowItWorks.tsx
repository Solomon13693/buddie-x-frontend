import { Button } from "@heroui/react"
import { Link } from "react-router-dom"

const HowItWorks = () => {

    const steps = [
        {
            id: "01",
            title: "Share Your Goal",
            description:
                "Tell us what you want to achieve, where you need clarity, and the kind of support you’re looking for",
        },
        {
            id: "02",
            title: "Get Matched",
            description:
                "Discover mentors aligned to your goals, pathway, experience level, and preferred support style.",
        },
        {
            id: "03",
            title: "Book Your Session",
            description:
                "Choose a time that works, share context in advance, and meet your mentor 1-on-1..",
        },
        {
            id: "04",
            title: "Move Farward",
            description:
                "Leave with practical insight, clear next steps, and confidence to succeed.",
        },
    ]

    return (
        <div className="relative overflow-hidden bg-[linear-gradient(142.4deg,_#191425_29.38%,_#34313C_76.42%)] py-12">

            <img src="/img/effects/7.svg" alt="Effect 6"
                width={650} height={322} className="absolute top-0 left-0" />

            <img src="/img/effects/7.svg" alt="Effect 6"
                width={650} height={322} className="absolute bottom-0 right-0 rotate-180" />

            <div className="container space-y-14 relative z-10">

                <div className="space-y-0.5 text-center text-white">
                    <h2 className="text-xl font-semibold">
                        How It Works
                    </h2>
                    <p className="text-sm font-light">
                        From goal to guidance in four simple steps
                    </p>
                </div>

                <div className="space-y-10">

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step) => (
                            <div key={step.id} className="rounded-2xl bg-[linear-gradient(117.89deg,_#211C2C_10.4%,_#2A2732_89.81%)] shadow-[0px_25px_40px_0px_#26252833] px-5 py-8 flex flex-col items-center justify-center space-y-3 text-center">
                                <div className="inline-flex items-center justify-center bg-[#34303F] rounded-full size-10">
                                    <span className="text-white text-xs font-medium">{step.id}</span>
                                </div>

                                <h2 className="text-sm font-medium text-white">{step.title}</h2>

                                <p className="text-xs font-light text-white/70">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center">
                        <Button as={Link} to="/explore" size="sm" className="text-xs h-10 px-6" color="primary"
                            radius="sm">Get Started for Free</Button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default HowItWorks