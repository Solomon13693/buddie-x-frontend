import { Button, Chip } from "@heroui/react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const HeroBanner = () => {
    const heroImages = ["/img/home/1.svg", "/img/home/hero_2.png"]
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
        }, 3500)

        return () => window.clearInterval(intervalId)
    }, [heroImages.length])

    return (
        <section className="min-h-screen -mt-20">

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh)] overflow-hidden">

                <div className="relative bg-white pb-16 pt-36 md:pt-40 lg:pt-0 lg:pb-0">

                    <div className="relative z-10 h-full flex items-center container px-6 lg:px-20 2xl:pl-52">

                        <div className="max-w-md space-y-5">

                            <Chip className="border-1 border-black/15 text-[#0E0E0E] text-xs"
                                variant="bordered" size="md">
                                Access expertise. Gain clarity. Move forward.
                            </Chip>

                            <h2 className="text-3xl lg:text-4xl font-medium text-[#141B34] leading-tight">
                                Find the Right Mentor for Your Next <span className="text-primary">Big Move</span>
                            </h2>

                            <p className="text-sm text-[#29282B]">
                                Buddie-X connects you with trusted mentors across business, technology, careers, education, and personal development, helping you access real expertise, gain clarity, and make your next move with confidence.
                            </p>

                            <div className="flex items-center flex-wrap gap-3 pt-5">

                                <Button as={Link} to="/mentors" className="text-xs" color="primary"
                                    radius="sm">
                                    Find your Mentor
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
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={heroImages[currentImageIndex]}
                                src={heroImages[currentImageIndex]}
                                alt="Hero Banner"
                                className="sm:w-[500px] md:w-[530px] 2xl:w-[700px] max-w-full"
                                width={633}
                                height={658}
                                initial={{ x: 80, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -80, opacity: 0 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            />
                        </AnimatePresence>

                    </div>

                    <div className="absolute right-10 xl:right-24 2xl:right-40 top-1/2
                    -translate-y-1/2 z-20 flex flex-col gap-3">
                        {heroImages.map((image, index) => (
                            <button key={image} type="button" aria-label={`Go to hero slide ${index + 1}`} onClick={() => setCurrentImageIndex(index)} className={`size-2 rounded-full transition-colors duration-300 cursor-pointer ${currentImageIndex === index ? "bg-[#FFDEC8]" : "bg-[#FFB33E]"}`}
                            />
                        ))}
                    </div>

                    {/* ======================== HERO BANNER EFFECTS ======================== */}
                    <img src="/img/effects/1.svg" alt="Hero Banner"
                        className="absolute top-0 right-0 w-[80%] pointer-events-none" />

                    {/* ======================== HERO BANNER EFFECTS ITEM 1 ======================== */}
                    <div className="pointer-events-none z-10">

                        <motion.div
                            className="inline-flex items-center gap-x-2 bg-white rounded-full px-5 py-3 text-[#343434] text-xs
                            absolute top-10 left-4 sm:top-20 sm:left-12 md:-left-8 shadow-[4px_4px_58px_0px_#0000001F]"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
                            <img src="/img/home/face-id.svg" alt="Face ID" width={24}
                                height={24} className="size-4" />
                            <span>Tech Experts</span>
                        </motion.div>

                        <motion.div
                            className="inline-flex items-center gap-x-2 bg-white rounded-full px-5 py-3 text-[#343434] text-xs
                            absolute top-10 right-4 sm:top-52 sm:right-16 xl:right-10 shadow-[4px_4px_58px_0px_#0000001F]"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
                            <img src="/img/home/image-download.svg" alt="Face ID" width={24}
                                height={24} className="size-4" />
                            <span>Personal Growth Mentors</span>
                        </motion.div>

                        <motion.div
                            className="inline-flex items-center gap-x-2 bg-white rounded-full px-5 py-3 text-[#343434] text-xs
                            absolute top-24 right-4 sm:top-72 sm:right-16 xl:right-10 shadow-[4px_4px_58px_0px_#0000001F]"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
                            <img src="/img/home/image-download.svg" alt="Face ID" width={24}
                                height={24} className="size-4" />
                            <span>Growth Mentors</span>
                        </motion.div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default HeroBanner
