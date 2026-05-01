import { CheckIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

const highlights = ["Real mentors", "Real skills", "Real growth."];

const LearnDirectly = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">

            <div className="bg-primary h-[50vh]" style={{
                backgroundImage: "url('/img/home/2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }} />

            <div className="relative overflow-hidden bg-[linear-gradient(180deg,_#191425_0%,_#0A031B_100%)] flex items-center h-[50vh]">

                <img src="/img/effects/7.svg" alt="Effect 6" 
                width={450} height={221} className="absolute top-0 left-0" />

                <div className="container max-w-xl space-y-6">

                    <h2 className="text-2xl md:text-3xl text-[#FFFFFF]">
                        Learn directly from experienced professionals who guide you step-by-step.
                    </h2>

                    <Button className="text-xs" color="primary" radius="sm">
                        Get Started for Free
                    </Button>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                        {highlights.map((item) => (
                            <div key={item} className="inline-flex items-center gap-2 text-white/70">
                                <CheckIcon className="size-4" />
                                <span className="text-xs">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default LearnDirectly;
