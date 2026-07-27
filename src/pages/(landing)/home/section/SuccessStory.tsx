import { useEffect, useMemo, useState } from "react"
import { StarIcon } from "@heroicons/react/24/solid"
import { User } from "@heroui/react"
import { AnimatePresence, motion } from "framer-motion"

const SuccessStory = () => {

    const testimonials = [
       
        {
            name: "Pari Aarvi",
            role: "Data Analyst",
            avatar: "",
            content:
                "After one mentorship cycle, I improved my portfolio case studies and secured three interview invitations within two weeks.",
        },
        {
            name: "Chika Eze",
            role: "Frontend Engineer",
            avatar: "",
            content:
                "My mentor helped me structure my learning roadmap, prepare for technical interviews, and transition into tech with confidence",
        },
        {
            name: "Mary Nicholas",
            role: "Cybersecurity Analyst",
            avatar: "",
            content:
                "My mentor gave practical feedback on my CV and projects, helping me improve my applications and take clearer next steps",
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