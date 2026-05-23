import { useCallback, useEffect, useState } from "react"
import { User } from "@heroui/react"
import { AnimatePresence, motion } from "framer-motion"

type AuthReview = {
    id: string
    quote: string
    name: string
    role: string
    avatar: string
}

const AUTH_REVIEWS: AuthReview[] = [
    {
        id: "1",
        quote:
            "I used to struggle with finding the right mentor, but this platform changed that. The recommendations feel personalized, and it's easy to find mentors who align with what I'm trying to achieve.",
        name: "Daphne Park",
        role: "UI/UX Designer",
        avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
        id: "2",
        quote:
            "My mentor gave practical feedback on my portfolio and interview prep. Within weeks I had clearer goals and more confidence in my career direction.",
        name: "Temi Ajayi",
        role: "Product Manager",
        avatar: "https://i.pravatar.cc/150?img=23",
    },
    {
        id: "3",
        quote:
            "The sessions were structured, actionable, and worth every minute. I finally connected with someone who understood my industry and growth path.",
        name: "Chika Eze",
        role: "Frontend Engineer",
        avatar: "https://i.pravatar.cc/150?img=31",
    },
]

const AUTO_SCROLL_MS = 5000

const slideVariants = {
    enter: { opacity: 0, y: 16 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
}

const AuthReviewCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const review = AUTH_REVIEWS[activeIndex]

    const goTo = useCallback((index: number) => {
        setActiveIndex(index % AUTH_REVIEWS.length)
    }, [])

    const goNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % AUTH_REVIEWS.length)
    }, [])

    useEffect(() => {
        if (isPaused || AUTH_REVIEWS.length <= 1) return

        const intervalId = window.setInterval(goNext, AUTO_SCROLL_MS)
        return () => window.clearInterval(intervalId)
    }, [goNext, isPaused])

    return (
        <div
            className="mb-6 mx-auto max-w-sm"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)} >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#2A2830]/80 backdrop-blur-sm">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={review.id}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="p-6">
                        <p className="text-sm leading-relaxed text-white/90">
                            &ldquo;{review.quote}&rdquo;
                        </p>
                        <motion.div
                            className="mt-5 flex items-center gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15, duration: 0.3 }}>
                            <User
                                name={review.name}
                                description={review.role}
                                avatarProps={{
                                    src: review.avatar,
                                    name: review.name,
                                    className: "size-11 rounded-lg",
                                }}
                                classNames={{
                                    name: "text-sm font-medium text-white",
                                    description: "text-xs text-white/60",
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-4 flex justify-center gap-1" role="tablist" aria-label="Review slides">
                {AUTH_REVIEWS.map((item, index) => (
                    <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={index === activeIndex}
                        aria-label={`Show review ${index + 1}`}
                        onClick={() => goTo(index)}
                        className="flex h-4 items-center justify-center p-1">
                        <motion.span
                            layout
                            className={`block h-1.5 rounded-full ${
                                index === activeIndex ? "bg-white" : "bg-white/40"
                            }`}
                            animate={{
                                width: index === activeIndex ? 20 : 6,
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default AuthReviewCarousel
