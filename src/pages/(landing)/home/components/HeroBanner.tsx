import { Button, Chip } from "@heroui/react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const HeroBanner = () => {
    return (
        <section className="min-h-screen -mt-20">

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh)] overflow-hidden">

                <div className="relative bg-white pb-16 pt-36 md:pt-40 lg:pt-0 lg:pb-0">

                    <div className="relative z-10 h-full flex items-center container px-6 lg:px-20">

                        <div className="max-w-md space-y-5">

                            <Chip className="border-1 border-black/15 text-[#0E0E0E] text-xs"
                                variant="bordered" size="md">
                                Learn with guidance. Achieve with confidence.
                            </Chip>

                            <h2 className="text-3xl lg:text-4xl font-medium text-[#141B34] leading-tight">
                                Unlock Your Potential with 1-on-1 <span className="text-primary">Mentorship</span>
                            </h2>

                            <p className="text-sm text-[#29282B]">
                                Connect with world-class mentors in tech, design, and more. Take transformative courses, and join a thriving community of learners and professionals.
                            </p>

                            <div className="flex items-center flex-wrap gap-3 pt-5">

                                <Button as={Link} to="/explore" className="text-xs" color="primary"
                                    radius="sm">
                                    Find a Mentor
                                </Button>

                                <Button as={Link} to="/register" className="border-1 border-[#FFB33E] text-xs text-[#0E0E0E]" variant="bordered" color="primary"
                                    radius="sm">
                                    Become a Mentor
                                </Button>

                            </div>

                        </div>

                    </div>


                    {/* ======================== HERO BANNER EFFECTS ITEM 2 ======================== */}
                    <div className="pointer-events-none">
                        <img src="/img/effects/2.svg" alt="Hero Banner Effect 2"
                            className="absolute w-44 md:w-72 top-0 left-0" width={657} height={655} />
                        <img src="/img/effects/3.svg" alt="Hero Banner Effect 3"
                            className="absolute w-32 sm:w-52 bottom-0 inset-x-0 mx-auto"
                            width={227} height={226} />
                    </div>

                </div>

                <div className="relative bg-[linear-gradient(147.5deg,_#FBA852_-11.72%,_#BE764F_109.97%)] h-full flex items-end pt-24">

                    <div className="relative z-10">

                        {/* ======================== HERO BANNER ======================== */}
                        <motion.img
                            src="/img/home/1.svg"
                            alt="Hero Banner"
                            className="sm:w-[500px] md:w-[530px] max-w-full"
                            width={633}
                            height={658}
                            initial={{ x: 80, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        />

                    </div>

                    {/* ======================== HERO BANNER EFFECTS ======================== */}
                    <img src="/img/effects/1.svg" alt="Hero Banner"
                        className="absolute top-0 right-0 w-[80%] pointer-events-none" />

                    {/* ======================== HERO BANNER EFFECTS ITEM 1 ======================== */}
                    <div className="pointer-events-none">

                        <motion.div
                            className="inline-flex items-center gap-x-2 bg-white rounded-full px-5 py-3 text-[#343434] text-xs absolute top-20 left-12 md:-left-8 shadow-[4px_4px_58px_0px_#0000001F]"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
                            <img src="/img/home/face-id.svg" alt="Face ID" width={24}
                                height={24} className="size-4" />
                            <span>IT Experts</span>
                        </motion.div>

                        <motion.div
                            className="inline-flex items-center gap-x-2 bg-white rounded-full px-5 py-3 text-[#343434] text-xs absolute top-40 sm:top-52 xl:right-40 sm:right-16 right-40 shadow-[4px_4px_58px_0px_#0000001F]"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
                            <img src="/img/home/image-download.svg" alt="Face ID" width={24}
                                height={24} className="size-4" />
                            <span>Monitor</span>
                        </motion.div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default HeroBanner