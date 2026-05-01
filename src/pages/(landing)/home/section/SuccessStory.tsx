import { useEffect, useMemo, useState } from "react"
import { StarIcon } from "@heroicons/react/24/solid"
import { User } from "@heroui/react"
import { AnimatePresence, motion } from "framer-motion"

const SuccessStory = () => {

    const testimonials = [
        {
            name: "Brigina Patton",
            role: "Product Manager",
            avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
            content:
                "Sed mattis est eget penatibus mauris, sed condimentum vitae viverra. Ipsum ut aliquet et morbi ac in. Lacinia mattis eget nisl pellentesque non, porttitor. Vitae et vestibulum ac id. Dui aliquet porttitor libero consequat volutpat eget sed turpis. Feugiat maecenas commodo et morbi morbi gravida.",
        },
        {
            name: "Imelda Cowen",
            role: "Product Consultant",
            avatar: "https://i.pravatar.cc/150?img=5",
            content:
                "Sapien praesent tristique iaculis amet sit, odio pellentesque. Sit nulla pretium amet, fames aenean. Nascetur augue vulputate sed pretium pretium scelerisque amet facilisis ut pulvinar morbi a egestas. Vel vulputate dolor nisl in non.",
        },
        {
            name: "Alfred Walton",
            role: "Developer",
            avatar: "https://i.pravatar.cc/150?img=12",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra bibendum feugiat diam egestas ornare quisque tincidunt. Ipsum tortor, pretium lectus urna felis condimentum cursus at. Platea a, pulvinar lacinia id. Augue tortor nunc, ultrices nam in augue a.",
        },
        {
            name: "Temi Ajayi",
            role: "Data Analyst",
            avatar: "https://i.pravatar.cc/150?img=23",
            content:
                "After one mentorship cycle, I improved my portfolio case studies and landed three interview invitations within two weeks.",
        },
        {
            name: "Chika Eze",
            role: "Frontend Engineer",
            avatar: "https://i.pravatar.cc/150?img=31",
            content:
                "The guidance helped me structure my learning roadmap, prepare for technical interviews, and confidently switch into tech.",
        },
        {
            name: "Mohammed Bello",
            role: "Cybersecurity Analyst",
            avatar: "https://i.pravatar.cc/150?img=48",
            content:
                "My mentor gave practical feedback on my CV and projects, and I got clear next steps that improved my applications immediately.",
        },
    ]

    const [currentPage, setCurrentPage] = useState(0)
    const [cardsPerPage, setCardsPerPage] = useState(3)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCardsPerPage(1)
                return
            }

            if (window.innerWidth < 1024) {
                setCardsPerPage(2)
                return
            }

            setCardsPerPage(3)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const totalPages = Math.ceil(testimonials.length / cardsPerPage)

    useEffect(() => {
        if (currentPage > totalPages - 1) {
            setCurrentPage(Math.max(totalPages - 1, 0))
        }
    }, [currentPage, totalPages])

    useEffect(() => {
        if (totalPages <= 1) return

        const intervalId = window.setInterval(() => {
            setCurrentPage((prev) => (prev + 1) % totalPages)
        }, 3500)

        return () => window.clearInterval(intervalId)
    }, [totalPages])

    const visibleTestimonials = useMemo(() => {
        const start = currentPage * cardsPerPage
        return testimonials.slice(start, start + cardsPerPage)
    }, [cardsPerPage, currentPage, testimonials])

    const gridClass = cardsPerPage === 1 ? "grid-cols-1" : cardsPerPage === 2 ? "grid-cols-2" : "grid-cols-3"

    return (
        <div className="relative overflow-hidden bg-[#FFF6ED] py-10 mb-10">

            <img src="/img/effects/9.svg" alt="Effect 9"
                width={526} height={767} className="absolute bottom-0 left-0" />

            <img src="/img/effects/10.svg" alt="Effect 10"
                width={526} height={767} className="absolute top-0 right-0" />

            <div className="container relative z-10 space-y-10 lg:space-y-12">

                <div className="space-y-0.5 text-center max-w-md mx-auto">
                    <h2 className="text-xl font-medium text-[#011632]">
                        Success Stories
                    </h2>
                    <p className="text-sm font-light text-[#3C4959]">
                        See how our buddies have helped professionals like you achieve their career goals

                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -24 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className={`grid ${gridClass} gap-3`}>
                            {visibleTestimonials.map((testimonial) => (
                                <div key={testimonial.name} className="h-full bg-white rounded-2xl p-6 border border-[#EAEAEA] flex flex-col items-start gap-4">

                                    <User avatarProps={{
                                        src: testimonial.avatar,
                                    }}
                                        description={testimonial.role}
                                        name={testimonial.name}
                                        classNames={{
                                            name: "text-sm text-[#343434] font-medium",
                                            description: "text-xs text-[#969696]",
                                        }}
                                    />

                                    <p className="flex-1 text-xs text-[#969696] leading-5">
                                        {testimonial.content}
                                    </p>

                                    <div className="mt-auto inline-flex items-center gap-1 pt-1">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <StarIcon key={index} className="size-4 text-[#EF7420]" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center justify-center gap-3 pt-4">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrentPage(index)}
                                aria-label={`Go to testimonial page ${index + 1}`}
                                className={`rounded-full transition-all duration-300 ${currentPage === index
                                    ? "size-2.5 bg-[#F7941D]"
                                    : "size-2 bg-[#FFE1B2] hover:bg-[#FFD18A]"
                                    }`}
                            />
                        ))}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SuccessStory