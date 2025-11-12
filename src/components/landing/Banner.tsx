import { Button, Chip } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="rounded-3xl lg:rounded-4xl relative overflow-hidden mx-2 md:mx-5">

            <div className="absolute inset-0 rounded-3xl lg:rounded-4xl bg-cover bg-center scale-x-[-1]"
                style={{ backgroundImage: `url('/img/bg/hero_bg.webp')` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 rounded-3xl lg:rounded-4xl bg-black/60 md:bg-[linear-gradient(89.59deg,rgba(0,0,0,0)_36.02%,rgba(0,0,0,0.53)_67.26%)] scale-x-[-1]" />

            <div className="container mx-auto py-12 sm:py-16 lg:py-18 relative flex flex-col justify-center h-full min-h-[47vh] sm:min-h-[65vh] lg:min-h-[75vh]">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative px-5 lg:px-6 z-10">

                    <div className="max-w-xl space-y-4 sm:space-y-5">

                        <Chip className="text-white text-[10px] sm:text-xs bg-white/20">
                            Learn with guidance. Achieve with confidence.
                        </Chip>

                        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-white leading-tight sm:leading-13 font-grotesk">
                            Unlock Your Potential with 1-on-1 Mentorship
                        </h2>

                        <p className="text-white/80 text-sm sm:text-base leading-6 sm:leading-7">
                            Connect with experienced mentors in tech, design, and more.
                            Build real-world skills, track your progress, and accelerate your growth — all in one platform.
                        </p>

                        <div className="flex items-center gap-2 pt-2">
                            <Button
                                radius="sm"
                                size="lg"
                                className="bg-white text-[#0B1221] px-4 h-10 text-xs gap-x-2"
                                onPress={() => navigate('/explore')}
                                endContent={<ArrowUpRightIcon className="w-3.5 h-3.5 text-gray-800" />}>
                                Find Your Mentor
                            </Button>
                        </div>
                    </div>

                </motion.div>

            </div>

        </div>
    );
};

export default Banner;